/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Card from '@/components/UI/Card';
import CardSkeleton from '@/components/UI/CardSkeleton';
import ModalDelete from '@/components/UI/ModalDelete';
import ModalEdit from '@/components/UI/ModalEdit';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getDataProducts, saveDataProduct } from '@/store/productSlice';
import { IProduct } from '@/types/types-main';

function Home(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const skeletonData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const { data: dataLogin } = useAppSelector((state) => state.auth);
  const { data: dataProducts, loading: loadingProducts, saveData } = useAppSelector((state) => state.product);

  const [modalEditIsOpen, setModalEditIsOpen] = useState(false);
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false);

  const onOpenModalEdit = (data: IProduct) => {
    dispatch(saveDataProduct(data));
    setModalEditIsOpen(true);
  };

  const onCloseModalEdit = () => {
    setModalEditIsOpen(false);
  };

  const onOpenModalDelete = (data: IProduct) => {
    dispatch(saveDataProduct(data));
    setModalDeleteIsOpen(true);
  };

  const onCloseModalDelete = () => {
    setModalDeleteIsOpen(false);
  };

  useEffect(() => {
    dispatch(getDataProducts());
  }, []);

  useEffect(() => {
    if (dataLogin.result === null) {
      toast.error('Silahkan login terlebih dahulu');
      navigate('/login');
    }
  }, [dataLogin.result]);

  const portalDiv = document.getElementById('root-modal');
  return (
    <>
      {ReactDOM.createPortal(
        <ModalEdit isOpen={modalEditIsOpen} onClose={onCloseModalEdit} data={saveData} />,
        portalDiv!,
      )}
      {ReactDOM.createPortal(
        <ModalDelete isOpen={modalDeleteIsOpen} onClose={onCloseModalDelete} data={saveData} />,
        portalDiv!,
      )}
      <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loadingProducts ? skeletonData.map((item: number) => <CardSkeleton key={item} />) : null}
        {dataProducts?.result?.map((product: IProduct) => (
          <Card
            data={product}
            onOpenModalEdit={onOpenModalEdit}
            onOpenModalDelete={onOpenModalDelete}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
