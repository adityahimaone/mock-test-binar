import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';

import notfoundimg from '@/assets/images/nopic.png';
import { IProduct } from '@/types/types-main';
import { convertNumberToDollar } from '@/utils/helper/helper';

interface ICard {
  data: {
    id: number;
    name: string;
    price: number;
    imageurl: string;
  };
  onOpenModalEdit: (data: IProduct) => void;
  onOpenModalDelete: (data: IProduct) => void;
}

function Card({ data, onOpenModalEdit, onOpenModalDelete }: ICard): JSX.Element {
  return (
    <div className="rounded-md bg-white p-3 shadow-md">
      <div className="relative h-40 w-full overflow-hidden">
        <img
          src={data?.imageurl ? data.imageurl : notfoundimg}
          alt={data?.name}
          className="text-wrap h-full w-full rounded-sm border bg-slate-600 object-cover"
        />
        <div className="absolute top-2 right-2 flex space-x-1 rounded-md bg-white p-1 shadow-md">
          <PencilSquareIcon
            onClick={() => onOpenModalEdit(data)}
            className="h-5 w-5 text-blue-500 hover:text-blue-700"
          />
          <div className="h-100 w-[0.75px] bg-black" />
          <TrashIcon onClick={() => onOpenModalDelete(data)} className="h-5 w-5 text-red-500  hover:text-red-700" />
        </div>
      </div>
      <div>
        <h6 className="text-lg font-semibold">{data?.name}</h6>
        <p className="text-base font-normal">{convertNumberToDollar(data?.price)}</p>
      </div>
    </div>
  );
}

export default Card;
