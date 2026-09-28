import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb://admin:password123@mongo:27017/appdb?authSource=admin";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error de conexión:", err);
  }
};
