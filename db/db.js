import mongoose from "mongoose";

const connectToDatabase = async()=>{
    try {
        
        await mongoose.connect(process.env.MONGODB_URL)
    } catch (error) {
        console.log("ErrorFromconnect",error)
        
    }
}

export default connectToDatabase