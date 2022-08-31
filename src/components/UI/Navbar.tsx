/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bars3BottomRightIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-hot-toast';
import { Link, useMatch, useNavigate } from 'react-router-dom';

import { onLogout } from '@/store/authSlice';
import { useAppSelector, useAppDispatch } from '@/store/hooks';

import ModalCreate from './ModalCreate';

function Navbar(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: dataLogin, loading } = useAppSelector((state) => state.auth);

  const [offcanvas, setOffcanvas] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const matchHome = useMatch('/');

  const onOpenModal = () => {
    setModalIsOpen(true);
  };

  const onCloseModal = () => {
    setModalIsOpen(false);
  };

  const portalDiv = document.getElementById('root-modal');

  return (
    <>
      {ReactDOM.createPortal(<ModalCreate isOpen={modalIsOpen} onClose={onCloseModal} />, portalDiv!)}
      <nav className="bg-indigo-700 px-2 py-2 sm:px-4">
        <div className="container mx-auto max-w-screen-lg">
          <div className="flex items-center justify-between">
            <div className="flex w-8/12 items-center justify-start md:w-4/12">
              <div className="mr-4 flex h-10 w-10 items-center justify-center rounded bg-slate-300/40 font-bold text-white shadow-2xl">
                PL
              </div>
              <span className="font-medium text-white">Product List</span>
              {matchHome ? (
                <button
                  type="button"
                  onClick={onOpenModal}
                  className="ml-3 rounded-md bg-white p-2 font-medium text-black"
                >
                  <span className="hidden md:block">Create New</span>
                  <span className="block md:hidden">
                    <PlusIcon className="h-4 w-4" />
                  </span>
                </button>
              ) : null}
            </div>
            <div className="flex w-4/12 justify-end md:hidden">
              <button type="button" onClick={() => setOffcanvas(!offcanvas)}>
                <Bars3BottomRightIcon className="h-6 w-6 text-white" />
              </button>
            </div>
            <div
              className={`fixed top-0 z-50 flex h-full w-full justify-start bg-gradient-to-b from-blue-500 to-blue-700 p-10 transition-all md:static md:h-auto md:w-8/12 md:justify-end md:bg-none md:p-0 ${
                offcanvas ? 'right-0' : '-right-full'
              }`}
            >
              <button
                type="button"
                onClick={() => setOffcanvas(!offcanvas)}
                className="absolute top-10 right-10 text-white md:hidden"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <ul className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-14 md:space-y-0">
                <li className="font-semibold text-white hover:text-yellow-600">
                  {dataLogin.result !== null && dataLogin.result.access_token !== '' ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const success = await dispatch(onLogout());
                        if (success) {
                          toast.success('Logout Success');
                          navigate('/login');
                        }
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link to="/login">Login</Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
