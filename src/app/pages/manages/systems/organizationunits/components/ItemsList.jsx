/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {Popconfirm} from 'antd';
import {toast} from 'react-toastify';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestDELETE} from 'src/utils/baseAPI';

import TableList from 'src/app/components/TableList';
import ModalItem from './ChiTietModal';

const UsersList = (props) => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const random = useSelector((state) => state.modal.random);
  const modalOrganizationUnit = useSelector((state) => state.modal.modalOrganizationUnit);
  const dataModal = useSelector((state) => state.modal.currentOrganizationUnit);
  const id = dataModal?.id ?? null;

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
          `api/v1/organizationunits/search`,
          _.assign(
            {
              advancedSearch: {
                fields: ['fullName', 'code'],
                keyword: dataSearch?.keywordSearch ?? null,
              },
              pageNumber: offset,
              pageSize: size,
              orderBy: ['sortOrder'],
              parentId: id,
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

    if (id) {
      fetchData();
    }

    return () => {};
  }, [offset, size, random, id, dataSearch]);

  const handleButton = async (type, item) => {
    switch (type) {
      case 'chi-tiet':
        dispatch(actionsModal.setDataModal(item));
        dispatch(
          actionsModal.setModalOrganizationUnit({
            modalVisible: true,
            type: 'chitiet',
          })
        );
        break;

      case 'delete':
        var res = await requestDELETE(`api/v1/organizationunits/${item.id}`);
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
      title: 'Tên đơn vị',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Mã đơn vị',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên tắt',
      dataIndex: 'shortcutName',
      key: 'shortcutName',
    },
    {
      title: 'Cấp tổ chức',
      dataIndex: 'organizationUnitTypeName',
      key: 'organizationUnitTypeName',
    },
    {
      title: 'Chức năng nhiệm vụ',
      dataIndex: 'mainTask',
      key: 'mainTask',
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      width: '10%',
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
      <div className='card-dashboard-body table-responsive'>
        <div className='card-body px-3 py-3'>
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
      {modalOrganizationUnit?.modalVisible ? <ModalItem /> : <></>}
    </>
  );
};

export default UsersList;
