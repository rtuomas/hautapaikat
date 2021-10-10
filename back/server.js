require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();


app.use(express.json())
app.use(cors())


const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;


mongoose.connect(DB_URL)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const deadSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  died: Date,
  cemetery: String,
  location: {
    lat: Number, long: Number
  }
})
const Dead = mongoose.model('Dead', deadSchema)

const userSchema = new mongoose.Schema({
  username: String,
  password: String
})
const User = mongoose.model('User', userSchema)




app.get('/', (req, res) => {

  Dead.find().then( result => {
    //console.log(result)
    res.json(result)
  })
  .catch(error => {
    console.log(error)
  });

});


//TODO middleware varmistus siitä että on oikeutettu lisäämään henkilö /tuomas
app.post('/api/addDead', authenticateToken, (req, res) => {

  //console.log("addDEAD", req.body)
  const person = req.body


  const newPerson = new Dead({
    name: person.firstName + " " + person.lastName,
    birthday: person.birthday,
    died: person.died,
    cemetery: person.cemetery,
    location: {
      lat: +person.location.lat,
      long: +person.location.long
    }
  });
  newPerson.save()

  res.json( {message: "New grave added!"} )

});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    // Älä poista /tuomas
    //return res.status(401).json( {message: "Please login first! (token null)"} )
    return res.json( {message: "Please login first! (token null)"} )
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

    // Älä poista /tuomas
    //if (err) return res.status(403).json({message: "Please login first! (error)"})
    if (err) return res.json( {message: "Please login first! (error jwt verifying)"} )

    console.log('user', user)
    console.log("user (decoded) " + JSON.stringify(user))

    req.user = user

    next()
  })
}


app.post('/api/newUser', (req, res) => {
  console.log("newUser")

  const username = req.body.username
  const password = req.body.password
  const password2 = req.body.password2

  //Varmistukset!!! /tuomas
  if(validateInputs(username, password, password2)){

    User
    .find( {username: username} )
    .then(async function(result) {
      if(result.length>0){
        res.json({
          status: 400,
          message: "Username already in use."
        })
      } else {

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = dd + '/' + mm + '/' + yyyy;

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const user = new User({
          username: username,
          password: hashedPass,
          created: today
        });
        await user.save()

        res.status(202).json({
          status: 202,
          message: "Successful registration."
        })
      }
    })

  } else {
    res.json({
      status: 400,
      message: "Validation failed."
    })
  }



});

function validateInputs(username, password, password2){
  return username.length > 0 &&
      password.length > 0 &&
      password2.length > 0 &&
      password === password2
}

app.post('/api/login', (req, res) => {
  console.log("login")

  const username = req.body.username
  const password = req.body.password

  //Tänne myös jotain varmistuksia? /tuomas
  User
    .find( {username: username} )
    .then(async function(result) {

      const match = await bcrypt.compare(password, result[0].password);

      if(match) {

        const accessToken = jwt.sign({username: result[0].username}, process.env.JWT_SECRET)

        res.status(202).json({
          status: 202,
          message: "Login successful",
          username: result[0].username,
          accessToken: accessToken
        })
        //console.log('asd')
        //res.redirect('http://localhost:3000')
        //res.json(200)

      } else {
        res.json({
          status: 401,
          message: "Username or password wrong, try again!"
        })
      }
    })
    .catch( () => {
      res.json({
        status: 401,
        message: "Username or password wrong, try again!"
      })
    })
});

app.listen(PORT, () => {
  console.log(`HAUTAPAIKAT listening on port ${PORT}!`)
});
