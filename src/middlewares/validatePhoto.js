export const validatePhoto = async (req, res, next) => {

  if (req.file) {
    req.body.photo = req.file.filename;
  } else {
    req.body.photo = "userdefaultphoto.jpg"
  }

  next();
}