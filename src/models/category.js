import mongoose from "mongoose";
const { Schema } = mongoose;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true }, // Opsional: deskripsi kategori
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);