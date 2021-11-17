import util from "util"
import multer from "multer"
import { customAlphabet } from "nanoid"
import path from "path"
import { postFilter } from "../utils/image-utils"
const maxSize = 2 * 1024 * 1024

const nanoid = customAlphabet("abcdefghijjlmnopqrstuvwxyz", 10)

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const fileName = `post_${nanoid()}${Date.now()}${ext}`
    cb(null, fileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: postFilter
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;