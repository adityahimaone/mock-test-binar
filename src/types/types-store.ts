export interface IInitialState {
  loading: boolean;
  data: any;
  error: string | null;
}

export interface IInitalStateRegister {
  loading: boolean;
  data: {
    status: string;
    result: any;
    errors: any;
  };
  error: string | null;
}

export interface IInitialStateProduct extends IInitialState {
  saveData: any;
}

export interface IRequestLogin {
  email: string;
  password: string;
}

export interface IRequestRegister {
  name: string;
  email: string;
  password: string;
}

export interface IResponse {
  status: string;
  result: any;
  errors: Record<string, unknown>;
}

export interface IInitialStateAuth {
  loading: boolean;
  data: {
    status: string;
    result: {
      access_token: string;
    } | null;
    errors: Record<string, unknown>;
  };
  error: string | null;
}
