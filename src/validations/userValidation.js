import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).trim().lowercase().required().messages({
    "string.empty": "Username tidak boleh kosong",
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 30 karakter",
    "any.required": "Username wajib diisi",
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    "string.empty": "Email tidak boleh kosong",
    "string.email": "Format email tidak valid",
    "any.required": "Email wajib diisi",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password tidak boleh kosong",
    "string.min": "Password minimal 6 karakter",
    "any.required": "Password wajib diisi",
  }),
  role: Joi.string().valid("admin", "produksi", "gudang").required().messages({
    "any.only": "Role harus salah satu dari: admin, produksi, gudang",
    "any.required": "Role wajib diisi",
  }),
});

export default userSchema;