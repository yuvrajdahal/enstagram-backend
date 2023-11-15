import mongoose from "mongoose";

const connectDb = async () => {
  let url: string =
    (process.env.NODE_ENV === "production"
      ? process.env.MONGO_URL
      : process.env.MONGO_URL) || "";
  const conn = await mongoose.connect(url, {});
  console.log(`Mongoose Connected at: ${conn.connection.host}`);
};

export default connectDb;
