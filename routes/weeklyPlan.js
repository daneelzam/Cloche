import express from 'express';
import WeeklyPlan from '../models/WeeklyPlan.js';
import { authChecker } from '../middleware/auth.js';

const router = express.Router();

const week = [{ day: 'Mo' }, { day: 'Tu' }, { day: 'We' }, { day: 'Th' }, { day: 'Fr' }, { day: 'Sa' }, { day: 'Su' }];

router.get('/', authChecker, (req, res) => {
  res.render('weeklyPlan/createPlan');
});

router.post('/', authChecker, async (req, res) => {
  const {
    start,
    end,
    host,
  } = req.body;
  const weeklyPlan = await new WeeklyPlan({
    start,
    end,
    host,
  });
  await weeklyPlan.save();
  res.json({ url: `${weeklyPlan._id}` });
});

router.get('/:id', authChecker, async (req, res) => {
  const { id } = req.params;
  const weeklyPlan = await WeeklyPlan.findOne({ _id: id }).populate('host');
  if ((req.session.user) && (weeklyPlan.host.username === req.session.user.username)) {
    const admin = true;
    res.render('weeklyPlan/weeklyPlan', { weeklyPlan, admin, week });
  } else {
    res.render('weeklyPlan/weeklyPlan', { weeklyPlan });
  }
});

router.get('/edit/:id', authChecker, async (req, res) => {
  const _id = req.params.id;
  const weeklyPlan = await WeeklyPlan.findOne({ _id });
  res.render('weeklyPlan/editPlan', { weeklyPlan });
});

router.put('/:id', authChecker, async (req, res) => {
  const { id } = req.params;
  const {
    start,
    end,
    host,
  } = req.body;
  const weeklyPlan = await WeeklyPlan.findOne({ _id: id });
  weeklyPlan.start = start;
  weeklyPlan.end = end;
  weeklyPlan.host = host;
  await weeklyPlan.save();
  res.json({ url: `${weeklyPlan._id}` });
});

router.delete('/:id', authChecker, async (req, res) => {
  const _id = req.params.id;
  await WeeklyPlan.deleteOne({ _id });
  res.redirect('/');
});
export default router;
