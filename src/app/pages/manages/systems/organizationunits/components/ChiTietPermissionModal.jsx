import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Spin, Checkbox, Radio} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPUTNeutral, requestGETNeutral, requestPOSTNeutral} from 'src/utils/baseAPI';
import _ from 'lodash';

const ModalItem = (props) => {
  const {userHandle, handleCancel, modalVisible} = props;
  const dispatch = useDispatch();

  const [formRole] = Form.useForm();
  const [formPermission] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [permissionGroups, setPermissionGroups] = useState([]);
  const [roleGroups, setRoleGroups] = useState([]);
  const [roleSelected, setRoleSelected] = useState();

  useEffect(() => {
    const fetchUserPermissions = async () => {
      setLoadding(true);
      const res = await requestGETNeutral(`users/${userHandle?.userName}/permissions`);

      if (res) {
        formPermission.setFieldsValue(res);
      }
      setLoadding(false);
    };

    fetchUserPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchUserRoles = async () => {
      setLoadding(true);
      const res = await requestGETNeutral(`users/roles/${userHandle?.userName}`);
      if (res) {
        formRole.setFieldsValue(res);
      }
      setLoadding(false);
    };

    fetchUserRoles();
  }, []);

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
    const fetchPermissionGroups = async () => {
      setLoadding(true);
      const res = await requestGET(`api/permissions/group`);
      setPermissionGroups(res);
      setLoadding(false);
    };

    fetchPermissionGroups();
  }, []);

  useEffect(() => {
    const fetchPermissionsByRole = async () => {
      setLoadding(true);

      try {
        const res = await requestGET(`api/roles/${roleSelected}/permissions`);
        if (res && res.permissions) {
          formPermission.setFieldsValue({permissions: res.permissions});
        } else {
          formPermission.resetFields();
        }
      } catch (error) {
        console.error('Error fetching permissions by role:', error);
      } finally {
        setLoadding(false);
      }
    };

    if (roleSelected) {
      fetchPermissionsByRole();
      setLoadding(false);
    }

    return () => {
      setLoadding(false);
    };
  }, [roleSelected, formPermission]);

  const onChangeRole = (event) => {
    const {value} = event.target;
    setRoleSelected(value);
  };

  const onChangePermission = (event) => {
    const {value, checked} = event.target;
    const newPermissionGroups = permissionGroups.map((group) => {
      const updatedPermissions = group.permissions.map((p) => (p.value === value ? {...p, active: checked} : p));
      return {...group, permissions: updatedPermissions};
    });

    setPermissionGroups(newPermissionGroups);
  };
  const onFinish = async () => {
    try {
      const values = await formPermission.validateFields();
      setBtnLoading(true);

      const formDataPermission = formPermission.getFieldsValue(true);
      const formDataRole = formRole.getFieldsValue(true);

      console.log('permission', formDataRole);

      const res1 = await requestPUTNeutral(`users/${userHandle?.userName}/permissions`, formDataPermission);
      const res2 = await requestPOSTNeutral(`users/createorupdateuserroles`, {
        ...formDataRole,
        userId: userHandle?.id,
      });

      if (res1.status === 200 && res2) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        handleCancel();
      } else {
        const errors = Object.values(res1?.data?.errors ?? {});
        let final_arr = [];
        errors.forEach((item) => {
          final_arr = _.concat(final_arr, item);
        });
        toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    } finally {
      setBtnLoading(false);
    }
  };
  const handleCancell = () => {
    formPermission.resetFields();
    handleCancel();
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
            <Tabs defaultActiveKey='role' id='uncontrolled-tab-example' className='mb-3'>
              <Tab eventKey='role' title='Vai trò'>
                <Form form={formRole} layout='vertical' autoComplete='off'>
                  <Form.Item name='roleId' label=''>
                    <Radio.Group>
                      <div className='row'>
                        {roleGroups.map((group) => (
                          <Radio value={group.id} onChange={onChangeRole}>
                            {group.name}
                          </Radio>
                        ))}
                      </div>
                    </Radio.Group>
                  </Form.Item>
                </Form>
              </Tab>
              <Tab eventKey='permission' title='Quyền'>
                <div className='row'>
                  {permissionGroups.map((group) => (
                    <Form form={formPermission} layout='vertical' autoComplete='off'>
                      <Form.Item name='permissions' label=''>
                        <Checkbox.Group>
                          <div className='row'>
                            <Checkbox key={group.id} id={group.id} value={group.value} checked={group.active} disabled onChange={onChangePermission}>
                              {group.description}
                            </Checkbox>
                          </div>
                        </Checkbox.Group>
                      </Form.Item>
                    </Form>
                  ))}
                </div>
              </Tab>
            </Tabs>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 p-2 ms-2' onClick={onFinish}>
            <i className='fa fa-save'></i>
            {'Lưu'}
          </Button>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <Button className='btn-sm btn-secondary rounded-1 p-2 ms-2' onClick={handleCancell}>
            <i className='fa fa-times'></i>Đóng
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItem;
