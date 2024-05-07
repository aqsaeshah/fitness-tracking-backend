const mongoose = require('mongoose');

const workoutSchema =  mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    set:{
        type: Number,
        required: true
    },
    reps:{
        type: Number,
        required: true
    },
    weight:{
        type: Number,
        required: false
    },
    
    
    });

  

  module.exports = mongoose.model('Workout', workoutSchema);
