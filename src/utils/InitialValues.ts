/* eslint-disable import/prefer-default-export */
import { IFormRegister } from '@/types/types-main';
import { IRequestLogin } from '@/types/types-store';

export const InitialValuesLogin: IRequestLogin = {
  email: '',
  password: '',
};

export const InitialValuesRegister: IFormRegister = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
