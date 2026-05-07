const fs = require('fs');
const path = require('path');

const companyId = "IBM";

const questionsToAdd = [
  // Logical Reasoning
  { company: companyId, type: 'Logic', text: 'Find the next number in the series: 1, 8, 27, 64, ?', options: ['81', '100', '125', '144'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If “SYSTEM” is coded as “TZTUFN”, then “COMPUTER” is coded as:', options: ['DPNQVUFS', 'DPNQVUFS', 'DPNRUVFS', 'DPMQVUFS'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'A person walks 7 km west and then 24 km north. In which direction is the person from the starting point?', options: ['North-East', 'North-West', 'South-East', 'South-West'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'Which number is the odd one out? 11, 22, 33, 44, 57, 66', options: ['22', '33', '57', '66'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If all developers are programmers and all programmers are logical thinkers, then developers are:', options: ['Designers', 'Logical thinkers', 'Managers', 'Analysts'], correct: 1, expReward: 50 },
  // Quantitative Aptitude
  { company: companyId, type: 'Quant', text: 'What is 22% of 450?', options: ['90', '95', '99', '105'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A train travels 420 km in 7 hours. What is its average speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'Solve: 9x + 6 = 51', options: ['4', '5', '6', '7'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'The average of 25, 35, 45, and 55 is:', options: ['35', '40', '45', '50'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A product costs ₹1500 and is sold for ₹1800. Find the profit percentage.', options: ['15%', '20%', '25%', '30%'], correct: 1, expReward: 50 },
  // Verbal Ability
  { company: companyId, type: 'Verbal', text: 'Choose the synonym of “Innovative”.', options: ['Creative', 'Lazy', 'Weak', 'Silent'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the antonym of “Expand”.', options: ['Grow', 'Stretch', 'Shrink', 'Increase'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Fill in the blank: The engineers _____ working on the server issue.', options: ['is', 'was', 'are', 'has'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the grammatically correct sentence.', options: ['He have submitted the report.', 'He has submitted the report.', 'He submitting the report.', 'He submitted has the report.'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'What does the idiom “Burn the midnight oil” mean?', options: ['Sleep early', 'Work late into the night', 'Waste time', 'Travel at night'], correct: 1, expReward: 50 },
  // Programming & DSA
  { company: companyId, type: 'Technical', text: 'Which data structure uses FIFO?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which sorting algorithm has divide-and-conquer approach?', options: ['Bubble Sort', 'Merge Sort', 'Selection Sort', 'Insertion Sort'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which keyword is used to create a class in Java?', options: ['define', 'struct', 'class', 'object'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which traversal uses a queue internally?', options: ['DFS', 'BFS', 'Inorder', 'Postorder'], correct: 1, expReward: 50 },
  // Technical Questions
  { company: companyId, type: 'Technical', text: 'Which language is mainly used for web page structure?', options: ['CSS', 'JavaScript', 'HTML', 'Python'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Sequential Query Logic', 'Server Question Language', 'System Query List'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which protocol is secure for websites?', options: ['FTP', 'HTTP', 'HTTPS', 'SMTP'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which database is NoSQL?', options: ['Oracle', 'PostgreSQL', 'MySQL', 'MongoDB'], correct: 3, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which operating system is open source?', options: ['Windows', 'macOS', 'Linux', 'iOS'], correct: 2, expReward: 50 }
];

const dataPath = path.join(__dirname, 'data.json');
const dbPath = path.join(__dirname, 'server', 'db.json');

// Update data.json
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `ibm-${Date.now()}-${index}`;
    data.questions[id] = { ...q, id };
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ Updated data.json');
}

// Update db.json
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `ibm-${Date.now()}-${index}`;
    db.questions.push({ ...q, id });
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✅ Updated db.json');
}
