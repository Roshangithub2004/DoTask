import mongoose from "mongoose";

export const connectDB = async () =>{
    try{
        const  connect = await mongoose.connect(process.env.MONGO_URL)
        
    }
    catch(err){
        console.log("something went wrong", err)
        process.exit(1)
    }   
}
