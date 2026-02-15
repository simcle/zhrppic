import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).trim().lowercase().required().messages({
    "string.empty": "Nama kategori tidak boleh kosong",
    "string.min": "Nama kategori minimal 3 karakter",
    "string.max": "Nama kategori maksimal 50 karakter",
    "any.required": "Nama kategori wajib diisi",
  }),
  description: Joi.string().max(255).trim().allow(null, "").messages({
    "string.max": "Deskripsi maksimal 255 karakter",
  }),
});

export default categorySchema;