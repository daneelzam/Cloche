export function coookieCleaner(req, res, next) {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie('user_sid');
  }
  next();
}

export function sessionChecker(req, res, next) {
  if (req.session.user) {
    res.redirect('/auth/account');
  } else {
    next();
  }
}

export function authChecker(req, res, next) {
  if (!req.session.user) {
    res.redirect('/auth');
  } else {
    next();
  }
}

export function getLocals(req, res, next) {
  if (req.session.user) {
    res.locals.name = req.session.user.username;
    res.locals.userId = req.session.user._id;
  }
  res.locals.diet = [{name: 'Breakfast'},{name: 'Lunch'}, {name: 'Dinner'}, {name: 'Snack'}];
  next();
}
