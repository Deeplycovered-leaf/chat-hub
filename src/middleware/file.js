import multer from '@koa/multer'
import { PATH } from '../config'

const upload_avatar = multer({
  dest: PATH.UPLOAD,
})

export const verify_avatar = upload_avatar.single('avatar')
