import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Spin, Checkbox, Divider} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import _ from 'lodash';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestGET, requestPUT, requestPOST} from 'src/utils/baseAPI';

const FormItem = Form.Item;

const ModalItem = (props) => {
  const dispatch = useDispatch();

  // State for checked values
  const [checkedValues, setCheckedValues] = useState([]);
  const [permissions, setPermissions] = useState([]);

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // Hàm xử lý sự kiện khi thay đổi giá trị của checkbox
  const onCheckboxChange = (checkedList) => {
    setCheckedValues(checkedList);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      if (!id) {
        const res = await requestGET(`api/permissions/group`);
        setPermissions(res); // Cập nhật danh sách permissions từ API
        // Giả sử API trả về các permissions đã chọn, cập nhật checkedValues ở đây
        const selectedPermissions = res.filter((p) => p.active).map((p) => p.value);
        setCheckedValues(selectedPermissions); // Cập nhật các checkbox đã chọn
      } else {
        const resRoles = await requestGET(`api/roles/${id}/permissions/group`);
        if (resRoles) {
          form.setFieldsValue(resRoles);
          setPermissions(resRoles?.permissions ?? []);
          const selectedPermissions = resRoles?.permissions.filter((p) => p.active).map((p) => p.value);
          setCheckedValues(selectedPermissions);
        }
      }
      setLoadding(false);
    };

    fetchData();
  }, [id]);

  const handleCancel = () => {
    form.resetFields();
    dispatch(actionsModal.setModalVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    setBtnLoading(true);
    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
        formData.RoleId = id;
      }

      formData.permissions = checkedValues;
      const res = id ? await requestPUT(`api/roles/${id}/permissions`, formData) : await requestPOST(`api/roles`, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        handleCancel();
      } else {
        toast.error('Thất bại, vui lòng thử lại!');
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    setBtnLoading(false);
  };

  return (
    <Modal show={modalVisible} fullscreen={false} size='xl' onExited={handleCancel} keyboard={true} scrollable={true} onEscapeKeyDown={handleCancel}>
      <Modal.Header className='bg-primary px-4 py-3'>
        <Modal.Title className='text-white'>Chi tiết</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Tên' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Ghi chú' name='description'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
              </div>
              <div className='col-xl-12 col-lg-12'>
                <Divider orientation='left' orientationMargin='0'>
                  <h4 className='pb-4 text-danger'>Danh sách quyền</h4>
                </Divider>

                <div className='card card-xl-stretch'>
                  <Spin spinning={loadding}>
                    {!loadding && (
                      <div className='row'>
                        <Form.Item className='mb-0'>
                          <Checkbox.Group style={{width: '100%'}} value={checkedValues} onChange={onCheckboxChange}>
                            <table className='table align-middle table-row-dashed fs-6 gy-5'>
                              <tbody className='text-gray-600 fw-bold'>
                                {permissions.map((i) => (
                                  <tr key={i.value}>
                                    <td className='text-gray-800 p-3'>{i.description}</td>
                                    <td className='p-3'>
                                      <div className='d-flex'>
                                        <Checkbox value={i.value}></Checkbox>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Checkbox.Group>
                        </Form.Item>
                      </div>
                    )}
                  </Spin>
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
