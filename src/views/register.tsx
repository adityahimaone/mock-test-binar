import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import InputText from '@/components/UI/Form/InputText';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { postRegister } from '@/store/registerSlice';
import { IRequestRegister } from '@/types/types-store';
import { InitialValuesRegister } from '@/utils/InitialValues';

const schemaFormRegister = Yup.object().shape({
  name: Yup.string().required('Name harus diisi'),
  email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
  password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password tidak sama')
    .required('Password confirmation harus diisi'),
});

function Register() {
  const dispatch = useAppDispatch();

  const formikFormRegister = useFormik({
    initialValues: InitialValuesRegister,
    validationSchema: schemaFormRegister,
    onSubmit: (values: IRequestRegister) => {
      console.log(values);
      dispatch(postRegister(values));
    },
  });

  return (
    <div className="-mt-14 flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-3">
          <h1 className="text-center text-xl font-semibold">Register</h1>
        </div>
        <form onSubmit={formikFormRegister.handleSubmit} className="rounded-md bg-white p-8 shadow-md">
          <InputText
            name="name"
            type="text"
            label="Nama"
            placeholder="Nama"
            value={formikFormRegister.values.name}
            onChange={formikFormRegister.handleChange}
            touched={formikFormRegister.touched.name}
            errors={formikFormRegister.errors.name}
          />
          <InputText
            name="email"
            type="email"
            label="Email"
            placeholder="name@mail.com"
            value={formikFormRegister.values.email}
            onChange={formikFormRegister.handleChange}
            touched={formikFormRegister.touched.email}
            errors={formikFormRegister.errors.email}
          />
          <InputText
            name="password"
            type="password"
            label="Password"
            placeholder="******"
            value={formikFormRegister.values.password}
            onChange={formikFormRegister.handleChange}
            touched={formikFormRegister.touched.password}
            errors={formikFormRegister.errors.password}
          />
          <InputText
            name="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            placeholder="******"
            value={formikFormRegister.values.passwordConfirmation}
            onChange={formikFormRegister.handleChange}
            touched={formikFormRegister.touched.passwordConfirmation}
            errors={formikFormRegister.errors.passwordConfirmation}
          />
          <button type="submit" className="w-full rounded-md bg-indigo-800 py-2 text-white">
            Register
          </button>
          <div>
            <span className="text-xs text-gray-500">
              Already have account?{' '}
              <Link to="/login" className="text-indigo-700">
                login here
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
