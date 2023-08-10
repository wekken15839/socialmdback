export const validateImage = async (req, res, next) => {

  req.body.user = req.user;


  if (req.file) {
    req.body.image = req.file.filename;
  }

  next();

}