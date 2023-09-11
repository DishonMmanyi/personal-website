const express = require('express');
const path = require('path'); // Import the 'path' module
const app = express(); //making express application
const port = process.env.PORT || 3000; // port number server will run in
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Serve static files from the 'client folder
app.use(express.static(path.join(__dirname, '../client/src')));

// Use bodyParser middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//http endpoint to render the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/src/index.html'));
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  secure: false, // Set this to true if you want to use a secure connection (STARTTLS)
});

//http endpoint to handle email sending functionality
app.post('/send-email', (req, res) => {
  const { name, email, number, subject, message } = req.body;


  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.SMTP_USER,
    subject: `Email from Portfolio Website: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nNumber: ${number}\nMessage: ${message}`,
    replyTo: email,
  };


  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      // Log the error message
      res.status(500).send(`Error sending email: ${error.message}`);
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});



// starts an http server to listen for requests
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


