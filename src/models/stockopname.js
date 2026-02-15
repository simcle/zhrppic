import mongoose from "mongoose";
const { Schema } = mongoose

const StockOpnameSchema = new Schema({
    stockOpnameNumber: {type: String},
    remarks: {type: String, default: 'Stock opname'},
    items: [
        {
            productId: {type: mongoose.Types.ObjectId},
            stock: {type: Number},
            counted: {type: Number},
            difference: {type: Number}
        }
    ],
    status: {type: String, default: 'Draft'},
    validated: {type: Date},
    userId: {type: mongoose.Types.ObjectId}
}, {
    timestamps: true
})

export default mongoose.model('Stockopname', StockOpnameSchema)