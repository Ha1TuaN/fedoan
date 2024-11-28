/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Popconfirm} from 'antd';
import {toast} from 'react-toastify';
import moment from 'moment';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestDELETE} from 'src/utils/baseAPI';
import {toAbsoluteUrl} from 'src/utils/AssetHelpers';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietModal';
import PageHeader from './PageHeader';

const UsersList = (props) => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const random = useSelector((state) => state.modal.random);

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(1);

  const [dataSearch, setDataSearch] = useState(null);

  useEffect(() => {
    dispatch(actionsModal.setRandom());
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
          `api/v1/loginlogs/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['userName'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['createdOn desc'],
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

    if (!loading) {
      fetchData();
    }

    return () => {};
  }, [offset, size, random]);

  const handleButton = async (type, item) => {
    switch (type) {
      case 'delete':
        var res = await requestDELETE(`api/v1/loginlogs/${item.id}`);
        if (res) {
          toast.success('Thao tác thành công!');
          dispatch(actionsModal.setRandom());
        } else {
          toast.error('Thất bại, vui lòng thử lại!');
        }
        break;
      case 'XoaVanBan':
        //handleXoaVanBan(item);
        break;

      default:
        break;
    }
  };

  const columns = [
    {
      title: 'Người dùng',
      dataIndex: 'userName',
      key: 'userName',
    },

    {
      title: 'Thời gian',
      dataIndex: 'createdOn',
      key: 'createdOn',
      render: (text, record) => {
        return <div>{moment(record.createdOn).format('DD/MM/YYYY HH:mm:ss')}</div>;
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      width: '10%',
      render: (text, record) => {
        return (
          <div>
            <Popconfirm
              title='Bạn có chắc chắn muốn xoá?'
              onConfirm={() => {
                handleButton(`delete`, record);
              }}
              okText='Xoá'
              cancelText='Huỷ'
            >
              <a className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm me-1 mb-1' data-toggle='m-tooltip' title='Xoá'>
                <i className='fa fa-trash'></i>
              </a>
            </Popconfirm>
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
            offset={offset}
            setOffset={setOffset}
            setSize={setSize}
            loading={loading}
          />
        </div>
      </div>
      {modalVisible ? <ModalItem /> : <></>}
    </>
  );
};

export default UsersList;
