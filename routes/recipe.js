import express from 'express';
import WeeklyPlan from '../models/WeeklyPlan.js';
import Recipe from '../models/Recipe.js';
import Day from '../models/Day.js';
import {
  authChecker,
} from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', authChecker, async (req, res) => {
  const { id } = req.params;
  const weeklyPlan = await WeeklyPlan.findOne({ _id: id })
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
    .populate({ path: 'su', populate: { path: 'snack' } });
  const weekArr = [];
  for (const key in weeklyPlan) {
    if (
      key === 'mo'
      || key === 'tu'
      || key === 'we'
      || key === 'th'
      || key === 'fr'
      || key === 'sa'
      || key === 'su'
    ) {
      weekArr.push({ key, plan: weeklyPlan[key] });
    }
  }
  res.render('weeklyPlan/detailedPlan', { weekArr });
});

router.post('/:id', authChecker, async (req, res) => {
  const planId = req.params.id;
  const { week } = req.body;
  await week.forEach(async (day) => {
    const weeklyPlan = await WeeklyPlan.findOne({ _id: planId });
    const dayName = day.name.toLowerCase();
    const breakfastRecipe = await new Recipe({
      nameOfDish: day.breakfast.nameOfDish,
      linkToRecipe: day.breakfast.linkToRecipe,
      recipe: day.breakfast.recipe,
      ingredients: day.breakfast.ingredients,
    });
    const lunchRecipe = await new Recipe({
      nameOfDish: day.lunch.nameOfDish,
      linkToRecipe: day.lunch.linkToRecipe,
      recipe: day.lunch.recipe,
      ingredients: day.lunch.ingredients,
    });
    const dinnerRecipe = await new Recipe({
      nameOfDish: day.dinner.nameOfDish,
      linkToRecipe: day.dinner.linkToRecipe,
      recipe: day.dinner.recipe,
      ingredients: day.dinner.ingredients,
    });
    const snackRecipe = await new Recipe({
      nameOfDish: day.snack.nameOfDish,
      linkToRecipe: day.snack.linkToRecipe,
      recipe: day.snack.recipe,
      ingredients: day.snack.ingredients,
    });
    await breakfastRecipe.save();
    await lunchRecipe.save();
    await dinnerRecipe.save();
    await snackRecipe.save();
    const newDay = new Day({
      breakfast: breakfastRecipe.id,
      lunch: lunchRecipe.id,
      dinner: dinnerRecipe.id,
      snack: snackRecipe.id,
    });
    await newDay.save();
    weeklyPlan[dayName] = newDay.id;

    const brClear = breakfastRecipe.ingredients.split('\n').filter((ingList) => ingList !== '' && ingList !== null);
    if (brClear.length) {
      brClear.forEach((ing) => weeklyPlan.shopList.push(ing));
    }

    const lchClear = lunchRecipe.ingredients.split('\n').filter((ingList) => ingList !== '' && ingList !== null);
    if (lchClear.length) {
      lchClear.forEach((ing) => weeklyPlan.shopList.push(ing));
    }

    const dnClear = dinnerRecipe.ingredients.split('\n').filter((ingList) => ingList !== '' && ingList !== null);
    if (dnClear.length) {
      dnClear.forEach((ing) => weeklyPlan.shopList.push(ing));
    }

    const snClear = snackRecipe.ingredients.split('\n').filter((ingList) => ingList !== '' && ingList !== null);
    if (snClear.length) {
      snClear.forEach((ing) => weeklyPlan.shopList.push(ing.trim()));
    }
    await weeklyPlan.save();
  });
  res.json({ url: `${req.protocol}://${req.headers.host}/recipe/${planId}` });
});

export default router;
