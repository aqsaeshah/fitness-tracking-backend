const express = require('express');
const WorkoutRouter = express.Router();
const Workout = require('../db/Workout');


WorkoutRouter.post("/workoutregister", async function (req, res) {

    try {
        const { name, set, reps, weight } = req.body

        const workout = new Workout({
            name,
            set,
            reps,
            weight

        })
        await workout.save()
        res.send(workout)
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ Message: "Workout not registered " })
    }
});

WorkoutRouter.delete('/workouts/:id', async (req, res) => {
    const workoutId = req.params.id;

    try {
        // Find the workout by ID and delete it
        const deletedWorkout = await Workout.findByIdAndDelete(workoutId);

        // If workout is not found, return 404 status
        if (!deletedWorkout) {
            return res.status(404).json({ message: 'Workout not found' });
        }

        // If workout is deleted successfully, return success message
        res.json({ message: 'Workout deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

WorkoutRouter.put('/workouts/:id', async (req, res) => {
    const workoutId = req.params.id;
  
    try {
      // Find the workout by ID and update it
      const updatedWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        req.body,
        { new: true } // Return the updated workout
      );
  
      // If workout is not found, return 404 status
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      // If workout is updated successfully, return the updated workout
      res.json(updatedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  WorkoutRouter.put('/workouts/:id', async (req, res) => {
    const workoutId = req.params.id;
  
    try {
      // Find the workout by ID and update it
      const updatedWorkout = await Workout.findByIdAndUpdate(
        workoutId,
        req.body,
        { new: true } // Return the updated workout
      );
  
      // If workout is not found, return 404 status
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      // If workout is updated successfully, return the updated workout
      res.json(updatedWorkout);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = WorkoutRouter
