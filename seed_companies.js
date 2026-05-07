const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'data.json');
let db = { users: {}, companies: {}, questions: {}, requests: {}, logs: [] };

if (fs.existsSync(dbPath)) {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const defaultCompanies = [
  { id: 'StartupInc', name: 'StartupInc', type: 'Basic', cost: 0, logo: 'S', color: '#3b82f6' },
  { id: 'Amazon', name: 'Amazon', type: 'FAANG', cost: 500, logo: 'A', color: '#f97316' },
  { id: 'Google', name: 'Google', type: 'FAANG', cost: 1000, logo: 'G', color: '#22c55e' },
  { id: 'Meta', name: 'Meta', type: 'FAANG', cost: 1500, logo: 'M', color: '#3b82f6' },
  { id: 'Apple', name: 'Apple', type: 'FAANG', cost: 2000, logo: 'A', color: '#64748b' },
  { id: 'Netflix', name: 'Netflix', type: 'FAANG', cost: 2500, logo: 'N', color: '#ef4444' },
];

defaultCompanies.forEach(c => {
  db.companies[c.id] = c;
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log(`✅ Seeded ${defaultCompanies.length} companies into data.json!`);
