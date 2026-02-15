import mongoose from "mongoose";
const { Schema } = mongoose;

const StockCardSchema = new Schema({
    productId: {type: Schema.Types.ObjectId},
    documentId: {type: Schema.Types.ObjectId},
    documentName: {type: String},
    stockIn: {type: Number, default: 0},
    stockOut: {type: Number, default: 0},
    balance: {type: Number}
}, {
    timestamps: true
})

export default mongoose.model('Stockcard', StockCardSchema)