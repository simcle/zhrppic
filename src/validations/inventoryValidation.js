import Joi from "joi";
import mongoose from "mongoose";

// Fungsi untuk memeriksa apakah ObjectId valid
const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const inventorySchema = Joi.object({
  sku: Joi.string().trim().uppercase().required().messages({
    "string.empty": "SKU tidak boleh kosong",
    "any.required": "SKU wajib diisi",
  }),

  name: Joi.string().trim().lowercase().required().messages({
    "string.empty": "Nama barang tidak boleh kosong",
    "any.required": "Nama barang wajib diisi",
  }),

  categoryId: Joi.string().custom(objectIdValidator).required().messages({
    "any.invalid": "categoryId harus berupa ObjectId yang valid",
    "any.required": "categoryId wajib diisi",
  }),

  quantity: Joi.number().min(0).default(0).messages({
    "number.min": "Quantity tidak boleh negatif",
  }),

  unitId: Joi.string().custom(objectIdValidator).required().messages({
    "any.invalid": "unitId harus berupa ObjectId yang valid",
    "any.required": "unitId wajib diisi",
  }),

  purchasePrice: Joi.number().min(0).default(0).messages({
    "number.min": "Harga beli tidak boleh negatif",
  }),

  sellingPrice: Joi.number().min(0).default(0).messages({
    "number.min": "Harga jual tidak boleh negatif",
  }),

  reorderLevel: Joi.number().min(0).default(0).messages({
    "number.min": "Reorder level tidak boleh negatif",
  }),
});

export default inventorySchema;