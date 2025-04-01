const passUserToView = (req, res, next) => {
  res.locals.user = req.session.user || null;
  req.user = req.session.user || null;
  next();
};

export default passUserToView;
