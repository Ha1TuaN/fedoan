import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Checkbox, Radio} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOSTNeutral, requestGETNeutral, requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';

const ModalItem = (props) => {
  const {userHandle, handleCancel, modalVisible} = props;
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);

  const [roleGroups, setRoleGroups] = useState([]);
  useEffect(() => {
    const fetchRoleGroups = async () => {
      const res = await requestPOST(
        `api/roles/search`,
        _.assign({
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['createdOn DESC'],
        })
      );
      setRoleGroups(res?.data ?? []);
    };

    fetchRoleGroups();
  }, []);
  useEffect(() => {
    const fetchUserRoles = async () => {
      setLoadding(true);
      const res = await requestGETNeutral(`users/roles/${userHandle?.userName}`);
      if (res) {
        form.setFieldsValue(res);
      }
      setLoadding(false);
    };

    fetchUserRoles();
  }, []);

  const handleCancell = () => {
    form.resetFields();
    handleCancel();
  };

  const onFinish = async () => {
    const values = await form.validateFields();

    try {
      const formData = form.getFieldsValue(true);
      /* if (id) {
        formData.id = id;
      } */

      const res = await requestPOSTNeutral(`users/createorupdateuserroles`, {
        ...formData,
        userId: userHandle?.id,
      });
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
        <Modal.Title className='text-white'>Danh sách quyền</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' autoComplete='off'>
              <Form.Item name='roleId' label=''>
                <Radio.Group>
                  <div className='row'>
                    {roleGroups.map((group) => (
                      <Radio value={group.id}>{group.name}</Radio>
                    ))}
                  </div>
                </Radio.Group>
              </Form.Item>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' onClick={onFinish}>
            <i className='fa fa-save'></i>
            {'Lưu'}
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
