import express from 'express';
import WeeklyPlan from '../models/WeeklyPlan.js';
import { authChecker } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authChecker, async (req, res) => {
  let weeklyPlans = await WeeklyPlan.find().populate('host')
    .populate({ path: 'mo', populate: { path: 'breakfast' } })
    .populate({ path: 'mo', populate: { path: 'lunch' } })
    .populate({ path: 'mo', populate: { path: 'dinner' } })
    .populate({ path: 'mo', populate: { path: 'snack' } })

    .populate({ path: 'tu', populate: { path: 'breakfast' } })
    .populate({ path: 'tu', populate: { path: 'lunch' } })
    .populate({ path: 'tu', populate: { path: 'dinner' } })
    .populate({ path: 'tu', populate: { path: 'snack' } })

    .populate({ path: 'we', populate: { path: 'breakfast' } })
    .populate({ path: 'we', populate: { path: 'lunch' } })
    .populate({ path: 'we', populate: { path: 'dinner' } })
    .populate({ path: 'we', populate: { path: 'snack' } })

    .populate({ path: 'th', populate: { path: 'breakfast' } })
    .populate({ path: 'th', populate: { path: 'lunch' } })
    .populate({ path: 'th', populate: { path: 'dinner' } })
    .populate({ path: 'th', populate: { path: 'snack' } })

    .populate({ path: 'fr', populate: { path: 'breakfast' } })
    .populate({ path: 'fr', populate: { path: 'lunch' } })
    .populate({ path: 'fr', populate: { path: 'dinner' } })
    .populate({ path: 'fr', populate: { path: 'snack' } })

    .populate({ path: 'sa', populate: { path: 'breakfast' } })
    .populate({ path: 'sa', populate: { path: 'lunch' } })
    .populate({ path: 'sa', populate: { path: 'dinner' } })
    .populate({ path: 'sa', populate: { path: 'snack' } })

    .populate({ path: 'su', populate: { path: 'breakfast' } })
    .populate({ path: 'su', populate: { path: 'lunch' } })
    .populate({ path: 'su', populate: { path: 'dinner' } })
    .populate({ path: 'su', populate: { path: 'snack' } })
    .sort({ datetime: 1 });
  const { protocol } = req;
  const urlHost = req.get('host');
  weeklyPlans = weeklyPlans.filter((plan) => plan.host.username === req.session.user.username);
  weeklyPlans = weeklyPlans.map((plan) => {
    plan.startDate = plan.start.toString().slice(0, 15);
    plan.endDate = plan.end.toString().slice(0, 15);
    return plan;
  });
  res.render('index', {
    weeklyPlans,
    protocol,
    urlHost,
  });
});

export default router;
