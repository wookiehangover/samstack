import { readFileSync } from 'node:fs';

export function monthTotal(file) {
  let cents = 0;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    if (!line) continue;
    cents += JSON.parse(line).amount_cents;
  }
  return cents / 100;
}

export function yearToDate(files) {
  return files.reduce((sum, file) => sum + monthTotal(file), 0);
}
