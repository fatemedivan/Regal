export type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (phone: string, password: string) => Promise<void>;
};

export type FormValues = {
  phone: string;
  password: string;
};
