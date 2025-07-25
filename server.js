const express = require('express');
const path = require('path');
require('dotenv').config();
const sendCodeEmail = require('./utils/mailer'); // ⬅️ We’ll write this file

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

//Enable JSON parsing for incoming requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example endpoint (for later use)
app.get('/api/health', (req, res) => {
  res.json({ status: '✅ Server is running' });
});

// Endpoint /app/send-code route
const codeStore = {}; // Temporary in-memory store

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
}

app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const code = generateCode();
  codeStore[email] = code;

  try {
    await sendCodeEmail(email, code);
    res.json({ message: 'Code sent to email' });
    console.log(`✅ Sent code ${code} to ${email}`);
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    res.status(500).json({ error: 'Email could not be sent' });
  }
});

//Test Post
app.post('/test', (req, res) => {
  res.send('Test worked!');
});


app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
