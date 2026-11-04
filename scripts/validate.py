#!/usr/bin/env python3
"""Validate this evaluation package without network access or mutation."""
import re
import sys
from pathlib import Path
from urllib.parse import unquote, urlsplit

try:
    import yaml
except ImportError:
    sys.exit('PyYAML is required; no dependency was installed.')

ROOT = Path(__file__).resolve().parents[1]
errors = []
skills = sorted((ROOT / 'skills').glob('*/SKILL.md'))
if not skills:
    errors.append('No skill entrypoints found')
license_text = (ROOT / 'LICENSE').read_text()
for entry in skills:
    text = entry.read_text()
    match = re.match(r'\A---\n(.*?)\n---\n', text, re.S)
    if not match:
        errors.append(f'{entry.relative_to(ROOT)}: missing frontmatter')
        continue
    try:
        metadata = yaml.safe_load(match.group(1))
    except yaml.YAMLError as error:
        errors.append(f'{entry.relative_to(ROOT)}: invalid YAML: {error}')
        continue
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
print(f'PASS: {len(skills)} skills; metadata, licenses, and {links} local links valid.')
