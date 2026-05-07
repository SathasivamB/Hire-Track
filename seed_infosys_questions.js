const fs = require('fs');
const path = require('path');

const companyId = "Infosys";

const questionsToAdd = [
  // Logical Reasoning
  { company: companyId, type: 'Logic', text: 'Find the next number in the series: 2, 5, 10, 17, 26, ?', options: ['35', '37', '39', '41'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If “INFOSYS” is coded as “JOGPTZT”, then “SYSTEM” is coded as:', options: ['TZTUFN', 'TYSTFN', 'TZUTFM', 'TYTUFN'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'A man walks 8 km north and then 6 km west. In which direction is he from the starting point?', options: ['North-East', 'South-East', 'North-West', 'South-West'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'Which number is the odd one out? 9, 18, 27, 36, 50, 54', options: ['18', '36', '50', '54'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If all coders are problem solvers and some problem solvers are gamers, then:', options: ['All gamers are coders', 'Coders are problem solvers', 'Gamers are coders', 'All problem solvers are coders'], correct: 1, expReward: 50 },
  // Quantitative Aptitude
  { company: companyId, type: 'Quant', text: 'What is 15% of 800?', options: ['100', '110', '120', '130'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A train covers 480 km in 8 hours. What is its average speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'Solve: 7x − 14 = 35', options: ['5', '6', '7', '8'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'The average of 16, 20, 24, and 28 is:', options: ['20', '22', '24', '26'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A mobile phone costs ₹20,000 and is sold for ₹24,000. Find the profit percentage.', options: ['15%', '18%', '20%', '25%'], correct: 2, expReward: 50 },
  // Verbal Ability
  { company: companyId, type: 'Verbal', text: 'Choose the synonym of “Reliable”.', options: ['Trustworthy', 'Weak', 'Lazy', 'Careless'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the antonym of “Optimistic”.', options: ['Positive', 'Hopeful', 'Pessimistic', 'Cheerful'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Fill in the blank: The students _____ preparing for the exam.', options: ['is', 'was', 'are', 'has'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the grammatically correct sentence.', options: ['She have completed her work.', 'She has completed her work.', 'She completed has her work.', 'She completing her work.'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'What does the idiom “Hit the nail on the head” mean?', options: ['Miss the target', 'Speak exactly right', 'Work slowly', 'Avoid responsibility'], correct: 1, expReward: 50 },
  // Pseudo Code & Analytical
  { company: companyId, type: 'Technical', text: 'What will be the output? a = 10; b = 20; print(a + b)', options: ['10', '20', '30', '40'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which loop is best when the number of iterations is known?', options: ['while loop', 'do-while loop', 'for loop', 'nested loop'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which data structure follows FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which sorting algorithm compares adjacent elements repeatedly?', options: ['Merge Sort', 'Bubble Sort', 'Quick Sort', 'Heap Sort'], correct: 1, expReward: 50 },
  // Technical Questions
  { company: companyId, type: 'Technical', text: 'Which language is commonly used for web page structure?', options: ['CSS', 'HTML', 'JavaScript', 'Python'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What does DBMS stand for?', options: ['Database Management System', 'Data Backup Management System', 'Digital Base Management Server', 'Database Monitoring Service'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which protocol is secure for web communication?', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which database is a NoSQL database?', options: ['MySQL', 'Oracle', 'PostgreSQL', 'MongoDB'], correct: 3, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which keyword declares a constant in JavaScript?', options: ['var', 'let', 'const', 'define'], correct: 2, expReward: 50 }
];

const dataPath = path.join(__dirname, 'data.json');
const dbPath = path.join(__dirname, 'server', 'db.json');

// Update data.json
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `infosys-${Date.now()}-${index}`;
    data.questions[id] = { ...q, id };
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ Updated data.json');
}

// Update db.json
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `infosys-${Date.now()}-${index}`;
    db.questions.push({ ...q, id });
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✅ Updated db.json');
}
