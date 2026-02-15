import mongoose from "mongoose";
const { Schema } = mongoose
const ProductSchema = new Schema({
    sku: {type: String, required: true, unique: true},
    name: { type: String, required: true, lowercase: true},
    category: {type: String, enum: ["Sepatu", "Sandal", "Tas", "Dompet"], required: true},
    materials: [{
        material: {type: mongoose.Types.ObjectId, ref: 'Inventory'},
        quantity: {type: Number}
    }]
}, {
    timestamps: true
})

export default mongoose.model('Product', ProductSchema)