
const  mongoose  = require('mongoose');


mongoose.connect('mongodb+srv://cityguideaqshah:aptecheshah12345@cluster0.gbsgqil.mongodb.net/FitnessWebapp?retryWrites=true&w=majority&appName=Cluster0')
  .then(function(){
    console.log("Connected to MongoDB");
   });

module.exports = mongoose; 