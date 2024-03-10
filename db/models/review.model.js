import mongoose from "mongoose";

const schema = new mongoose.Schema({
    text:{
        type:String,
        minLength:[2,'review is too short'],
        maxLength:[200,'review is too long']
    },    
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
    },
    product:{
        type:mongoose.Types.ObjectId,
        ref:'product',
    },
    rate:{
        type: Number,
        required:true
    }
},{ timestamps: true })

schema.pre(/^find/,function(){
    this.populate('user','name')
})

export const reviewModel = mongoose.model('review',schema)
