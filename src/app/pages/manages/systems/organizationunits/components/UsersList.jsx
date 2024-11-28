/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import {Menu, Dropdown, Input, Form, Popconfirm} from 'antd';
import clsx from 'clsx';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietUserModal';
import {requestDELETE, requestPOST, requestPUT, requestPUT_NEWNeutral} from 'src/utils/baseAPI';
import PageHeader from './PageHeader';
import ChiTietModalAddUser from './ChiTietModalAddUser';
import ChiTietModalChuyenUser from './ChiTietModalChuyenUser';
import ChiTietPermissionModal from './ChiTietPermissionModal';
import ChiTietRoleModal from './ChiTietRoleModal';
import ChiTietModalAddNewUser from './ChiTietModalAddNewUser';

const FormItem = Form.Item;

const UsersList = (props) => {
  const API_URL_FILE = process.env.REACT_APP_API_URL_FILE + '/api/v1/documentattachments/';
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);

  const dataModal = useSelector((state) => state.modal.currentOrganizationUnit);
  const id = dataModal?.id ?? null;
  const [keySearch, setKeySearch] = useState('');
  const currentOrganizationUnit = useSelector((state) => state.modal.currentOrganizationUnit);
  const [form] = Form.useForm();
  const random = useSelector((state) => state.modal.random);

  const [dataTable, setDataTable] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [dataSearch, setDataSearch] = useState(null);

  const [modalKhoiPhucMKVisible, setModalKhoiPhucMKVisible] = useState(false);
  const [modalChuyenNhom, setModalChuyenNhom] = useState(false);
  const [modalCapQuyen, setModalCapQuyen] = useState(false);

  const [userHandle, setUserHandle] = useState(null);

  const [modalAddUser, setModalAddUser] = useState(false);
  const [modalChuyenUser, setModalChuyenUser] = useState(null);

  const [modalAddNewUser, setModalAddNewUser] = useState(false);

  const handleCancel = () => {
    setModalKhoiPhucMKVisible(false);
    setModalChuyenNhom(false);
    setModalCapQuyen(false);
    setUserHandle(null);
  };

  const handleCancelAddUser = () => {
    setModalAddUser(false);
    setModalChuyenUser(null);
  };

  const handleCancelAddNewUser = () => {
    setModalAddNewUser(false);
  };

  const handleKhoiPhucMatKhau = (item) => {
    setUserHandle(item);
    form.resetFields();
    setModalKhoiPhucMKVisible(true);
  };

  const handleChuyenNhom = (item) => {
    setUserHandle(item);
    form.resetFields();
    setModalChuyenNhom(true);
  };

  const handleCapQuyen = (item) => {
    setUserHandle(item);
    form.resetFields();
    setModalCapQuyen(true);
  };

  const addUserToNhom = async (dataUser) => {
    handleCancelAddUser();
    dataUser.organizationUnitId = dataModal.id;
    const res = await requestPUT_NEWNeutral(`users/${dataUser.id}`, dataUser);
    if (res) {
      toast.success('Cập nhật thành công!');
      //dispatch(actionsModal.setRandomUsers());
      dispatch(actionsModal.setRandom());
      handleCancel();
    } else {
      toast.error('Thất bại, vui lòng thử lại!');
    }
  };

  const chuyenUserToNhom = async (dataUser) => {
    handleCancelAddUser();

    const res = await requestPUT(`api/v1/organizationunitusers/${dataUser?.data?.id}`, {
      id: dataUser?.data?.id,
      organizationUnitId: dataUser?.organizationUnitId,
      userName: dataUser?.data?.userName,
    });
    if (res) {
      toast.success('Cập nhật thành công!');
      dispatch(actionsModal.setRandomUsers());
      handleCancel();
    } else {
      toast.error('Thất bại, vui lòng thử lại!');
    }
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    let formData = form.getFieldsValue(true);
    formData.userName = userHandle?.userName ?? '';

    //console.log(formData);
    if (!formData.password || !formData.confirmPassword || formData.password != formData.confirmPassword) {
      toast.error('Thất bại, vui lòng nhập lại mật khẩu!');
      return;
    }
    var res = await requestPOST(`api/users/admin-reset-password`, formData);

    toast.success('Cập nhật thành công!');
    handleCancel();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(`api/users/search`, {
          pageNumber: 1,
          pageSize: 1000,
          organizationUnitId: id,
        });
        setDataTable(res?.data ?? []);
        setLoading(false);
        setUpdate(false);
      } catch (error) {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }

    return () => {
      setDataTable([]);
    };
  }, [random, id]);

  useEffect(() => {
    //setDataTable([]);
    setOffset(1);
    setSize(10);
    return () => {};
  }, [dataSearch, dispatch, currentOrganizationUnit]);

  /* useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]); */

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataModal({...item, readOnly: true}));
        dispatch(actionsModal.setModalVisible(true));

        break;

      case 'xem':
        dispatch(actionsModal.setDataModal({...item, readOnly: true}));
        dispatch(actionsModal.setModalVisible(true));

        break;

      case 'cap-lai-mat-khau':
        handleKhoiPhucMatKhau(item);
        //setEditVanBan(true);
        break;
      case 'verifi-user':
        var res_kichhoat = await requestPOST(`api/users/${item.userId}/toggle-verified`, {
          activateUser: item.isVerified ? false : true,
          userId: item.userId,
        });

        toast.success('Thao tác thành công!');
        dispatch(actionsModal.setRandom());

        break;
      case 'toggle-status':
        var res_kichhoat = await requestPOST(`api/users/${item.userId}/toggle-status`, {
          activateUser: !item.isActive,
          userId: item.userId,
        });

        toast.success('Thao tác thành công!');
        dispatch(actionsModal.setRandom());

        break;
      case 'xoanguoidungkhoinhom':
        var res = await requestDELETE(`api/users/deleteorganizationunitusers/${item.id}`);
        if (res) {
          toast.success('Thao tác thành công!');
          dispatch(actionsModal.setRandom());
        } else {
          toast.error('Thất bại, vui lòng thử lại!');
        }
        break;

      case 'chuyen-nhom':
        handleChuyenNhom(item);
        //setEditVanBan(true);
        break;

      case 'cap-quyen':
        handleCapQuyen(item);
        //setEditVanBan(true);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'email',
      key: 'email',
      render: (text, record, index) => {
        return (
          <>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                <a href='#'>
                  {record?.imageUrl ? (
                    <div className='symbol-label'>
                      <img src={toAbsoluteUrl(`/${record?.imageUrl}`)} alt={record?.fullName} className='w-100' />
                    </div>
                  ) : (
                    <div
                      className={clsx(
                        'symbol-label fs-3',
                        `bg-light-${record?.isVerified ? 'danger' : ''}`,
                        `text-${record?.isVerified ? 'danger' : ''}`
                      )}
                    ></div>
                  )}
                </a>
              </div>
              <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1 fw-bolder'>
                  {record?.fullName}
                </a>
                <span>{record?.email}</span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      width: '25%',
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: 'Thao tác',
      className: 'text-center',
      dataIndex: '',
      key: '',
      width: '15%',
      render: (text, record) => {
        return (
          <div>
            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Xem chi tiết/Sửa'
              onClick={() => {
                handleButton(`chi-tiet`, record);
              }}
            >
              <i className='fa fa-edit'></i>
            </a>

            <Dropdown
              trigger={'click'}
              overlay={
                <Menu className='rounded'>
                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-lai-mat-khau`, record);
                      }}
                    >
                      <i className={`fa fa-key me-2`}></i>
                      {`Khôi phục mật khẩu`}
                    </a>
                  </Menu.Item>

                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`cap-quyen`, record);
                      }}
                    >
                      <i className={`fa fa-certificate me-2`}></i>
                      {`Cấp quyền`}
                    </a>
                  </Menu.Item>
                  <Menu.Item key={Math.random().toString(32)}>
                    <a
                      className='e-1 p-2 text-dark'
                      onClick={() => {
                        handleButton(`chuyennhomnguoidung`, record);
                      }}
                    >
                      <i className={`fa fa-share me-2`}></i>
                      {`Chuyển nhóm người dùng`}
                    </a>
                  </Menu.Item>
                  <Menu.Item key={Math.random().toString(32)}>
                    <Popconfirm
                      title='Bạn có chắc muốn xoá người dùng khỏi nhóm?'
                      onConfirm={() => handleButton('xoanguoidungkhoinhom', record)}
                      okText='Xoá'
                      cancelText='Huỷ'
                    >
                      <a className='e-1 p-2 text-dark'>
                        <i className='fa fa-trash me-2'></i>
                        {`Xoá người dùng khỏi nhóm`}
                      </a>
                    </Popconfirm>
                  </Menu.Item>
                </Menu>
              }
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1' title='Thao tác nhanh'>
                <i className='fa fa-ellipsis-h'></i>
              </a>
            </Dropdown>
          </div>
        );
      },
    },
  ];
  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{`Danh sách người dùng ${dataModal?.name ?? ''}`}</h3>
        <div className='d-flex align-items-center'>
          {dataModal ? (
            <>
              <button
                className='btn btn-success btn-sm m-btn m-btn--icon py-2 me-2'
                onClick={() => {
                  setModalAddUser(true);
                  /* dispatch(actionsModal.setDataModal(null));
                dispatch(actionsModal.setModalVisible(true)); */
                }}
              >
                <span>
                  <i class='fa-solid fa-user-plus'></i>
                  <span className=''>Thêm người dùng có sẵn</span>
                </span>
              </button>

              <button
                className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
                onClick={() => {
                  setModalAddNewUser(true);
                  /* dispatch(actionsModal.setDataModal(null));
                dispatch(actionsModal.setModalVisible(true)); */
                }}
              >
                <span>
                  <i className='fas fa-plus'></i>
                  <span className=''>Thêm mới người dùng</span>
                </span>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='card-body card-dashboard px-3 py-3'>
        <div className='card-dashboard-body table-responsive'>
          <Input
            placeholder='Tìm kiếm người dùng'
            className='mb-3'
            value={keySearch}
            onChange={(e) => {
              setKeySearch(e.target.value);
            }}
          />
          <TableList
            dataTable={dataTable}
            columns={columns}
            dataSource={dataTable.filter((i) => {
              const name = (i?.user?.fullName ?? '').toUpperCase();
              const userName = (i?.user?.userName ?? '').toUpperCase();
              return name.indexOf(keySearch.toUpperCase()) > -1 || userName.indexOf(keySearch.toUpperCase()) > -1;
            })}
            isPagination={true}
            size={size}
            count={count}
            setOffset={setOffset}
            offset={offset}
            setSize={setSize}
            loading={loading}
          />
        </div>
      </div>
      {modalVisible ? <ModalItem setUpdate={setUpdate} update={update} /> : <></>}
      {modalCapQuyen ? <ChiTietPermissionModal modalVisible={modalCapQuyen} userHandle={userHandle} handleCancel={handleCancel} /> : <></>}
      {modalChuyenNhom ? <ChiTietRoleModal modalVisible={modalChuyenNhom} userHandle={userHandle} handleCancel={handleCancel} /> : <></>}

      {modalAddUser ? <ChiTietModalAddUser modalVisible={modalAddUser} handleCancel={handleCancelAddUser} userHandle={addUserToNhom} /> : <></>}
      {modalAddNewUser ? <ChiTietModalAddNewUser modalVisible={modalAddNewUser} handleCancel={handleCancelAddNewUser} /> : <></>}
      {modalChuyenUser && modalChuyenUser.modalVisible == true ? (
        <ChiTietModalChuyenUser
          modalVisible={modalChuyenUser?.modalVisible}
          handleCancel={handleCancelAddUser}
          userHandle={chuyenUserToNhom}
          dataModal={modalChuyenUser}
        />
      ) : (
        <></>
      )}

      {modalKhoiPhucMKVisible ? (
        <Modal show={modalKhoiPhucMKVisible} onExited={handleCancel} keyboard={true} scrollable={true} onEscapeKeyDown={handleCancel}>
          <Modal.Header className='bg-primary px-4 py-3'>
            <Modal.Title className='text-white'>Khôi phục mật khẩu</Modal.Title>
            <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
          </Modal.Header>
          <Modal.Body>
            <Form form={form} layout='vertical' /* initialValues={initData} */ autoComplete='off'>
              <div className='row'>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem
                    label='Mật khẩu mới'
                    name='password'
                    rules={[
                      {required: true, message: 'Không được để trống!'},
                      {
                        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/,
                        message: 'Mật khẩu từ 6-18 ký tự, gồm có: chữ hoa hoặc chữ thường hoặc số và các ký tự đặc biệt! Vui lòng kiểm tra lại!',
                      },
                    ]}
                  >
                    <Input placeholder='' type={'password'} />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem
                    label='Nhập lại mật khẩu mới'
                    name='confirmPassword'
                    rules={[
                      {required: true, message: 'Không được để trống!'},
                      {
                        pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,18}$/,
                        message: 'Mật khẩu từ 6-18 ký tự, gồm có: chữ hoa hoặc chữ thường và các ký tự đặc biệt! Vui lòng kiểm tra lại!',
                      },
                    ]}
                  >
                    <Input placeholder='' type={'password'} />
                  </FormItem>
                </div>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
            <div className='d-flex justify-content-center  align-items-center'>
              <Button className='btn-sm btn-primary rounded-1 p-2  ms-2' onClick={onFinish}>
                <i className='fa fa-save'></i>
                {'Đổi mật khẩu'}
              </Button>
            </div>
            <div className='d-flex justify-content-center  align-items-center'>
              <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleCancel}>
                <i className='fa fa-times'></i>Huỷ
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : (
        <></>
      )}
    </>
  );
};

export default UsersList;
