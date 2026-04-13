import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const con = await mongoose.connect(`${process.env.MONGO_URI}`);
        console.log(`Connect to Database successfully ${con.connection.host}`.bgBlue);
    } catch (error) {
        console.log(`DB connection Error - ${error}`)
    }
}
export default connectDB;