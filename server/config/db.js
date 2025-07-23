import mongoose from "mongoose";

const dbconnect = async()=>{
    try{
        await mongoose.connect(`${process.env.MONGO_URI}`)
            console.log("Connected to MongoDB");
    }catch(err){
        console.log("Error connecting to MongoDB:",err);
    }
}
export default dbconnect;