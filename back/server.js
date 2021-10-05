require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


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




app.get('/', (req, res) => {

  Dead.find().then( result => {

    console.log(result)
    res.json(result)


  })
  .catch(error => {
    console.log(error)
  });

});

app.post('/addDead', (req, res) => {

  console.log(req.body)
  const person = req.body


  const newPerson = new Dead({
    name: person.name,
    birthday: person.birthday,
    died: person.died,
    cemetery: person.cemetery,
    location: { lat: person.location.lat, long: person.location.long }
  });
  newPerson.save()

  res.json( {message: "Toimii ja tallennettu"} )

});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

// kommentti
