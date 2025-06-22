// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static('public'));
app.use(bodyParser.json());

// POST endpoint to send mail
app.post('/send-email', async (req, res) => {
  const { to, subject, message } = req.body;

  // Replace with your real SMTP credentials
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'pharuqgbadegesin5@gmail.com',
      pass: 'ersp zbbl gqyx iqyh' // Use App Password, not your Gmail password!
    }
  });

  try {
    await transporter.sendMail({
      from: '"SWTV" <yourgmail@gmail.com>',
      to,
      subject,
      text: message
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
