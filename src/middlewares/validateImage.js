export const validateImage = async (req, res, next) => {
  try {
    req.body.user = req.user;

    if (req.fileValidationError)
      return res.status(400).json({ message: req.fileValidationError });

    if (req.file) {
      req.body.image = req.file.filename;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
