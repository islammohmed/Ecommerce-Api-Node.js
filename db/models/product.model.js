import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique:[true,'title already used'],
        trim:true,
        required:true,
        minLength:[2,'title is too short'],
        maxLength:[200,'title is too long']
    },
    slug:{
        type: String,
        required: true,
        lowercase: true
    },
    imageCover:{
        type:String,
        required:true,
    },
    images:[String],
    description:{
        type:String,
        trim:true,
        required:true,
        minLength:[10,'description is too short'],
        maxLength:[500,'description is too long']
    },
    price:{
        type:Number,
        required:true,
        min: 0
    },
    priceAfterDiscount:{
        type:Number,
        required:true,
        min: 0
    },
    quantity:{
        type: Number,
        min: 0,
        required: true,
        default: 0
    },
    brand:{
        type:mongoose.Types.ObjectId,
        ref:'brand'
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref:'category'
    },
    subCategory: {
        type: mongoose.Types.ObjectId,
        ref:'subcategory'
    },
    rateCount :{
        type:Number,
        min: 0,
        default: 0
    }, 
    rateAvg:{
        type:Number,
        max: 5,
        min: 0
    },
    stock:{
        type:Number,
        min: 0,
        required:true
    },
    sold:Number,
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }

},{ timestamps: true ,toJSON: {virtuals:true}})
// schema.post('init',function(doc){
//     if(doc.imageCover || doc.images)
//     doc.imageCover = process.env.BASE_URL + 'uploads/' + doc.imageCover
//     doc.images = doc.images?.map((img)=> process.env.BASE_URL + 'uploads/' + img )
// })
schema.virtual('myReviews',{
    ref:'review',
    localField:'_id',
    foreignField:'product'
})
schema.pre('findOne',function(){
    this.populate('myReviews')
})
export const productModel = mongoose.model('product',schema)
