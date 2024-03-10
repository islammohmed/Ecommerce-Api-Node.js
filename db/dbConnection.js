import mongoose from "mongoose"
const dbConnection = ()=>{
        mongoose.connect(process.env.DB_online).then(
            console.log('connection Successfully')
        ).catch(err=>{console.log('faild connection => ' + err);})
}

export default dbConnection