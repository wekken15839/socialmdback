import multer from "multer";
import { dirname, extname, join } from "path";
import { fileURLToPath } from "url";
import { imageMimeTypes } from "../../config.js";
const CURRENT_DIR = dirname(fileURLToPath(import.meta.url));



export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: join(CURRENT_DIR, '../public/uploads'),
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  fileFilter: (req, file, cb) => {
    const mime = extname(file.originalname);
    if (!imageMimeTypes.includes(mime)) cb(null, true)
    else cb(new Error(`Only ${join(imageMimeTypes)} allowed, ${extname(file.originalname)} instead`), false);
  },
  limits: {
    fieldSize: 10000000
  }
}
)
