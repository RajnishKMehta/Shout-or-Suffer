const fs = require('fs');
const path = require('path');
const { generateId } = require('./generateId');

const wish = process.env.INPUT_WISH;
const note = process.env.INPUT_NOTE;
const from = process.env.INPUT_FROM;

if (!wish || !note || !from) {
  console.error('Error: wish, note, and from are all required.');
  process.exit(1);
}

const id = generateId();
const at = Date.now();

const dataDir = path.join(process.cwd(), 'wishes');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const wishData = { wish, note, from, at };
const wishFilePath = path.join(dataDir, `${id}.json`);
fs.writeFileSync(wishFilePath, JSON.stringify(wishData, null, 2));
console.log(`Created: wishes/${id}.json`);

const indexFilePath = path.join(dataDir, 'index.json');
let ids = [];
if (fs.existsSync(indexFilePath)) {
  try {
    const raw = fs.readFileSync(indexFilePath, 'utf8');
    ids = JSON.parse(raw);
    if (!Array.isArray(ids)) ids = [];
  } catch {
    ids = [];
  }
}

ids.unshift(id);
fs.writeFileSync(indexFilePath, JSON.stringify(ids, null, 2));
console.log(`Updated: wishes/index.json (id "${id}" added at top)`);

console.log(`::set-output name=generated_id::${id}`);
