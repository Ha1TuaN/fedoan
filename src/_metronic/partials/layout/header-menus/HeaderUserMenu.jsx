/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from '../../../../app/modules/auth';
import {toAbsoluteUrl} from '../../../helpers';

import {Modal, Button} from 'react-bootstrap';
import {Form, Input, Select, Spin, InputNumber} from 'antd';
import {toast} from 'react-toastify';

import {requestPUT, requestPUT_NEW} from 'src/utils/baseAPI';

const FormItem = Form.Item;

const HeaderUserMenu = () => {
  const {currentUser, logout} = useAuth();

  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setModalVisible(false);
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    const formData = form.getFieldsValue(true);

    if (!formData.newPassword || !formData.confirmNewPassword || formData.newPassword !== formData.confirmNewPassword) {
      toast.error('Thất bại, vui lòng nhập lại mật khẩu, mật khẩu mới và nhập lại mật khẩu không trùng nhau!');
      return;
    }

    /* var res = await requestPUT(`api/personal/change-password`, formData); */
    const res = await requestPUT_NEW(`api/personal/change-password`, formData);
    if (res.status === 200) {
      form.resetFields();
      toast.success('Cập nhật thành công!');
      handleCancel();
    } else {
      toast.error('Cập nhật thất bại, vui lòng nhập lại mật khẩu!');
    }
  };

  return (
    <>
      <div
        className='menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px'
        data-kt-menu='true'
      >
        <div className='menu-item px-3'>
          <div className='menu-content d-flex align-items-center px-3'>
            <div className='symbol symbol-50px me-5'>
              <img alt='Logo' src={toAbsoluteUrl('/media/avatars/300-1.jpg')} />
            </div>

            <div className='d-flex flex-column'>
              <div className='fw-bolder d-flex align-items-center fs-5'>{currentUser?.fullName}</div>
              <a href='#' className='fw-bold text-muted text-hover-primary fs-7'>
                {currentUser?.phoneNumber}
              </a>
            </div>
          </div>
        </div>

        <div className='separator my-2'></div>

        {/* <div className='menu-item px-5'>
          <Link to={'/crafted/pages/profile'} className='menu-link px-5'>
            Thông tin tài khoản
          </Link>
        </div> */}

        <div className='separator my-2'></div>

        <div className='menu-item px-5 my-1'>
          <a
            onClick={() => {
              setModalVisible(true);
            }}
            className='menu-link px-5'
          >
            Trở về trang khách hàng
          </a>
        </div>

        <div className='menu-item px-5'>
          <a onClick={logout} className='menu-link px-5'>
            Đăng xuất
          </a>
        </div>
      </div>
    </>
  );
};

export {HeaderUserMenu};
