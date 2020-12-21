import express from 'express';
import { authChecker } from '../middleware/auth.js';
import WeeklyPlan from '../models/WeeklyPlan.js';

const router = express.Router();

router.get('/:id', authChecker, async (req, res) => {
  const { id } = req.params;
  const weeklyPlan = await WeeklyPlan.findOne({ _id: id });
  const shopList = weeklyPlan.shopList.sort().filter((elem) => elem !== " ");
  res.render('weeklyPlan/shopList', { shopList });
});

export default router;
