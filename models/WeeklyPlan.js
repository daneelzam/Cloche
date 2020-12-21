import mongoose from 'mongoose';

const {
  Schema,
  model,
} = mongoose;

const weeklyPlanSchema = new Schema({
  start: Date,
  startDate: String,
  end: Date,
  endDate: String,
  mo: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  tu: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  we: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  th: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  fr: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  sa: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  su: { type: mongoose.Schema.Types.ObjectId, ref: 'Day' },
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  datetime: { type: Date, default: new Date() },
  shopList: { type: [String], default: [] },
});

const WeeklyPlan = model('WeeklyPlan', weeklyPlanSchema);

export default WeeklyPlan;
