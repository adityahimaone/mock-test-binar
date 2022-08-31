import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import { useAppDispatch } from '@/store/hooks';
import { createNewProduct, getDataProducts } from '@/store/productSlice';

import InputImage from './Form/InputImage';
import InputText from './Form/InputText';
import ModalMain from './Modal';

interface IModalCreate {
  isOpen: boolean;
  onClose: () => void;
}

const schemaFormCreateProduct = Yup.object().shape({
  name: Yup.string().required('Name must be filled'),
  price: Yup.number().required('Price must be filled').positive('Price must be positiv number'),
  imageurl: Yup.string().required('Imageurl must be filled'),
});

function ModalCreate({ isOpen, onClose }: IModalCreate) {
  const dispatch = useAppDispatch();

  const formikFormCreateProduct = useFormik({
    initialValues: {
      name: '',
      price: '',
      imageurl: '',
    },
    validationSchema: schemaFormCreateProduct,
    onSubmit: async (values: any) => {
      const success = await dispatch(createNewProduct(values));
      if (success) {
        dispatch(getDataProducts());
        formikFormCreateProduct.resetForm();
        toast.success('Create new product success');
        onClose();
      }
    },
  });

  const onChangeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      const file: any = e.target.files?.[0];
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    })
      .then((result) => {
        formikFormCreateProduct.setFieldValue(name, result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ModalMain isOpen={isOpen} onClose={onClose}>
      <>
        <div className="mb-2">
          <h1 className="text-lg font-semibold">Create New Product</h1>
        </div>
        <form onSubmit={formikFormCreateProduct.handleSubmit}>
          <InputText
            name="name"
            type="text"
            label="Name"
            placeholder="Product Name"
            value={formikFormCreateProduct.values.name}
            onChange={formikFormCreateProduct.handleChange}
            touched={formikFormCreateProduct.touched.name}
            errors={formikFormCreateProduct.errors.name}
          />
          <InputText
            name="price"
            type="number"
            label="Price"
            placeholder="Price (Dollar USD)"
            value={formikFormCreateProduct.values.price}
            onChange={formikFormCreateProduct.handleChange}
            touched={formikFormCreateProduct.touched.price}
            errors={formikFormCreateProduct.errors.price}
            maxLength={100}
          />
          <InputImage
            name="imageurl"
            label="Image upload"
            value={formikFormCreateProduct.values.imageurl}
            onChange={onChangeImageUpload}
            touched={formikFormCreateProduct.touched.imageurl}
            errors={formikFormCreateProduct.errors.imageurl}
          />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Create
            </button>
          </div>
        </form>
      </>
    </ModalMain>
  );
}

export default ModalCreate;
