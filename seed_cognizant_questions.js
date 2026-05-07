const fs = require('fs');
const path = require('path');

const companyId = "Cognizant";

const questionsToAdd = [
  // Logical Reasoning
  { company: companyId, type: 'Logic', text: 'Find the next number in the series: 1, 4, 9, 16, 25, ?', options: ['30', '35', '36', '49'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If “TRAIN” is coded as “USBJO”, then “PLANE” is coded as:', options: ['QMBOF', 'QMBOE', 'QLBOD', 'PMBOF'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'A man walks 6 km north, then 8 km east. In which direction is he from the starting point?', options: ['North-West', 'South-East', 'North-East', 'South-West'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'Which number is the odd one out? 7, 14, 21, 29, 35', options: ['14', '21', '29', '35'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If all programmers are logical thinkers and some logical thinkers are gamers, then:', options: ['All gamers are programmers', 'Programmers are logical thinkers', 'Gamers are programmers', 'All logical thinkers are programmers'], correct: 1, expReward: 50 },
  // Quantitative Aptitude
  { company: companyId, type: 'Quant', text: 'What is 40% of 250?', options: ['80', '90', '100', '110'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A bus travels 300 km in 5 hours. What is its speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'Solve: 5x + 10 = 35', options: ['3', '4', '5', '6'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'The average of 14, 18, 22, and 26 is:', options: ['18', '20', '22', '24'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A product is bought for ₹1200 and sold for ₹1500. Find the profit percentage.', options: ['20%', '25%', '30%', '35%'], correct: 1, expReward: 50 },
  // Verbal Ability
  { company: companyId, type: 'Verbal', text: 'Choose the synonym of “Accurate”.', options: ['Correct', 'Wrong', 'False', 'Weak'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the antonym of “Flexible”.', options: ['Soft', 'Rigid', 'Elastic', 'Smooth'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Fill in the blank: The employees _____ attending the meeting.', options: ['is', 'was', 'are', 'has'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the grammatically correct sentence.', options: ['They has completed the project.', 'They have completed the project.', 'They having completed the project.', 'They completes the project.'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'What does the idiom “On cloud nine” mean?', options: ['Feeling sad', 'Feeling nervous', 'Feeling very happy', 'Feeling angry'], correct: 2, expReward: 50 },
  // Programming & Analytical
  { company: companyId, type: 'Technical', text: 'Which data structure follows LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What is the time complexity of linear search?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which sorting algorithm repeatedly compares adjacent elements?', options: ['Merge Sort', 'Quick Sort', 'Bubble Sort', 'Heap Sort'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which traversal method visits Left → Root → Right?', options: ['Preorder', 'Postorder', 'Inorder', 'BFS'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which keyword is used to define a function in Python?', options: ['function', 'define', 'fun', 'def'], correct: 3, expReward: 50 },
  // Technical Questions
  { company: companyId, type: 'Technical', text: 'Which language is primarily used for web styling?', options: ['HTML', 'CSS', 'Java', 'Python'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What does SQL stand for?', options: ['Structured Query Language', 'Sequential Query Logic', 'Server Query List', 'System Query Language'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which protocol securely transfers web data?', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which database is a NoSQL database?', options: ['Oracle', 'PostgreSQL', 'MongoDB', 'MySQL'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which JavaScript keyword declares a block-scoped variable?', options: ['var', 'let', 'static', 'define'], correct: 1, expReward: 50 }
];

const dataPath = path.join(__dirname, 'data.json');
const dbPath = path.join(__dirname, 'server', 'db.json');

// Update data.json
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `cognizant-${Date.now()}-${index}`;
    data.questions[id] = { ...q, id };
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ Updated data.json');
}

// Update db.json
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `cognizant-${Date.now()}-${index}`;
    db.questions.push({ ...q, id });
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✅ Updated db.json');
}
