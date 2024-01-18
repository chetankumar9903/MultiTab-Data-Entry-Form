const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
const app = express();
const port = 3000; // Change to your desired port

// Use body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Create a schema for the registration data
const registrationSchema = new mongoose.Schema({
  username: String,
  dob: String,
  email: String,
  phone_number: String,
  gender: String,
  occupation: String,
  id_type: String,
  id_number: String,
  authority: String,
  issued_state: String,
  issued_date: String,
  expiry_date: String,
  address: String,
  nationality: String,
  state: String,
  district: String,
  block_no: String,
  ward_no: String,
  father_name: String,
  mother_name: String,
  grandfather_name: String,
  designation: String,
  salary: String,
  education: String,
});

const Registration = mongoose.model('Registration', registrationSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Define a route to display the submitted data
// ... (your other app.js code)

// Define a route to display the submitted data
app.get('/display', async (req, res) => {
  try {
    const registration = await Registration.findOne({})
      .sort({ _id: -1 }) // Sort by ObjectId in descending order
      .exec();

    if (!registration) {
      res.redirect('/error.html');
    } else {
      res.render('display', { registration });
    }
  } catch (error) {
    console.error(error);
    res.redirect('/error.html');
  }
});

  
  // ... (your other app.js code)
  

app.post('/submit', async (req, res) => {
  try {
     // Create a new Registration document
     const registration = new Registration({
      username: req.body.username,
      dob: req.body.dob,
      email: req.body.email,
      phone_number: req.body.phone_number,
      gender: req.body.gender,
      occupation: req.body.occupation,
      id_type: req.body.id_type,
      id_number: req.body.id_number,
      authority: req.body.authority,
      issued_state: req.body.issued_state,
      issued_date: req.body.issued_date,
      expiry_date: req.body.expiry_date,
      address: req.body.address,
      nationality: req.body.nationality,
      state: req.body.state,
      district: req.body.district,
      block_no: req.body.block_no,
      ward_no: req.body.ward_no,
      father_name: req.body.father_name,
      mother_name: req.body.mother_name,
      grandfather_name: req.body.grandfather_name,
      designation: req.body.designation,
      salary: req.body.salary,
      education: req.body.education,
    });

    // Save the document to the database
    await registration.save();

    res.redirect('/success.html'); // Redirect to a success page
  } catch (error) {
    console.error(error);
    res.redirect('/error.html'); // Redirect to an error page
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
