import z from "zod";

export const addressFormSchema = z.object({
  city: z.string().min(2, "شهر حداقل ۲ کارکتر باید باشد"),
  province: z.string().nonempty("انتخاب استان الزامی است"),
  details: z.string().min(4, "جزییات ادرس حداقل ۴ کارکتر باید باشد"),
  postalCode: z
    .string()
    .regex(/^[0-9]{6,10}$/, " کد پستی باید شامل ۶ تا ۱۰ رقم باشد."),
  fullAddress: z.string().min(24, "ادرس کامل حداقل ۲۴ کارکتر باید باشد"),
});

export type AddressFormValues = z.infer<typeof addressFormSchema>;
