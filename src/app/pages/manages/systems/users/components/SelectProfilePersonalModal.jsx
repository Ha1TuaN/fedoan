/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';

import {Input} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import TableList from 'src/app/components/TableList';
import _ from 'lodash';
import moment from 'moment';
import {requestPOST} from 'src/utils/baseAPI';

const SelectProfilePersonalModal = (props) => {
  const {userHandle, handleCancel, modalVisible} = props;

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const [dataSearch, setDataSearch] = useState('');

  const [selectedProfilePersonal, setSelectedProfilePersonal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/profilepersonals/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['name', 'code'],
                keyword: dataSearch?.keyword ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['createdOn DESC'],
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

    fetchData();

    return () => {};
  }, [offset, size, dataSearch]);

  const onFinish = async () => {
    userHandle(selectedProfilePersonal);
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedProfilePersonal(selectedRows.length > 0 ? selectedRows[0] : null);
    },
    getCheckboxProps: (record) => ({
      name: record.name,
    }),
  };

  const columns = [
    {
      title: 'Họ tên ',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Chức danh nghiên cứu',
      dataIndex: 'researchPositionName',
      key: 'researchPositionName',
    },
    {
      title: 'Học hàm',
      dataIndex: 'academicName',
      key: 'academicName',
    },
    {
      title: 'Năm đạt học hàm',
      className: 'text-center',
      dataIndex: 'yearOfAcademic',
      key: 'yearOfAcademic',
      render: (data) => (data ? moment(data).format('YYYY') : ''),
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
        <Modal.Title className='text-white'>Chọn lý lịch khoa học</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Input
          placeholder='Tìm kiếm lý lịch khoa học'
          className='mb-3'
          value={dataSearch}
          onChange={(e) => {
            setDataSearch(e.target.value);
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

export default SelectProfilePersonalModal;
