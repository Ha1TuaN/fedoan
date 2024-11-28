import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import ImageUpload from 'src/app/components/ImageUpload';

import {Form, Input, Select, Spin, DatePicker, InputNumber} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import TableList from 'src/app/components/TableList';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';
import clsx from 'clsx';
import * as authHelper from 'src/app/modules/auth/core/AuthHelpers';
import * as actionsModal from 'src/setup/redux/modal/Actions';

import {API_URL, requestPOST_NEW} from 'src/utils/baseAPI';
import _ from 'lodash';

const FormItem = Form.Item;
const {Option} = Select;

const ChiTietModalAddNewUser = (props) => {
  const dispatch = useDispatch();
  const {handleCancel, modalVisible} = props;
  const [image, setImage] = useState([]);
  const [form] = Form.useForm();
  const {token} = authHelper.getAuth();
  const dataModal = useSelector((state) => state.modal.currentOrganizationUnit);
  const organizationUnitId = dataModal?.id ?? null;
  const genders = [
    {id: 'Nam', name: 'Nam'},
    {id: 'Nữ', name: 'Nữ'},
    {id: 'Khác', name: 'Khác'},
  ];
  const onFinish = async () => {
    const values = await form.validateFields();
    try {
      const formData = form.getFieldsValue(true);
      formData.type = 1;
      if (image.length > 0) {
        formData.imageUrl = image[0]?.response?.data[0]?.url ?? image[0].path;
      } else {
        formData.imageUrl = null;
      }

      const res = await requestPOST_NEW(`api/users`, {
        ...formData,
        password: 'Tandan@123',
        confirmPassword: 'Tandan@123',
        organizationUnitId: organizationUnitId,
      });
      if (res.status === 200) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        handleCancel();
      } else {
        //toast.error('Thất bại, vui lòng thử lại!');
        const errors = Object.values(res?.data?.errors ?? {});
        let final_arr = [];
        errors.forEach((item) => {
          final_arr = _.concat(final_arr, item);
        });
        console.log(final_arr);
        toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };

  return (
    <Modal
      show={modalVisible}
      fullscreen={'lg-down'}
      size='xl'
      onExited={handleCancel}
      keyboard={true}
      scrollable={true}
      onEscapeKeyDown={handleCancel}
    >
      <Modal.Header className='bg-primary px-4 py-3'>
        <Modal.Title className='text-white'>Thêm mới người dùng vào nhóm</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Form form={form} layout='vertical' autoComplete='off'>
          <div className='row '>
            <div className='col col-xl-4'>
              <FormItem label='Ảnh đại diện'>
                <ImageUpload
                  URL={`${API_URL}/api/v1/documentattachments/minios/user`}
                  fileList={image}
                  onChange={(e) => setImage(e.fileList)}
                  headers={{
                    Authorization: `Bearer ${token}`,
                  }}
                />
              </FormItem>
            </div>
            <div className='col col-xl-4'>
              <div className='row'>
                <div className='col-xl-12'>
                  <FormItem
                    label='Tên đăng nhập'
                    name='userName'
                    rules={[
                      {required: true, message: 'Không được để trống!'},
                      {
                        pattern: /^[a-z0-9_.]{5,50}$/,
                        message: 'Tên đăng nhập tối thiểu 5 ký tự và tối đa 50 ký tự! Vui lòng kiểm tra lại!',
                      },
                    ]}
                  >
                    <Input placeholder='Tên đăng nhập' />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Họ và tên' name='fullName' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input
                      placeholder='Họ và tên'
                      style={{height: '35px', width: '100%'}}
                      value={form.getFieldValue('fullName')} // Gán giá trị từ form
                      onChange={(e) => form.setFieldsValue({fullName: e.target.value})} // Cập nhật giá trị khi thay đổi
                    />
                  </FormItem>
                </div>
              </div>
            </div>
            <div className='col col-xl-4'>
              <div className='row'>
                <div className='col-xl-12'>
                  <FormItem label='Địa chỉ' name='addres'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-4 col-lg-6'>
              <FormItem
                label='Số điện thoại'
                name='phoneNumber'
                rules={[
                  // {required: true, message: 'Không được để trống!'},
                  {
                    pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                    message: 'Chưa đúng định dạng của số điện thoại! Vui lòng kiểm tra lại!',
                  },
                ]}
              >
                <Input placeholder='' />
              </FormItem>
            </div>
            <div className='col-xl-4 col-lg-6'>
              <FormItem
                label='Email'
                name='email'
                rules={[
                  // {required: true, message: 'Không được để trống!'},
                  {
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: 'Chưa đúng định dạng email! Vui lòng kiểm tra lại!',
                  },
                ]}
              >
                <Input placeholder='' />
              </FormItem>
            </div>

            <div className='col-xl-4 col-lg-6'>
              <FormItem label='Giới tính' name='gender'>
                <Select
                  showSearch
                  placeholder='Giới tính'
                  filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {genders.map((item) => {
                    return (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    );
                  })}
                </Select>
              </FormItem>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' onClick={onFinish}>
            <i className='fa fa-save'></i>
            Đồng ý
          </Button>
        </div>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleCancel}>
            <i className='fa fa-times'></i>Đóng
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ChiTietModalAddNewUser;
