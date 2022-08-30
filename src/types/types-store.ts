export interface IInitialState {
  loading: boolean;
  data: any;
  error: string | null;
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
  result: {
    access_token: string;
  };
  errors: Record<string, unknown>;
}

export interface InitialStateLogin {
  loading: boolean;
  data: any;
  error: string | null;
}
