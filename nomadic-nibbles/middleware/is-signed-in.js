const isSignedIn = (req, res, next) => {
  if (req.session.user) return next();
  res.redirect("/sign-in");
};
export default isSignedIn;
