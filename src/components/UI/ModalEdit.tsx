import { useFormik } from 'formik';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

import { useAppDispatch } from '@/store/hooks';
import { editProduct, getDataProducts } from '@/store/productSlice';
import { IModalEditExtends } from '@/types/types-main';

import InputImage from './Form/InputImage';
import InputText from './Form/InputText';
import ModalMain from './Modal';

const schemaFormEditProduct = Yup.object().shape({
  name: Yup.string().required('Name must be filled'),
  price: Yup.number().required('Price must be filled').positive('Price must be positiv number'),
  imageurl: Yup.string().required('Imageurl must be filled'),
});

function ModalEdit({ isOpen, onClose, data }: IModalEditExtends): JSX.Element {
  const dispatch = useAppDispatch();

  const formikFormEditProduct = useFormik({
    initialValues: {
      id: data?.id,
      name: data?.name,
      price: data?.price,
      imageurl: data?.imageurl,
    },
    validationSchema: schemaFormEditProduct,
    onSubmit: async (values: any) => {
      const success = await dispatch(editProduct({ ...values, id: data.id }));
      if (success) {
        dispatch(getDataProducts());
        formikFormEditProduct.resetForm();
        toast.success('Edit product success');
        onClose();
      }
    },
  });

  useEffect(() => {
    formikFormEditProduct.setFieldValue('id', data?.id);
    formikFormEditProduct.setFieldValue('name', data?.name);
    formikFormEditProduct.setFieldValue('price', data?.price);
    formikFormEditProduct.setFieldValue('imageurl', data?.imageurl);
  }, [data]);

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
        formikFormEditProduct.setFieldValue(name, result);
      })
      .catch((error) => console.log(error));
  };

  return (
    <ModalMain isOpen={isOpen} onClose={onClose}>
      <>
        <div className="mb-2">
          <h1 className="text-lg font-semibold">Edit Product</h1>
        </div>
        <form onSubmit={formikFormEditProduct.handleSubmit}>
          <InputText
            name="name"
            type="text"
            label="Name"
            placeholder="Product Name"
            value={formikFormEditProduct.values.name}
            onChange={formikFormEditProduct.handleChange}
            touched={formikFormEditProduct.touched.name}
            errors={formikFormEditProduct.errors.name}
          />
          <InputText
            name="price"
            type="number"
            label="Price"
            placeholder="Price (Dollar USD)"
            value={formikFormEditProduct.values.price}
            onChange={formikFormEditProduct.handleChange}
            touched={formikFormEditProduct.touched.price}
            errors={formikFormEditProduct.errors.price}
            maxLength={100}
          />
          <InputImage
            name="imageurl"
            label="Image upload"
            value={formikFormEditProduct.values.imageurl}
            onChange={onChangeImageUpload}
            touched={formikFormEditProduct.touched.imageurl}
            errors={formikFormEditProduct.errors.imageurl}
          />
          <div className="my-5 border-separate rounded-md border-b-2 border-gray-500" />
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose}>
              Back
            </button>
            <button type="submit" className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Update
            </button>
          </div>
        </form>
      </>
    </ModalMain>
  );
}

export default ModalEdit;
