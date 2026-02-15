import mongoose from "mongoose";
const { Schema } = mongoose
const UnitSchema = new Schema({
    name: { type: String, required: true, unique: true, lowercase: true, trim: true },
    description: { type: String, trim: true },
}, {
    timestamps: true
})

export default mongoose.model('Unit', UnitSchema)