import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import { imageMimeTypes } from "../../config.js";
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));

export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, "../public/uploads"),
    filename: (req, file, cb) => {
      const fileExtension = extname(file.originalname);
      const fileName = file.originalname.split(fileExtension)[0];
      cb(null, `${fileName}-${Date.now()}${fileExtension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (imageMimeTypes.includes(file.mimetype)) {
      console.log("ok");
      cb(null, true);
    } else {
      cb(null, false);
      req.fileValidationError = "goes wrong on the mimetype";
      return cb(null, false, new Error("goes wrong on the mimetype"));
    }
  },
  limits: {
    fieldSize: 10000000,
  },
});
