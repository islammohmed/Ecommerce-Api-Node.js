import { AppError } from "../utils/AppError.js"


export const validation = (schema)=>{
    return(req,res,next)=>{
        let filter = {}
        if(req.file){
            filter = { imageCover: req.file, ...req.body, ...req.params, ...req.query}
        }else if(req.files){ 
            filter = { ...req.files, ...req.body, ...req.params, ...req.query}
        }
        else{
            filter = { ...req.body, ...req.params, ...req.query}
        }
        const {error} =  schema.validate(filter,{ abortEarly: false })
        if(!error){
            next()
        }else{
            let errorList = []
            error.details.forEach(val => {
                errorList.push(val.message)
            });
            next(new AppError(errorList,401))
        }
    }
}