import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique:[true,'name already used'],
        trim:true,
        required:true,
        minLength:[2,'name is too short'],
        maxLength:[200,'name is too long']
    },
    slug:{
        type: String,
        required: true,
        lowercase: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'category'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
},{ timestamps: true })
schema.pre('find',function(){
    this.populate('category')
})

export const subCategoryModel = mongoose.model('subCategory',schema)
