export interface ITextInput {
  type?: string;
  name: string;
  label: string;
  placeholder?: string;
  maxLength?: number;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
  errors: string | undefined;
}

export interface IFormRegister {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
