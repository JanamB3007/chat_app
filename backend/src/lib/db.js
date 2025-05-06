import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connection = await moongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connecion Error: ${error.message}`);
  }
};
