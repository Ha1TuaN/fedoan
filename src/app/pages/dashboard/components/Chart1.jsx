import React, {useState, useEffect, useRef} from 'react';
import {KTSVG} from 'src/_metronic/helpers';

const ModalItem = (props) => {
  const data = props?.data ?? null;

  return (
    <div className={`card card-flush ${props.className}`}>
      <div className='card-header pt-5'>
        <div className='card-title d-flex flex-column'>
          <div className='d-flex align-items-center'>
            <span className='fs-4 fw-semibold text-gray-400 me-1 align-self-start'>$</span>

            <span className='fs-2hx fw-bold text-dark me-2 lh-1 ls-n2'>{data?.doanhThuTrongThang ?? 0}</span>

            <span className='badge badge-light-success fs-base'>
              <KTSVG path='/media/icons/duotune/arrows/arr066.svg' className='svg-icon-5 svg-icon-success ms-n1' />{' '}
              {data?.doanhThuTrongThangPhanTram ?? 0}%
            </span>
          </div>
          <span className='text-gray-400 pt-1 fw-semibold fs-6'>{data?.chiNhanh ?? 0}</span>
        </div>
      </div>

      <div className='card-body pt-2 pb-4 d-flex flex-wrap align-items-center'>
        <div className='d-flex flex-center me-5 pt-2'></div>

        <div className='d-flex flex-column content-justify-center flex-row-fluid'>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 bg-success me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Thiết bị đang hoạt động</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{data?.thietBiDangHoatDong ?? 0}</div>
          </div>
          <div className='d-flex fw-semibold align-items-center my-3'>
            <div className='bullet w-8px h-3px rounded-2 bg-primary me-3'></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Thiết bị bảo trì</div>
            <div className='fw-bolder text-gray-700 text-xxl-end'>{data?.thietBiDangBaoTri ?? 0}</div>
          </div>
          <div className='d-flex fw-semibold align-items-center'>
            <div className='bullet w-8px h-3px rounded-2 me-3' style={{backgroundColor: '#E4E6EF'}}></div>
            <div className='text-gray-500 flex-grow-1 me-4'>Doanh thu trong ngày</div>
            <div className=' fw-bolder text-gray-700 text-xxl-end'>{data?.doanhThuTrongNgay ?? 0}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalItem;
