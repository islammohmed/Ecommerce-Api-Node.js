import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique:[true,'name is already used'],
        trim:true,
        required:true,
        minLength:[2,'name is too short'],
        maxLength:[20,'name is too long']
    },
    slug:{
        type: String,
        required: true,
        lowercase: true
    },
    imageCover: {
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{ timestamps: true })

schema.post('init',function(doc){
    doc.logo = process.env.BASE_URL + 'uploads/' + doc.logo
})

export const brandModel = mongoose.model('brand',schema)
