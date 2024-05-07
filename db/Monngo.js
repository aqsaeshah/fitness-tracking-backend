
const  mongoose  = require('mongoose');


mongoose.connect(process.env.DB_URL)
  .then(function(){
    console.log("Connected to MongoDB");
   });

module.exports = mongoose; 