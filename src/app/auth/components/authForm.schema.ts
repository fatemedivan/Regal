import z from "zod";

export const authSchema = z.object({
  phone: z
    .string()
    .nonempty("شماره موبایل الزامی است")
    .regex(/^09\d{9}$/, "شماره موبایل باید 11 رقم و با اعداد انگلیسی باشد"),
  password: z
    .string()
    .nonempty("رمز عبور الزامی است")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,32}$/,
      "رمز عبور باید ۸ تا ۳۲ کاراکتر شامل عدد، حروف بزرگ/کوچک و کاراکتر باشد"
    ),
});

export type FormAuthValues = z.infer<typeof authSchema>;
