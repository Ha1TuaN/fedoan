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
import ModalItem from './ChiTietModal';
import {requestDELETE, requestPOST} from 'src/utils/baseAPI';
import PageHeader from './PageHeader';

import ChiTietPermissionModal from './ChiTietPermissionModal';
import ChiTietRoleModal from './ChiTietRoleModal';
import SelectProfilePersonalModal from './SelectProfilePersonalModal';

const FormItem = Form.Item;

const UsersList = (props) => {
  const API_URL_FILE = process.env.REACT_APP_API_URL_FILE + '/api/v1/documentattachments/';
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
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
  const [modalSelectProfile, setModalSelectProfile] = useState(false);

  const handleCancel = () => {
    setModalKhoiPhucMKVisible(false);
    setModalChuyenNhom(false);
    setModalCapQuyen(false);
    setUserHandle(null);
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
    setDataTable([]);
    setOffset(1);
    setSize(10);
    return () => {};
  }, [dataSearch, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/users/search`,
          _.assign(
            {
              // advancedSearch: {
              //   fields: ['fullName', 'userName', 'email'],
              //   keyword: dataSearch?.keywordSearch ?? null,
              // },
              search: dataSearch?.keywordSearch ?? null,
              pageNumber: offset,
              pageSize: size,
              orderBy: ['fullName'],
              organizationUnitId: null,
            },
            dataSearch
          )
        );
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    //console.log('vaoday', offset, size, random, dataSearch);

    if (!loading) {
      fetchData();
    }

    return () => {};
  }, [offset, size, random, dataSearch]);

  /* useEffect(() => {
    setUpdate(true);
    return () => {};
  }, [offset, size, inputValue]); */

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataModal({...item, readOnly: false}));
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
        var res_kichhoat = await requestPOST(`api/users/${item.id}/toggle-verified`, {
          activateUser: item.isVerified ? false : true,
          userId: item.userId,
        });

        toast.success('Thao tác thành công!');
        dispatch(actionsModal.setRandom());

        break;
      case 'toggle-status':
        var res_kichhoat = await requestPOST(`api/users/${item.id}/toggle-status`, {
          activateUser: !item.isActive,
          userId: item.userId,
        });

        toast.success('Thao tác thành công!');
        dispatch(actionsModal.setRandom());

        break;
      case 'xoa-tai-khoan':
        var res = await requestDELETE(`api/users/${item.id}`);
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
      case 'chon-ly-lich-khoa-hoc':
        setModalSelectProfile(true);
        //setEditVanBan(true);
        break;

      default:
        break;
    }
  };
  const handleCancelSelectProfile = () => {
    setModalSelectProfile(false);
  };
  const selectProfileToUser = async (profileSelected) => {
    handleCancelSelectProfile();
    console.log(profileSelected);
    const formData = form.getFieldsValue(true);
    form.setFieldsValue({...formData, profilePersonalId: profileSelected.id, fullName: profileSelected.name});
  };

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record, index) => {
        return (
          <>
            <div className='d-flex align-items-center'>
              {/* begin:: Avatar */}
              <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
                <a href='#'>
                  {record.imageUrl ? (
                    <div className='symbol-label'>
                      <img src={API_URL_FILE + `${record.imageUrl}`} alt={record.fullName} className='w-100' />
                    </div>
                  ) : (
                    <div
                      className={clsx(
                        'symbol-label fs-3',
                        `bg-light-${record.isVerified ? 'danger' : ''}`,
                        `text-${record.isVerified ? 'danger' : ''}`
                      )}
                    ></div>
                  )}
                </a>
              </div>
              <div className='d-flex flex-column'>
                <a href='#' className='text-gray-800 text-hover-primary mb-1 fw-bolder'>
                  {record.fullName}
                </a>
                <span>{record.email}</span>
              </div>
            </div>
          </>
        );
      },
    },
    {
      width: '15%',
      title: 'Tên đăng nhập',
      dataIndex: 'userName',
      key: 'userName',
    },
    // {
    //   width: '15%',
    //   title: 'Đơn vị',
    //   dataIndex: 'organizationUnitName',
    //   key: 'organizationUnitName',
    // },
    // {
    //   width: '15%',
    //   title: 'Chức vụ',
    //   dataIndex: 'jobPositionName',
    //   key: 'jobPositionName',
    // },
    {
      width: '10%',
      title: 'Trạng thái',
      render: (text, record, index) => {
        return (
          <>
            <div className={clsx('badge fw-bolder', `badge-light-${record.isActive ? 'success' : 'danger'}`)}>
              {record.isActive ? 'Đang hoạt động' : 'Bị khoá'}
            </div>
          </>
        );
      },
      key: 'isActive',
    },
    // {
    //   width: '10%',
    //   title: 'Chi nhánh kinh doanh',
    //   render: (text, record, index) => {
    //     return <>{record.branchId}</>;
    //   },
    //   key: 'isVerified',
    // },
    {
      title: 'Thao tác',
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

            <a
              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1 mb-1'
              data-toggle='m-tooltip'
              title='Xem chi tiết'
              onClick={() => {
                handleButton(`xem`, record);
              }}
            >
              <i className='fa fa-eye'></i>
            </a>

            <Popconfirm
              title='Bạn có chắc chắn muốn xoá?'
              onConfirm={() => {
                handleButton(`xoa-tai-khoan`, record);
              }}
              okText='Xoá'
              cancelText='Huỷ'
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1' data-toggle='m-tooltip' title='Xoá'>
                <i className='fa fa-trash'></i>
              </a>
            </Popconfirm>
            <Dropdown
              trigger={'click'}
              menu={{
                items: [
                  {
                    key: 'cap-lai-mat-khau',
                    disabled: false,
                    label: (
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`cap-lai-mat-khau`, record);
                        }}
                      >
                        <i className={`fa fa-key me-2`}></i>
                        {`Khôi phục mật khẩu`}
                      </a>
                    ),
                  },
                  {
                    key: 'verifi-user',
                    disabled: false,
                    label: (
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`verifi-user`, record);
                        }}
                      >
                        <i className={`fa fa-${record.isVerified ? 'lock' : `lock-open`} me-2`}></i>
                        {record.isVerified ? `Huỷ xác thực tài khoản` : `Xác thực tài khoản`}
                      </a>
                    ),
                  },
                  {
                    key: 'toggle-status',
                    disabled: false,
                    label: (
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`toggle-status`, record);
                        }}
                      >
                        <i className={`fa fa-${record.isActive ? 'lock' : `lock-open`} me-2`}></i>
                        {record.isActive ? `Dừng kích hoạt tài khoản` : `Kích hoạt tài khoản`}
                      </a>
                    ),
                  },
                  {
                    key: 'cap-quyen',
                    disabled: false,
                    label: (
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`cap-quyen`, record);
                        }}
                      >
                        <i className={`fa fa-certificate me-2`}></i>
                        {`Cấp quyền`}
                      </a>
                    ),
                  },
                  {
                    key: 'chon-ly-lich-khoa-hoc',
                    disabled: false,
                    label: (
                      <a
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          handleButton(`chon-ly-lich-khoa-hoc`, record);
                        }}
                      >
                        <i class='fa-solid fa-pen'></i>
                        {`Chọn lý lịch khoa học`}
                      </a>
                    ),
                  },
                ],
              }}
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
      <PageHeader title={props?.title ?? ''} setDataSearch={setDataSearch} />

      <div className='card-body card-dashboard px-3 py-3'>
        <div className='card-dashboard-body table-responsive'>
          <TableList
            dataTable={dataTable}
            columns={columns}
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
      {modalSelectProfile ? (
        <SelectProfilePersonalModal modalVisible={modalSelectProfile} handleCancel={handleCancelSelectProfile} userHandle={selectProfileToUser} />
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
