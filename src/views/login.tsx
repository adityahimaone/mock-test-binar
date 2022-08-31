import { Spinner } from 'flowbite-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import InputText from '@/components/UI/Form/InputText';
import { getAuthLogin } from '@/store/authSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { IRequestLogin } from '@/types/types-store';
import { InitialValuesLogin } from '@/utils/InitialValues';

const schemaFormLogin = Yup.object().shape({
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
});

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loginSubmit, setLoginSubmit] = useState<boolean>(false);

  const { data: dataLogin, loading } = useAppSelector((state) => state.auth);

  const formikFormLogin = useFormik({
    initialValues: InitialValuesLogin,
    validationSchema: schemaFormLogin,
    onSubmit: async (values: IRequestLogin) => {
      setLoginSubmit(true);
      const succes = await dispatch(getAuthLogin(values));
      if (succes) {
        setLoginSubmit(false);
      }
    },
  });

  useEffect(() => {
    if (loginSubmit) {
      if (dataLogin.result !== null && dataLogin.result.access_token !== '') {
        toast.success('Login berhasil');
        navigate('/');
      }
      if (dataLogin?.result === null) {
        toast.error('Login Gagal: Email atau Password salah');
      }
    }
  }, [dataLogin.result, loginSubmit]);

  return (
    <div className="-mt-14 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-3">
          <h1 className="text-center text-xl font-semibold">Login</h1>
        </div>
        <form onSubmit={formikFormLogin.handleSubmit} className="rounded-md bg-white p-8 shadow-md">
          <InputText
            name="email"
            type="email"
            label="Email"
            placeholder="name@mail.com"
            value={formikFormLogin.values.email}
            onChange={formikFormLogin.handleChange}
            touched={formikFormLogin.touched.email}
            errors={formikFormLogin.errors.email}
          />
          <InputText
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            value={formikFormLogin.values.password}
            onChange={formikFormLogin.handleChange}
            touched={formikFormLogin.touched.password}
            errors={formikFormLogin.errors.password}
          />
          <button type="submit" className="w-full rounded-md bg-indigo-800 py-2 text-white">
            <span className="mr-2">Login</span>
            {loading ? <Spinner color="info" aria-label="Info spinner example" /> : null}
          </button>
          <div>
            <span className="text-xs text-gray-500">
              Dont have account yet?{' '}
              <Link to="/register" className="text-indigo-700">
                register here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
