// const mongoose = require("mongoose");

// const NutritionSchema = mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//     required: true
//   },
//   mealType: {
//     type: String,
//     enum: ["breakfast", "lunch", "dinner", "snacks"],
//     required: true
//   },
//   foodItems: [
//     {
//       name: {
//         type: String,
//         required: true
//       },
//       quantity: {
//         type: Number,
//         required: false
//       },
//       macros: {
//         proteins: {
//           type: Number,
//           required: false,
//         },
//         carbohydrates: {
//           type: Number,
//           required: false,
//         },
//         fats: {
//           type: Number,
//           required: false,
//         },
//       },
//       calories: {
//         type: Number,
//         required: false,
//       },
//     },
//   ],
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Nutrition", NutritionSchema);
