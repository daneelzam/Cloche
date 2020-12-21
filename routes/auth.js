import express from 'express';
import bcrypt from 'bcrypt';
import { sessionChecker } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
  res.redirect('/auth/login');
});

router
  .route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('auth/login');
  })
  .post(async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        res.render('auth/login', { inf: 'Ошибка в имени пользователя или в пароле' });
      } else {
        req.session.user = user;
        res.redirect('/');
      }
    } catch (error) {
      res.render('error', error);
    }
  });

router
  .route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('auth/signup');
  })
  .post(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await new User({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
      try {
        await user.save();
        req.session.user = user;
        res.redirect('/');
      } catch (error) {
        res.render('auth/signup', { inf: 'Такой пользователь или Email уже существуют' });
      }
    } catch (error) {
      res.render('error', error);
    }
  });

router.get('/account', (req, res) => {
  if (req.session.user) {
    res.render('auth/account');
  } else {
    res.redirect('/auth/login');
  }
});

router.get('/logout', async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('back');
    } catch (error) {
      res.render('auth/error', error);
    }
  } else {
    res.redirect('back');
  }
});

export default router;
