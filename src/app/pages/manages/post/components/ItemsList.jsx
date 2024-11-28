/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Popconfirm, Typography, Tag} from 'antd';
import {toast} from 'react-toastify';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestDELETE} from 'src/utils/baseAPI';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietModal';
import moment from 'moment';

const {Paragraph} = Typography;

const UsersList = (props) => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const {dataSearch} = props;
  const random = useSelector((state) => state.modal.random);

  const [dataTable, setDataTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/reportgenerals/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['name'],
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
    if (refreshing) {
      fetchData();
      setRefreshing(false);
    }
    return () => {};
  }, [refreshing]);
  useEffect(() => {
    if (!refreshing) {
      setRefreshing(true);
    }
    return () => {};
  }, [offset, size, dataSearch, random]);
  useEffect(() => {
    setOffset(1);
    return () => {};
  }, [dataSearch]);

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataModal(item));
        dispatch(actionsModal.setModalVisible(true));
        break;
      case 'delete':
        var res = await requestDELETE(`api/v1/reportgenerals/${item.id}`);
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
      title: 'Tên kế hoạch',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Người thực hiện',
      dataIndex: 'executor',
      key: 'executor',
    },
    {
      title: 'Ngày báo cáo',
      dataIndex: 'reportDate',
      key: 'reportDate',
      render: (data) => (data ? moment(data).format('DD/MM/YYYY') : ''),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      className: 'text-center',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      width: 150,
      className: 'text-center',
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
              <i className='fa fa-eye'></i>
            </a>
          </div>
        );
      },
    },
  ];
  return (
    <>
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
