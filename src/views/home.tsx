import { useEffect } from 'react';

import Card from '@/components/UI/Card';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { getDataProducts } from '@/store/productSlice';

function Home(): JSX.Element {
  const dispatch = useAppDispatch();

  const { data: dataProducts, loading: loadingProducts } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getDataProducts());
  }, []);
  return (
    <div className="my-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {dataProducts.result.map((product: any) => (
        <Card data={product} key={product.id} />
      ))}
    </div>
  );
}

export default Home;
