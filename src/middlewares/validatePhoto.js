export const validatePhoto = async (req, res, next) => {

  req.body.user = req.user;

  if (req.file) {
    req.body.photo = req.file.filename;
  } else {
    req.body.photo = "userdefaultphoto.jpg"
  }

  next();
}