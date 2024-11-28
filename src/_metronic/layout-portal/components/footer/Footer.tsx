/* eslint-disable react/jsx-no-target-blank */
import { useEffect } from 'react';
import { ILayout, useLayout } from '../../core';

const Footer = () => {
  const { config } = useLayout();
  useEffect(() => {
    updateDOM(config);
  }, [config]);
  return (
    <>
      <div className='container'>
        <div className='row info'>
          <div className='col-12 col-md-6 border-footer-col-sm-top'>
            <div className='pe-lg-4'>
              <h4 className='mb-3 text-uppercase col-title'>THÔNG TIN LIÊN HỆ</h4>
              <small className='ink400'></small>
              <p>Ủy ban nhân dân tỉnh Bắc Giang</p>
              <small className='ink400'>Địa chỉ</small>
              <p>Số 82 Hùng Vương - TP. Bắc Giang - Tỉnh Bắc Giang</p>
            </div>
          </div>
          <div className='col-12 col-md-6 border-footer-col-sm-top cskh-section'>
            <h4 className='mb-3 text-uppercase col-title'>CHĂM SÓC KHÁCH HÀNG</h4>
            <ul>
              <li className='mb-2'>
                <small className='ink400'>Thời gian hỗ trợ</small> <br />
                <p className='fw-bolder col-item-value'>7H - 17H Hàng ngày</p>
              </li>

            </ul>
          </div>


        </div>
      </div>
    </>
  );
};

const updateDOM = (config: ILayout) => {
  if (config.app?.footer?.fixed?.desktop) {
    document.body.classList.add('data-kt-app-footer-fixed', 'true');
  }

  if (config.app?.footer?.fixed?.mobile) {
    document.body.classList.add('data-kt-app-footer-fixed-mobile', 'true');
  }
};

export { Footer };
