/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect, useRef} from 'react';

import {TreeSelect, Spin} from 'antd';
import {Modal, Button} from 'react-bootstrap';

import {requestPOST} from 'src/utils/baseAPI';

const ModalItem = (props) => {
  const {userHandle, handleCancel, modalVisible, dataModal} = props;

  const [loading, setLoading] = useState(false);

  const [treeData, setTreeData] = useState([]);

  const [value, setValue] = useState(dataModal?.data?.coCauToChucId ?? null);

  const onChange = (newValue) => {
    console.log(newValue);
    setValue(newValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(`cocautochucs/search`, {
          advancedSearch: {
            fields: ['name', 'code'],
            keyword: null,
          },
          pageNumber: 1,
          pageSize: 100000,
          orderBy: ['name'],
        });

        const nest = (items, id = null, link = 'parentId') =>
          items
            .filter((item) => item[link] === id)
            .map((item) => ({
              ...item,
              title: item.name,
              key: item.code,
              value: item.id,
              children: nest(items, item.id),
            }));
        let tmp = nest(res?.data ?? []);
        setTreeData(tmp);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const onFinish = async () => {
    userHandle({coCauToChucId: value, data: dataModal?.data});
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
        <Modal.Title className='text-white'>Chuyển nhóm người dùng</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loading}>
          <TreeSelect
            style={{width: '100%'}}
            value={value}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            treeData={treeData}
            placeholder='Lựa chọn nhóm'
            treeDefaultExpandAll
            onChange={onChange}
          />
        </Spin>
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
