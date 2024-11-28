/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, DatePicker, InputNumber} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import TableList from 'src/app/components/TableList';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';
import clsx from 'clsx';

import {requestPOST, requestGET, requestPUT, FILE_URL, requestPOSTNeutral} from 'src/utils/baseAPI';

const ModalItem = (props) => {
  const {userHandle, handleCancel, modalVisible} = props;

  const [dataTable, setDataTable] = useState([]);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [keywordSearch, setKeywordSearch] = useState('');

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOSTNeutral(`users/search`, {
          advancedSearch: {
            fields: ['fullName', 'userName', 'email'],
            keyword: keywordSearch && keywordSearch.length > 0 ? keywordSearch : null,
          },
          pageNumber: offset,
          pageSize: size,
          orderBy: ['fullName'],
          type: 1,
          isOrganizationUnit: true,
        });
        setDataTable(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
        setUpdate(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [offset, size, keywordSearch]);

  const onFinish = async () => {
    userHandle(selectedUser);
    //console.log(selectedUser);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedUser(selectedRows.length > 0 ? selectedRows[0] : null);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
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
                      <img src={toAbsoluteUrl(`/${record.imageUrl}`)} alt={record.name} className='w-100' />
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
                  {record.name}
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
    {
      width: '15%',
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

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
        <Modal.Title className='text-white'>Lựa chọn người dùng vào nhóm</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Input
          placeholder='Tìm kiếm người dùng'
          className='mb-3'
          value={keywordSearch}
          onChange={(e) => {
            setKeywordSearch(e.target.value);
          }}
        />
        <TableList
          dataTable={dataTable}
          columns={columns}
          isPagination={true}
          size={size}
          count={count}
          setOffset={setOffset}
          setSize={setSize}
          loading={loading}
          rowSelection={{
            type: 'radio',
            ...rowSelection,
          }}
        />
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

export default ModalItem;
