const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve the HTML form at root
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // assuming you have an index.html file
});

// Handle POST request
// app.post('/add-contact', (req, res) => {
//   const { lastName, firstName, phone, email } = req.body;
//   const vCardEntry = `
// BEGIN:VCARD
// VERSION:3.0
// N:${lastName};${firstName};;;
// FN:${firstName} ${lastName}
// TEL;TYPE=HOME,VOICE:${phone}
// EMAIL;TYPE=PREF,INTERNET:${email}
// END:VCARD
// `;
//   fs.appendFile('contacts.vcf', vCardEntry, (err) => {
//     if (err) throw err;
//     console.log('Contact saved!');
//     res.send('Contact added successfully!');
//   });
// });



//
app.use('/addNewContact', require('./routes/addNewContact/addNewContact'))


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
