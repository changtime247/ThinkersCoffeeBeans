import express from 'express'
import multer from 'multer'
import path from 'path'
import { isAdmin, protect } from '../middleware/authMiddleware.js'
const router = express.Router()

function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimeType = fileTypes.test(file.mimetype)
  if (extName && mimeType) {
    return cb(null, true)
  } else {
    return cb('Images only')
  }
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', protect, isAdmin, upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`)
})

export default router
