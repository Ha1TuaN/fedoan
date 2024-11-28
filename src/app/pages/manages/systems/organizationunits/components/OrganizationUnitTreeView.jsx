import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Modal, Tree, Dropdown} from 'antd';
import {toast} from 'react-toastify';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestDELETE, requestPOST} from 'src/utils/baseAPI';
import ModalItem from './ChiTietModal';

const OrganizationUnitTreeView = () => {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalOrganizationUnit);
  const random = useSelector((state) => state.modal.random);

  const [loading, setLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  const XoaNhom = async (idXoa) => {
    Modal.confirm({
      title: 'Xoá nhóm',
      content: 'Bạn có chắc chắn muốn xoá nhóm này?',
      okText: 'Đồng ý',
      cancelText: 'Huỷ',
      onOk: async () => {
        const res = await requestDELETE(`api/v1/organizationunits/${idXoa}`);
        if (res) {
          toast.success('Thao tác thành công!');
          dispatch(actionsModal.setRandom());
        } else {
          toast.error('Thất bại, vui lòng thử lại!');
        }
      },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(`api/v1/organizationunits/search`, {
          advancedSearch: {
            fields: ['fullName', 'code'],
            keyword: null,
          },
          pageNumber: 1,
          pageSize: 100000,
          orderBy: ['sortOrder'],
        });

        const nest = (items, id = null, link = 'parentId') =>
          items
            .filter((item) => item[link] === id)
            .map((item) => ({
              ...item,
              title: (
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: 'sua-nhom',
                        disabled: false,
                        label: (
                          <span
                            className='e-1 p-2 text-dark'
                            onClick={() => {
                              dispatch(
                                actionsModal.setModalOrganizationUnit({
                                  modalVisible: true,
                                  type: 'suanhom',
                                })
                              );
                            }}
                          >
                            <i className={`fa fa-edit me-2`}></i>
                            {'Sửa đơn vị'}
                          </span>
                        ),
                      },
                      {
                        key: 'them-nhom-con',
                        disabled: false,
                        label: (
                          <span
                            className='e-1 p-2 text-dark'
                            onClick={() => {
                              dispatch(
                                actionsModal.setModalOrganizationUnit({
                                  modalVisible: true,
                                  type: 'themnhomcon',
                                })
                              );
                            }}
                          >
                            <i className={`fa fa-plus me-2`}></i>
                            {'Thêm đơn vị'}
                          </span>
                        ),
                      },
                      {
                        key: 'xoa-don-vi',
                        disabled: false,
                        label: (
                          <span className='e-1 p-2 text-dark' onClick={() => XoaNhom(item.id)}>
                            <i className={`fa fa-trash me-2`}></i>
                            {'Xoá đơn vị'}
                          </span>
                        ),
                      },
                    ],
                  }}
                  trigger={['contextMenu']}
                >
                  <div className='site-dropdown-context-menu'>{item.name}</div>
                </Dropdown>
              ),
              key: item.id,
              children: nest(items, item.id),
            }));

        const tmp = nest(res?.data ?? []);

        // Extract all keys to expand all nodes
        const extractKeys = (data) => {
          let keys = [];
          data.forEach((item) => {
            keys.push(item.key);
            if (item.children) {
              keys = keys.concat(extractKeys(item.children));
            }
          });
          return keys;
        };

        const allKeys = extractKeys(tmp);
        setExpandedKeys(allKeys);
        const findKeyByCode = (data, code) => {
          for (const item of data) {
            if (item.code === code) {
              return item.id;
            }
            if (item.children) {
              const key = findKeyByCode(item.children, code);
              if (key) {
                return key;
              }
            }
          }
          return null;
        };

        const keyToSelect = findKeyByCode(res?.data ?? [], 'QT');
        if (keyToSelect) {
          setSelectedKeys([keyToSelect]);
          dispatch(actionsModal.setCurrentOrganizationUnit({id: keyToSelect}));
        }

        setTreeData(tmp);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
    dispatch(actionsModal.setCurrentOrganizationUnit({id: info?.node?.id, name: info?.node?.name}));
  };

  return (
    <>
      <div className='card-body card-dashboard px-3 py-3'>
        <div className='card-dashboard-body'>
          <Tree
            defaultExpandAll={true}
            onSelect={onSelect}
            treeData={treeData}
            showLine={{showLeafIcon: false}}
            expandedKeys={expandedKeys} // Set expanded keys
            selectedKeys={selectedKeys} // Set selected keys
          />
        </div>
      </div>
      {modalVisible?.modalVisible ? <ModalItem /> : null}
    </>
  );
};

export default OrganizationUnitTreeView;
