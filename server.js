// server.js
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
// Serve frontend
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Multer for optional PDF upload
const upload = multer({ dest: 'uploads/' });

// POST endpoint to send mail with optional PDF
app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const { to, subject, message } = req.body;
  const file = req.file;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'swtv901@gmail.com',
      pass: 'vshe bpjj eunq szss' // Use App Password, not your Gmail password!
    }
  });

  // Email configuration
  let mailOptions = {
    from: '"swtv" <swtv901@gmail.com>',
    to,
    subject,
    text: message,
    attachments: []
  };

  // Add PDF if it exists
  if (file) {
    mailOptions.attachments.push({
      filename: file.originalname,
      path: file.path,
      contentType: 'application/pdf'
    });
  }

  try {
    await transporter.sendMail(mailOptions);

    // Delete uploaded file after sending
    if (file) {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting temp file:', err);
      });
    }

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
