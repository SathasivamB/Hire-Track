const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require('fs');

const DB_FILE = path.join(__dirname, 'data.json');

// Initialize file-based DB
let db = {
  users: {},
  companies: {},
  questions: {},
  requests: {},
  logs: []
};

// Load existing data if file exists
if (fs.existsSync(DB_FILE)) {
  try {
    db = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    console.log("✅ Database loaded from data.json (V3 - FIXED REQUESTS)");
  } catch (e) {
    console.error("Error reading data.json:", e);
  }
} else {
  console.log("⚠️ data.json not found, starting with empty database.");
}

const saveDb = () => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
};

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve Static Files from React Build
app.use(express.static(path.join(__dirname, "build")));

// --- UTILS ---
const addLog = (action, details) => {
  try {
    db.logs.push({
      action,
      details,
      timestamp: new Date().toISOString()
    });
    saveDb();
  } catch (e) { console.error('Logging failed', e); }
};

// --- API ROUTES ---

app.post('/api/register', (req, res) => {
  const { email, password, name, studentId, department } = req.body;
  console.log(`📝 Attempting registration for: ${email}`);
  
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
  if (!password) return res.status(400).json({ success: false, message: 'Password is required.' });

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const existing = db.users[normalizedEmail];
    
    // Block re-registration only if account is fully set up (has a password)
    if (existing && existing.password) {
      console.log(`⚠️ Registration failed: ${normalizedEmail} already exists with a password.`);
      return res.status(400).json({ success: false, message: 'This email is already registered. Please log in instead.' });
    }

    // Generate initials safely
    const nameToClean = (name && typeof name === 'string') ? name : 'Student User';
    const cleanName = nameToClean.trim();
    const initials = (cleanName.charAt(0) + cleanName.charAt(Math.max(0, cleanName.length - 1))).toUpperCase();

    const newUser = {
      email: normalizedEmail,
      password: password || '',
      name: name || 'Student',
      studentId: studentId || '',
      department: department || '',
      initials,
      exp: 0,
      unlockedCompanies: ['StartupInc'],
      questionsAnswered: 0,
      accuracy: 0,
      streak: 0,
      history: [],
      editPermission: 'none'
    };

    db.users[normalizedEmail] = newUser;
    saveDb();
    
    console.log(`New user registered: ${email}`);
    res.json({ success: true, user: newUser });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Registration failed: ' + error.message });
  }
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  console.log(`🔑 Login attempt for: ${email}`);
  
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
  if (!password) return res.status(400).json({ success: false, message: 'Password is required.' });

  try {
    const normalizedEmail = email.toLowerCase().trim();
    const normalizedPassword = password.trim();
    const userDoc = db.users[normalizedEmail];
    
    if (!userDoc) {
      console.log(`❌ Login failed: User not found - ${normalizedEmail}`);
      return res.status(401).json({ success: false, message: 'No account found with this email. Please register first.' });
    }

    if (!userDoc.password) {
      console.log(`❌ Login failed: Account incomplete (no password) - ${normalizedEmail}`);
      return res.status(401).json({ success: false, message: 'This account is incomplete. Please register again to set your password.' });
    }

    if (userDoc.password === normalizedPassword) {
      console.log(`✅ Login successful: ${normalizedEmail}`);
      res.json({ success: true, user: userDoc });
    } else {
      console.log(`❌ Login failed: Password mismatch for ${normalizedEmail}`);
      res.status(401).json({ success: false, message: 'Incorrect password. Please try again.' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/profile', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });
  try {
    const userDoc = db.users[email.toLowerCase().trim()];
    if (userDoc) res.json(userDoc);
    else res.status(404).json({ message: 'User not found' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.put('/api/users/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  const updates = req.body;
  try {
    if (db.users[email]) {
      // Security: Revoke permission after update
      db.users[email] = { ...db.users[email], ...updates, editPermission: 'none' };
      saveDb();
      res.json(db.users[email]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) { res.status(500).json({ error: error.message }); }
});

app.get('/api/companies', (req, res) => {
  res.json(Object.values(db.companies));
});

app.post('/api/companies', (req, res) => {
  const company = req.body;
  db.companies[company.id] = company;
  saveDb();
  res.json(company);
});

app.delete('/api/companies/:id', (req, res) => {
  delete db.companies[req.params.id];
  saveDb();
  res.json({ message: 'Deleted' });
});

app.put('/api/companies/:id', (req, res) => {
  const id = req.params.id;
  if (db.companies[id]) {
    db.companies[id] = { ...db.companies[id], ...req.body };
    // if ID changed, we should ideally handle it, but for now assuming ID doesn't change during edit
    saveDb();
    res.json(db.companies[id]);
  } else {
    res.status(404).json({ message: 'Company not found' });
  }
});

app.get('/api/questions', (req, res) => {
  res.json(Object.values(db.questions));
});

app.post('/api/questions', (req, res) => {
  const question = req.body;
  db.questions[String(question.id)] = question;
  saveDb();
  res.json(question);
});

app.delete('/api/questions/:id', (req, res) => {
  delete db.questions[req.params.id];
  saveDb();
  res.json({ message: 'Deleted' });
});

app.delete('/api/questions/bulk/:companyId', (req, res) => {
  const { companyId } = req.params;
  let count = 0;
  
  if (companyId === 'all') {
    count = Object.keys(db.questions).length;
    db.questions = {};
    addLog('Question Bank Wiped', `Admin deleted all questions.`);
  } else {
    const questionIds = Object.keys(db.questions);
    questionIds.forEach(id => {
      if (db.questions[id].company === companyId) {
        delete db.questions[id];
        count++;
      }
    });
    addLog('Bulk Question Delete', `Admin deleted ${count} questions for company: ${companyId}.`);
  }
  
  saveDb();
  res.json({ success: true, count });
});

// Edit/update a question
app.put('/api/questions/:id', (req, res) => {
  const id = req.params.id;
  if (db.questions[id]) {
    db.questions[id] = { ...db.questions[id], ...req.body };
    saveDb();
    res.json(db.questions[id]);
  } else {
    res.status(404).json({ message: 'Question not found' });
  }
});

app.get('/api/requests', (req, res) => {
  res.json(Object.values(db.requests));
});

app.post('/api/requests', (req, res) => {
  const id = Date.now().toString();
  const request = { ...req.body, id, status: 'pending', timestamp: new Date().toLocaleString() };
  db.requests[id] = request;
  
  // Mark user as pending in their profile
  const userId = req.body.userId; // This is the email
  if (userId && db.users[userId]) {
    db.users[userId].editPermission = 'pending';
  }
  
  saveDb();
  addLog('Permission Requested', `${req.body.userName} requested edit access.`);
  res.json(request);
});

app.delete('/api/requests/:id', (req, res) => {
  delete db.requests[req.params.id];
  saveDb();
  res.json({ message: 'Deleted' });
});

// Admin: approve/deny access request & update user permission
app.put('/api/requests/:id', (req, res) => {
  const { status } = req.body;
  const req_id = req.params.id;
  if (db.requests[req_id]) {
    db.requests[req_id].status = status;
    const userId = db.requests[req_id].userId;
    
    if (userId && db.users[userId]) {
      if (status === 'approved') {
        db.users[userId].editPermission = 'granted';
        addLog('Permission Granted', `Edit access granted to ${db.requests[req_id].userName}.`);
      } else {
        db.users[userId].editPermission = 'none';
        addLog('Permission Rejected', `Edit access denied for ${db.requests[req_id].userName}.`);
      }
    }
    saveDb();
    res.json({ success: true });
  } else {
    res.status(404).json({ message: 'Request not found' });
  }
});

app.get('/api/logs', (req, res) => {
  const sortedLogs = [...db.logs].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50);
  res.json(sortedLogs);
});

// Return users WITHOUT passwords for security
app.get('/api/users', (req, res) => {
  const safeUsers = Object.values(db.users).map(u => {
    const { password, ...safeUser } = u;
    // Calculate level based on totalExp if it exists, otherwise fallback to exp
    const xpForLevel = safeUser.totalExp || safeUser.exp || 0;
    safeUser.level = Math.floor(xpForLevel / 500) + 1;
    return safeUser;
  });
  res.json(safeUsers);
});

// Admin: delete a specific user
app.delete('/api/users/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email).toLowerCase();
  if (db.users[email]) {
    delete db.users[email];
    saveDb();
    res.json({ message: 'User deleted' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

app.post('/api/admin/wipe', (req, res) => {
  db.users = {};
  saveDb();
  addLog('System Wipe', 'All user data wiped.');
  res.json({ message: 'Wiped' });
});

// Fallback to React Router
app.get(/^(.*)$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
