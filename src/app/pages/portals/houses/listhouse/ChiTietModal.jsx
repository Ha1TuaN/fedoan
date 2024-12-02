import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Spin, DatePicker, Divider} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import _ from 'lodash';
import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import * as actionsModal from 'src/setup/redux/modal/Actions';

const FormItem = Form.Item;

const {TextArea} = Input;

const ModalItem = (props) => {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [isContracting, setIsContracting] = useState(null);

  const handleCancel = () => {
    form.resetFields();
    dispatch(actionsModal.setModalVisible(false));
  };
  console.log(dataModal);
  const images = dataModal.map((item) => ({
    original: item.image,
    thumbnail: item.image,
  }));
  return (
    <Modal show={modalVisible} fullscreen={true} size='xl' onExited={handleCancel} keyboard={true} scrollable={true} onEscapeKeyDown={handleCancel}>
      <Modal.Header className='bg-dark px-4'>
        <Modal.Title className='text-white'></Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <ImageGallery items={images} />
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
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
