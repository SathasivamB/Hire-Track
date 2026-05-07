const fs = require('fs');
const path = require('path');

const companyId = "Deloitte.";

const questionsToAdd = [
  // Logical Reasoning
  { company: companyId, type: 'Logic', text: 'Find the next number in the series: 2, 5, 10, 17, 26, ?', options: ['35', '37', '40', '45'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If “AUDIT” is coded as “BVEJU”, then “RISK” is coded as:', options: ['SJTL', 'TJSL', 'SJSM', 'TKTL'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'A person walks 5 km south and then 12 km east. In which direction is the person from the starting point?', options: ['North-East', 'South-East', 'North-West', 'South-West'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'Which number does not belong in the series? 4, 9, 16, 25, 35, 49', options: ['16', '25', '35', '49'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Logic', text: 'If all consultants are professionals and some professionals are managers, then:', options: ['All managers are consultants', 'Consultants are professionals', 'Managers are consultants', 'All professionals are consultants'], correct: 1, expReward: 50 },
  // Quantitative Aptitude
  { company: companyId, type: 'Quant', text: 'What is 12.5% of 640?', options: ['70', '75', '80', '85'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A train covers 360 km in 6 hours. What is its average speed?', options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'Solve: 6x − 12 = 24', options: ['4', '5', '6', '7'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'The average of 18, 22, 26, and 34 is:', options: ['24', '25', '26', '27'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Quant', text: 'A laptop costs ₹50,000 and is sold for ₹60,000. Find the profit percentage.', options: ['15%', '20%', '25%', '30%'], correct: 1, expReward: 50 },
  // Verbal Ability
  { company: companyId, type: 'Verbal', text: 'Choose the synonym of “Analyze”.', options: ['Ignore', 'Examine', 'Forget', 'Reject'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the antonym of “Complex”.', options: ['Difficult', 'Simple', 'Advanced', 'Complicated'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Fill in the blank: The manager _____ reviewing the report.', options: ['are', 'were', 'is', 'have'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'Choose the grammatically correct sentence.', options: ['The employees was working late.', 'The employees were working late.', 'The employees is working late.', 'The employees has working late.'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Verbal', text: 'What does the idiom “Think outside the box” mean?', options: ['Avoid work', 'Think creatively', 'Stay silent', 'Follow rules strictly'], correct: 1, expReward: 50 },
  // Analytical & Business Aptitude
  { company: companyId, type: 'Technical', text: 'What is the primary purpose of data analysis in business?', options: ['Increase confusion', 'Support decision-making', 'Delay projects', 'Reduce communication'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which skill is most important for consulting roles?', options: ['Analytical thinking', 'Painting', 'Singing', 'Cooking'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'If project cost increases but revenue remains constant, profit will:', options: ['Increase', 'Decrease', 'Stay same', 'Double'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which chart is best for comparing categories?', options: ['Pie chart', 'Bar chart', 'Scatter plot', 'Histogram'], correct: 1, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which Microsoft Excel feature is used for calculations?', options: ['Slides', 'Formulas', 'Animations', 'Templates'], correct: 1, expReward: 50 },
  // Technical Questions
  { company: companyId, type: 'Technical', text: 'Which language is commonly used for database queries?', options: ['HTML', 'CSS', 'SQL', 'XML'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which protocol is secure for internet communication?', options: ['HTTP', 'FTP', 'HTTPS', 'SMTP'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Processing User', 'Central Program Utility', 'Core Processing Unit'], correct: 0, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which database is relational?', options: ['MongoDB', 'Cassandra', 'MySQL', 'Redis'], correct: 2, expReward: 50 },
  { company: companyId, type: 'Technical', text: 'Which programming language is widely used for data analysis?', options: ['Python', 'HTML', 'CSS', 'XML'], correct: 0, expReward: 50 }
];

const dataPath = path.join(__dirname, 'data.json');
const dbPath = path.join(__dirname, 'server', 'db.json');

// Update data.json
if (fs.existsSync(dataPath)) {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `deloitte-${Date.now()}-${index}`;
    data.questions[id] = { ...q, id };
  });
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  console.log('✅ Updated data.json');
}

// Update db.json
if (fs.existsSync(dbPath)) {
  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  questionsToAdd.forEach((q, index) => {
    const id = `deloitte-${Date.now()}-${index}`;
    db.questions.push({ ...q, id });
  });
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
  console.log('✅ Updated db.json');
}
