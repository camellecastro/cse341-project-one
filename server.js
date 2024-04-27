const express = require('express');
// const bodyParser = require('body-parser');

// const mongodb = require('/', require('./data/database'));
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if(err){
    console.log(err);
  }
});

app.listen(port, () => {
    console.log(`Database is listening and Node running on port: ${port}`);
});

// mongodb.initDb((err) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         app.listen(port, () => { console.log(`Database is listening and Node running on port: ${port}`)});
//     }
// });

