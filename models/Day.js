import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const daySchema = new Schema({
  breakfast: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  lunch: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  dinner: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
  snack: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' },
});

const Day = model('Day', daySchema);

export default Day;
