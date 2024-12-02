/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react';
import {Outlet, Link} from 'react-router-dom';
import {toAbsoluteUrl} from '../../../_metronic/helpers';

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root');
    if (root) {
      root.style.height = '100%';
    }
    return () => {
      if (root) {
        root.style.height = 'auto';
      }
    };
  }, []);

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}

      {/* end::Body */}

      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2 align-items-center justify-content-center'
        style={{backgroundImage: `url(${toAbsoluteUrl('/media/banner/banner.png')})`}}
      >
        {/* begin::Content */}
        <div className='w-lg-500px p-10' style={{backgroundColor: '#0202025c'}}>
          <Outlet />
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  );
};

export {AuthLayout};
