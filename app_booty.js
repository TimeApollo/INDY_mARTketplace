require( 'dotenv-safe' ).config({ allowEmptyValues: true })
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const controllers = require("./controllers");

const app = express();

//security
// app.use(cors());

//settings
app.set("port", process.env.PORT || 5000);

//middleware
app.use(morgan('dev'))
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'client/build')));

// needed to direct express to serve files
app.use(express.static(path.join(__dirname, 'client/build')));

//Api route
app.use('/api/messages', controllers.messages);
app.use('/api/auth', controllers.auth);
app.use('/api/artwork', controllers.artwork);
app.use('/api/artist', controllers.artist);

//catch all to redirect everything back to the index file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const URI = 'mongodb://localhost:27017/art'
// const URI = process.env.MONGODB_URI
// console.log(URI)

app.listen(app.get("port"), () => {
  console.log(`API server started on port ${app.get("port")}`)
})

mongoose.connect( process.env.MONGODB_URI , { useNewUrlParser: true } );
// console.log(mongoose.connection)
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + process.env.MONGODB_URI);
}); 

// dont use in production. this is for local deployment.
// const gracefulExit = function() { 
//   mongoose.connection.close(function () {
//     console.log('Mongoose default connection with DB :' + process.env.MONGODB_URI + ' is disconnected through app termination');
//     process.exit(0);
//   });
// }

// process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);


