import mongoose from "mongoose";
const { Schema } = mongoose;

const InventorySchema = new Schema(
  {
    sku: { type: String, required: true, unique: true, uppercase: true, trim: true },
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    categoryId: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
    quantity: { type: Number, default: 0, min: 0 }, // Default 0 agar tidak null dan tidak bisa negatif
    unitId: { type: mongoose.Types.ObjectId, ref: 'Unit', required: true },
    purchasePrice: { type: Number, default: 0, min: 0 }, // Tidak boleh negatif
    sellingPrice: { type: Number, default: 0, min: 0 }, // Tidak boleh negatif
    reorderLevel: { type: Number, default: 0, min: 0 }, // Default 0 agar tidak null dan tidak bisa negatif
  },
  {
    timestamps: true, // Menggunakan timestamps (createdAt, updatedAt)
  }
);

export default mongoose.model("Inventory", InventorySchema);