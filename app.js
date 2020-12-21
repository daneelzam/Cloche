import express from 'express';
import config from './middleware/index.js';
import indexRouter from './routes/index.js';
import authRouter from './routes/auth.js';
import weeklyPlanRouter from './routes/weeklyPlan.js';
import recipeRouter from './routes/recipe.js';
import shopListRouter from './routes/shopList.js'

const app = express();

config(app);

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/weeklyPlan', weeklyPlanRouter);
app.use('/recipe', recipeRouter);
app.use('/shopList', shopListRouter);

export default app;
