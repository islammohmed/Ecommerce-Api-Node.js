import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique:[true,'name already userd'],
        trim:true,
        required:true,
        minLength:[2,'name is too short'],
        maxLength:[30,'name is too long']
    },
    slug: {
        type: String,
        lowercase: true,
        required: true,
    },
    imageCover:{
        type:String,
        required:true,
        trim:true
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
    
},{ timestamps: true })

schema.post('init',function(doc){
    doc.image = process.env.BASE_URL + 'uploads/' + doc.image
})

export const categoryModel = mongoose.model('category',schema)
