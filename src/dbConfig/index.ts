import mongoose from "mongoose";

const connectDB= function(){
    try{
        mongoose.connect('mongodb://localhost:27017/nextapp');
        let connection= mongoose.connection;

        connection.on('connected',()=>{
            console.log(`Database connected successfully at ${connection.host}...`)
        })
    }catch(err){
        console.log(err);
    }
}

export default connectDB;