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
export interface IModalExtends {
  isOpen: boolean;
  onClose: () => void;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  imageurl: string;
}

export interface IModalEditExtends extends IModalExtends {
  data: IProduct;
}
