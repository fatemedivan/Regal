export type AuthFormProps = {
  type: "login" | "register";
  onSubmit: (phone: string, password: string) => Promise<void>;
};