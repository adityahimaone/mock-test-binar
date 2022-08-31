import { Spinner } from 'flowbite-react';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import InputText from '@/components/UI/Form/InputText';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { postRegister } from '@/store/registerSlice';
import { IRequestRegister } from '@/types/types-store';
import { InitialValuesRegister } from '@/utils/InitialValues';

const schemaFormRegister = Yup.object().shape({
  name: Yup.string().required('Name must be filled'),
  email: Yup.string().email('Email invalid').required('Email must be filled'),
  password: Yup.string().min(6, 'Password min 6 character').required('Password must be filled'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Password not same')
    .required('Password must be filled'),
});

function Register() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [registerSubmit, setRegisterSubmit] = useState<boolean>(false);

  const { data: dataRegister, loading } = useAppSelector((state) => state.register);

  const formikFormRegister = useFormik({
    initialValues: InitialValuesRegister,
    validationSchema: schemaFormRegister,
    onSubmit: async (values: IRequestRegister) => {
      const success = await dispatch(postRegister(values));
      if (success) {
        setRegisterSubmit(true);
        // toast.success('Register success');
        // navigate('/login');
      }
    },
  });

  useEffect(() => {
    if (registerSubmit) {
      if (dataRegister.errors === null) {
        toast.success('Register success');
        navigate('/login');
      }
      if (dataRegister.errors !== null) {
        toast.error(dataRegister.errors.email[0]);
      }
    }
  }, [dataRegister, registerSubmit]);

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
            <span className="mr-2">Regsiter</span>
            {loading ? <Spinner color="info" aria-label="Info spinner example" /> : null}
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
