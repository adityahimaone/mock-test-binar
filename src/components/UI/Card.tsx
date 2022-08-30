import React from 'react';

function Card(): JSX.Element {
  return (
    <div className="rounded-md bg-white p-3 shadow-md">
      <div>
        <img src="" alt="" className="h-40 w-auto rounded-sm bg-slate-600 object-cover" />
      </div>
      <div>
        <h6 className="text-lg font-semibold">Product Name</h6>
        <p className="text-base font-normal">Duid</p>
      </div>
    </div>
  );
}

export default Card;
