import multer from 'multer'
import {AppError} from './../../src/utils/AppError.js'

export const fileUpload = ()=>{
    const storage = multer.diskStorage({})
    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else {
            cb(new AppError('image only', 401), false)
        }

        }
    const upload = multer({ storage: storage ,fileFilter})
    return upload
}
export const uploadsingleFile = fieldName => fileUpload().single(fieldName)
export const uploadArrayFile = fieldName => fileUpload().array(fieldName,10)
export const uploadFields = fieldName => fileUpload().fields(fieldName)