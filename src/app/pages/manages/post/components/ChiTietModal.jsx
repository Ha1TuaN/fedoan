import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';

import {Form, Input, Select, Spin, Checkbox, InputNumber, DatePicker} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import _ from 'lodash';
import dayjs from 'dayjs';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestPOST, requestGET, requestPOST_NEW, requestPUT_NEW, API_URL} from 'src/utils/baseAPI';
import {removeAccents} from 'src/utils/slug';
import TextArea from 'antd/es/input/TextArea';
import ImageUpload from '../../../../components/FileUpload';
import {convertImage} from 'src/utils/utils';

const FormItem = Form.Item;

const ModalItem = (props) => {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loadding, setLoadding] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  const [file, setFile] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      const res = await requestPOST(
        `api/v1/customers/search`,
        _.assign({
          advancedSearch: {
            fields: ['name'],
            keyword: null,
          },
          pageNumber: 1,
          pageSize: 10000,
          motelId: id,
          orderBy: ['createdOn DESC'],
        })
      );
      if (res && res.data) {
        var _obj = res.data[0];
        _obj.startDate = _obj.startDate ? dayjs(_obj.startDate) : null;
        _obj.endDate = _obj.endDate ? dayjs(_obj.endDate) : null;
        const fileContract = _obj.file.split('##').map((item) => ({
          url: item,
          path: item,
          name: item.substring(item.lastIndexOf('/') + 1),
        }));
        setFile(fileContract);
        form.setFieldsValue(_obj);
      }
      setLoadding(false);
    };

    fetchData();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCancel = () => {
    form.resetFields();
    /*  props.setDataModal(null);
    props.setModalVisible(false); */
    dispatch(actionsModal.setModalVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    setBtnLoading(true);
    try {
      const formData = form.getFieldsValue(true);
      // if (id) {
      //   formData.id = id;
      // }
      formData.file = convertImage(file)
        .map((item) => item.url)
        .join('##');
      formData.motelId = id;

      const res = await requestPOST_NEW(`api/v1/customers`, formData);

      if (res.status === 200) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        handleCancel();
      } else {
        //toast.error('Thất bại, vui lòng thử lại!');
        const errors = Object.values(res?.data?.errors ?? {});
        let final_arr = [];
        errors.forEach((item) => {
          final_arr = _.concat(final_arr, item);
        });
        toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
      }
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
    setBtnLoading(false);
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
        <Modal.Title className='text-white'>Hợp đồng cho thuê</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} layout='vertical' /* initialValues={initData} */ autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Họ tên' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Số điện thoại' name='phoneNumber'>
                    <Input placeholder='' />
                  </FormItem>
                </div>

                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Ngày bắt đầu thuê nhà' name='startDate'>
                    <DatePicker style={{width: '100%'}} format='DD/MM/YYYY' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Ngày kết thúc thuê nhà' name='endDate'>
                    <DatePicker style={{width: '100%'}} format='DD/MM/YYYY' />
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Đính kèm hợp đồng thuê nhà (nếu có)' name='file'>
                    <ImageUpload
                      multiple={true}
                      URL={`${API_URL}/api/fileupload`}
                      // headers={{
                      //     Authorization: `Bearer ${token}`,
                      // }}
                      fileList={file}
                      onChange={(e) => {
                        setFile(e.fileList);
                        console.log(e?.file?.response ?? null);
                      }}
                    />
                  </FormItem>
                </div>
              </div>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 py-2 px-5  ms-2' onClick={onFinish} disabled={btnLoading}>
            <i className='fa fa-save'></i>
            {id ? 'Lưu' : 'Tạo mới'}
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
