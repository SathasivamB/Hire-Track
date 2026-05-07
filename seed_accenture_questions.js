const fs = require('fs');
const path = require('path');

const companyId = 'Accenture';

const questionsToAdd = [
  // Logical Reasoning
  { company: companyId, type: 'Logic', text: 'Find the next number in the series: 2, 6, 12, 20, 30, ?', options: ['36', '40', '42', '48'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If “COMPUTER” is coded as “RFUVQNPC”, then “MOBILE” is coded as:', options: ['FMJCPC', 'FMJCPN', 'ELIBKN', 'ENCJMF'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'A clock shows 4:20. What is the angle between the hour and minute hand?', options: ['0°', '10°', '20°', '30°'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'Which number does not belong in the series? 5, 10, 20, 40, 90', options: ['10', '20', '40', '90'], correct: 3, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If all engineers are graduates and some graduates are managers, then:', options: ['All managers are engineers', 'Some engineers are managers', 'Engineers are graduates', 'No graduates are engineers'], correct: 2, expReward: 50 },
  // Quantitative Aptitude
  { company: companyId, type: 'Quant', text: 'What is 35% of 400?', options: ['120', '140', '160', '180'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A car covers 150 km in 3 hours. What is its average speed?', options: ['40 km/h', '45 km/h', '50 km/h', '55 km/h'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'Solve: 4x − 8 = 24', options: ['6', '7', '8', '9'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'The average of 12, 18, 24, and 30 is:', options: ['18', '20', '21', '24'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'What is the compound interest on ₹1000 at 10% for 2 years?', options: ['₹200', '₹210', '₹220', '₹230'], correct: 1, expReward: 50 },
  // Verbal Ability
  { company: companyId, type: 'Verbal', text: 'Choose the synonym of “Efficient”.', options: ['Lazy', 'Productive', 'Weak', 'Slow'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the antonym of “Expand”.', options: ['Increase', 'Stretch', 'Shrink', 'Develop'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Fill in the blank: The team _____ working on the project.', options: ['are', 'is', 'were', 'have'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the grammatically correct sentence.', options: ['She do not like coffee.', 'She does not likes coffee.', 'She does not like coffee.', 'She not like coffee.'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'What does the idiom “Under the weather” mean?', options: ['Feeling sick', 'Feeling excited', 'Feeling energetic', 'Feeling angry'], correct: 0, expReward: 50 },
  // Pseudo Code & Analytical
  { company: companyId, type: 'Technical', text: 'What will be the output? x = 5; y = 10; print(x + y)', options: ['5', '10', '15', '20'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which loop executes at least once?', options: ['for loop', 'while loop', 'do-while loop', 'nested loop'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which sorting algorithm divides the array into halves?', options: ['Bubble Sort', 'Selection Sort', 'Merge Sort', 'Insertion Sort'], correct: 2, expReward: 50 },
  // Technical Questions
  { company: companyId, type: 'Technical', text: 'Which language is mainly used for web page structure?', options: ['CSS', 'HTML', 'Python', 'Java'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Sequential Query Language', 'Simple Query Logic', 'Server Query List'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which protocol is used to transfer web pages?', options: ['FTP', 'SMTP', 'HTTP', 'SSH'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which keyword is used to declare a constant in JavaScript?', options: ['var', 'let', 'const', 'static'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which database is NoSQL?', options: ['MySQL', 'PostgreSQL', 'Oracle', 'MongoDB'], correct: 3, expReward: 50 }
];

const dataPath = path.join(__dirname, 'data.json');
const dbPath = path.join(__dirname, 'server', 'db.json');

// Update data.json
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `accenture-${Date.now()}-${index}`;
    data.questions[id] = { ...q, id };
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ Updated data.json');
}

// Update db.json
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `accenture-${Date.now()}-${index}`;
    db.questions.push({ ...q, id });
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✅ Updated db.json');
}
