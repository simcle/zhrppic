import mongoose from "mongoose";
const { Schema } = mongoose

const StockOutScheme = new Schema({
    stockOutNumber: { type: String},
    remarks: {type: String, default: 'Barang Keluar'},
    items: [
        {
            productId: {type: mongoose.Types.ObjectId},
            qty: {type: Number}
        }
    ],
    status: {type: String, default: 'Draft'},
    validated: {type: Date},
    userId: {type: mongoose.Types.ObjectId}
}, {
    timeseries: true
})

export default mongoose.model('Stockout', StockOutScheme);
