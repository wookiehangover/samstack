#!/usr/bin/env python3
"""Validate this skills-only Agent Plugin without network access or mutation."""
import json
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

try:
    import yaml
except ImportError:
    yaml = None

ROOT = Path(__file__).resolve().parents[1]
errors = []


def parse_frontmatter(block):
    """Use PyYAML when present; otherwise accept only flat plain-string scalars."""
    if yaml is not None:
        try:
            return yaml.safe_load(block)
        except yaml.YAMLError as error:
            raise ValueError(str(error)) from error
    metadata = {}
    for line in block.splitlines():
        if not line.strip():
            continue
        match = re.fullmatch(r'([A-Za-z][A-Za-z0-9_-]*): (\S.*)', line)
        value = match.group(2).rstrip() if match else ''
        if (not match or match.group(1) in metadata or ': ' in value or ' #' in value
                or value.endswith(':') or value[0] in '[]{}&*!|>\'"%@`#,?-'
                or re.fullmatch(r'(?i)true|false|yes|no|on|off|null|~|[-+.\d][\d._eE+-]*', value)):
            raise ValueError(f'install PyYAML to check this line: {line!r}')
        metadata[match.group(1)] = value
    return metadata


def validate_manifest(manifest):
    """Apply Agent Plugins 1.0.0 manifest constraints locally."""
    if not isinstance(manifest, dict):
        return ['plugin.json: manifest must be an object']
    issues = []
    string_fields = {'$schema', 'name', 'version', 'description', 'homepage', 'repository', 'license'}
    unknown = set(manifest) - string_fields - {'author', 'keywords', 'extensions'}
    if unknown:
        issues.append(f'plugin.json: unknown fields {sorted(unknown)}')
    for key in string_fields & manifest.keys():
        if not isinstance(manifest[key], str):
            issues.append(f'plugin.json: {key} must be a string')
    if manifest.get('$schema') != 'https://agent-plugins.org/schemas/1.0.0/plugin.schema.json':
        issues.append('plugin.json: missing or unsupported $schema')
    name = manifest.get('name')
    if (not isinstance(name, str) or not 1 <= len(name) <= 64
            or not re.fullmatch(r'[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?', name)
            or '--' in name or '..' in name):
        issues.append('plugin.json: invalid or missing name')
    if 'author' in manifest:
        author = manifest['author']
        if (not isinstance(author, dict) or set(author) - {'name', 'email', 'url'}
                or any(not isinstance(value, str) for value in author.values())):
            issues.append('plugin.json: invalid author metadata')
    if 'keywords' in manifest:
        keywords = manifest['keywords']
        if not isinstance(keywords, list) or any(not isinstance(value, str) for value in keywords):
            issues.append('plugin.json: keywords must be an array of strings')
    if 'extensions' in manifest:
        extensions = manifest['extensions']
        if (not isinstance(extensions, dict)
                or any(not isinstance(value, dict) for value in extensions.values())):
            issues.append('plugin.json: extensions must map namespaces to objects')
    return issues


for path in ROOT.rglob('*'):
    if '.git' in path.parts:
        continue
    if not path.resolve().is_relative_to(ROOT):
        errors.append(f'{path.relative_to(ROOT)}: package path escapes plugin root')
if errors:
    sys.exit('\n'.join(errors))

try:
    errors.extend(validate_manifest(json.loads((ROOT / 'plugin.json').read_text())))
except (OSError, ValueError) as error:
    errors.append(f'plugin.json: {error}')
if not (ROOT / 'skills').is_dir():
    errors.append('skills must be a directory')
if (ROOT / 'mcp.json').exists():
    errors.append('This skills-only package checker does not validate MCP configuration')
skills = sorted((ROOT / 'skills').glob('*/SKILL.md'))
if not skills:
    errors.append('No skill entrypoints found')
license_text = (ROOT / 'LICENSE').read_text()
pins = set()
for entry in skills:
    text = entry.read_text()
    match = re.match(r'\A---\n(.*?)\n---\n', text, re.S)
    if not match:
        errors.append(f'{entry.relative_to(ROOT)}: missing frontmatter')
        continue
    try:
        metadata = parse_frontmatter(match.group(1))
    except ValueError as error:
        errors.append(f'{entry.relative_to(ROOT)}: invalid YAML: {error}')
        continue
    pins.update(re.findall(r'github\.com/cursor/plugins/(?:blob|tree)/([0-9a-f]{40})/', text))
    if not isinstance(metadata, dict):
        errors.append(f'{entry.relative_to(ROOT)}: metadata must be a mapping')
        continue
    name = metadata.get('name')
    description = metadata.get('description')
    if (not isinstance(name, str) or not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', name)
            or len(name) > 64 or name != entry.parent.name):
        errors.append(f'{entry.relative_to(ROOT)}: invalid or mismatched name')
    if not isinstance(description, str) or not description.strip() or len(description) > 1024:
        errors.append(f'{entry.relative_to(ROOT)}: invalid description')
    if set(metadata) - {'name', 'description', 'license', 'metadata'}:
        errors.append(f'{entry.relative_to(ROOT)}: unsupported metadata')
    bundled_license = entry.parent / 'LICENSE'
    if not bundled_license.exists() or bundled_license.read_text() != license_text:
        errors.append(f'{entry.relative_to(ROOT)}: absent or changed attribution license')
if len(pins) != 1:
    errors.append(f'skills must cite one upstream revision; found {sorted(pins) or "none"}')

links = 0
for document in ROOT.rglob('*.md'):
    if '.git' in document.parts:
        continue
    for destination in re.findall(r'\[[^\]]*\]\(([^)]+)\)', document.read_text()):
        url = urlsplit(destination.strip('<>'))
        if url.scheme or not url.path:
            continue
        target = (document.parent / unquote(url.path)).resolve()
        links += 1
        if not target.is_relative_to(ROOT) or not target.exists():
            errors.append(f'{document.relative_to(ROOT)}: missing/escaping link {destination}')
        if document.is_relative_to(ROOT / 'skills'):
            skill_root = ROOT / 'skills' / document.relative_to(ROOT / 'skills').parts[0]
            if not target.is_relative_to(skill_root):
                errors.append(f'{document.relative_to(ROOT)}: non-standalone resource {destination}')

if errors:
    print('\n'.join(errors))
    sys.exit(1)
print(f'PASS: Agent Plugins 1.0.0 manifest and package boundaries; {len(skills)} skills; '
      f'metadata, licenses, and {links} local links valid.')
