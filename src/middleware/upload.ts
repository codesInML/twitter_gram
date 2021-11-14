import util from "util"
import multer from "multer"
import { customAlphabet } from "nanoid"
const maxSize = 2 * 1024 * 1024

const nanoid = customAlphabet("abcdefghijjlmnopqrstuvwxyz1234567890", 10)

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    const extArray = file.mimetype.split("/")
    const ext = extArray[extArray.length - 1]
    const fileName = `post_${nanoid()}.${ext}`
    cb(null, fileName);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
export default uploadFileMiddleware;