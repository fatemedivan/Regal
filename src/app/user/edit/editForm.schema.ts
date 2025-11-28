import z from "zod";

export const editFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("نام الزامی است")
    .min(3, "حداقل ۳ کاراکتر")
    .max(12, "حداکثر ۱۲ کاراکتر"),

  lastName: z
    .string()
    .nonempty("نام خانوادگی الزامی است")
    .min(3, "حداقل ۳ کاراکتر")
    .max(20, "حداکثر ۲۰ کاراکتر"),

  email: z
    .string()
    .nonempty("ایمیل الزامی است")
    .regex(/^(?=.{1,64}$)[^\s@]+@[^\s@]+\.[^\s@]+$/,"ایمیل معتبر نیست"),
});

export type FormEditValues = z.infer<typeof editFormSchema>;
