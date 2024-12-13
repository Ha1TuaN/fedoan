import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Checkbox, InputNumber, DatePicker, Switch} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import _ from 'lodash';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPOST_NEW, requestPUT_NEW, API_URL, FILE_URL} from 'src/utils/baseAPI';
import ImageUpload from '../../../../components/ImageUpload';
const FormItem = Form.Item;

const ModalItem = (props) => {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();
  const [loadding, setLoadding] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [image, setImage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestGET(`api/users/${id}`);
      console.log(res);
      if (res) {
        var _obj = res;
        if (_obj?.imageUrl) {
          const arr = _.without(_.split(_obj.imageUrl, '##'), '');
          const image = arr.map((i) => ({
            url: _obj.imageUrl, // Assuming a consistent URL pattern
            path: i,
            name: i.substring(i.lastIndexOf('/') + 1),
          }));
          setImage(image);
        } else {
          setImage([]); // Fallback for no images
        }
        console.log(_obj);
        form.setFieldsValue(_obj);
      }
      setLoadding(false);
    };
    if (id) {
      fetchData();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    setBtnLoading(true);
    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
      }

      const res = id ? await requestPUT_NEW(`api/users/${id}`, formData) : await requestPOST_NEW(`api/users`, formData);

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
        toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    setBtnLoading(false);
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
        <Modal.Title className='text-white'>Chi tiết</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' autoComplete='off'>
              <div className='card card-body p-5 my-3'>
                <div className='p-5'>
                  <div className='row '>
                    <div className='col col-xl-4'>
                      <FormItem label='Ảnh đại diện'>
                        <ImageUpload URL={`${API_URL}/api/fileupload`} fileList={image} onChange={(e) => setImage(e.fileList)} />
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
                            {/* <Space.Compact block>
                    <Tooltip title='Chọn lý lịch khoa học'>
                      <Btn
                        onClick={() => {
                          setModalSelectProfile(true);
                        }}
                        icon={<SelectOutlined />}
                        style={{height: '35px', display: 'flex', alignItems: 'center'}}
                      />
                    </Tooltip>
                  </Space.Compact> */}
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
                          {required: true, message: 'Email không được để trống!'},
                          {
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                            message: 'Địa chỉ email không hợp lệ! Vui lòng kiểm tra lại!',
                          },
                        ]}
                      >
                        <Input placeholder='Nhập email của bạn' />
                      </FormItem>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 py-2 px-5  ms-2' onClick={onFinish} disabled={btnLoading}>
            <i className='fa fa-save'></i>
            {id ? 'Lưu' : 'Tạo mới'}
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

export default ModalItem;
