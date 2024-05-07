require('dotenv').config()
const express = require('express');
const mongoose = require('./db/Monngo.js');
const userRoutes = require('./routes/UserRoutes');
const WorkoutRoute = require('./routes/WorkoutRoutes.js');
const path = require('path')
const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(WorkoutRoute);
app.use('/uploads', express.static(path.join(__dirname, './middleware/upload')));
app.listen(process.env.PORT);