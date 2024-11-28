import mongoose from "mongoose";

export const db = async() =>{
          try {
                const conn = await mongoose.connect(process.env.MONGOOSE_URI);
                console.log("MongoDB connected: ", conn.connection.host);
                   
          } catch (error) {
               console.log(`Error connect db: ${error.message}`);
                 process.exit(1);   
          }
}