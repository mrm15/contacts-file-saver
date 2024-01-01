const express = require('express');
const fs = require('fs');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');

const app = express();
const port = 3050;

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({extended: false}));
// built-in middleware for json
app.use(express.json());

const bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//middleware for cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
const credentials = require('./middleware/credentials');
app.use(credentials);


app.use(cors(corsOptions));
// Serve the HTML form at root
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html'); // assuming you have an index.html file
// });

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


// Login Request
app.use('/login', require('./routes/loginRegisterWithSms/loginSMS'))
app.use('/refresh', require('./routes/auth/refresh')); // must extend


// i need to  verify JWT here

const verifyJWT = require('./middleware/verifyJWT');
app.use(verifyJWT);
app.use('/logout', require('./routes/loginRegisterWithSms/logout'))

// users Action /add //delete // edit
app.use('/users', require('./routes/users/users'))

app.use('/contact', require('./routes/contact/contactsRouts'))


// Contacts Action
// app.use('/addContact', require('./routes/contact/addnewUser'))
// app.use('/deleteContact', require('./routes/contact/delete'))
// app.use('/editContact', require('./routes/contact/edit'))
// app.use('/listContact', require('./routes/contact/list'))



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
