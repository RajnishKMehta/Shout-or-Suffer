const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';

function generateId() {
  let id = '';
  for (let i = 0; i < 6; i++) {
    id += chars[Math.floor(Math.random() * chars.length)];
  }
  return id;
}

module.exports = { generateId };

if (require.main === module) {
  console.log(generateId());
}
