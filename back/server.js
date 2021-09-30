require('dotenv').config()
const express = require('express');
const app = express();


const port = process.env.PORT;

app.get('/', (req, res) => {

  res.json({
      name: 'Gösta Sundqvist',
      birthday: '17.05.1957',
      died: '16.08.2003',
      cemetery: 'Kellonummen hautausmaa',
      location: {
          lat: 60.236842,
          long: 24.642426
      }
  })

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});
