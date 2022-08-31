import { XCircleIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

import { useAppDispatch } from '@/store/hooks';
import { deleteProduct, getDataProducts } from '@/store/productSlice';
import { IModalEditExtends } from '@/types/types-main';

import ModalMain from './Modal';

function ModalDelete({ isOpen, onClose, data }: IModalEditExtends) {
  const dispatch = useAppDispatch();

  return (
    <ModalMain isOpen={isOpen} onClose={onClose}>
      <div className="text-center">
        <XCircleIcon className="mx-auto mb-4 h-20 w-20 text-red-500" />
        <h3 className="text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to delete {data?.name}?
        </h3>
        <div className="my-5 border-separate rounded-md border-b-2 border-gray-500" />
        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded bg-slate-300 py-2 px-4 font-bold text-white hover:bg-slate-700"
          >
            No
          </button>
          <button
            type="button"
            onClick={async () => {
              const success = await dispatch(deleteProduct(data?.id));
              if (success) {
                dispatch(getDataProducts());
                toast.success('Product deleted successfully');
                onClose();
              }
            }}
            className="w-full rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700"
          >
            Yes, delete it
          </button>
        </div>
      </div>
    </ModalMain>
  );
}

export default ModalDelete;
