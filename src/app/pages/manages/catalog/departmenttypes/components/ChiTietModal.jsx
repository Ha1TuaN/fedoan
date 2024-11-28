import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Select, Spin, Checkbox, InputNumber} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import _ from 'lodash';

import TDSelect from 'src/app/components/TDSelect';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {requestGET, requestPOST_NEW, requestPUT_NEW, requestPOST} from 'src/utils/baseAPI';
import {translateToEnglish} from 'src/utils/slug';

const FormItem = Form.Item;
const {TextArea} = Input;

const ModalItem = (props) => {
  const dispatch = useDispatch();
  const {count} = props;
  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;
  const [form] = Form.useForm();
  const [loadding, setLoadding] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadding(true);
      try {
        const res = await requestGET(`api/v1/categories/${id}`);

        const _data = res?.data ?? null;

        if (_data) {
          form.setFieldsValue({..._data});
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
      setLoadding(false);
    };

    if (id) {
      fetchData();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCancel = () => {
    form.resetFields();
    dispatch(actionsModal.setModalVisible(false));
  };

  const onFinish = async () => {
    const values = await form.validateFields();
    setBtnLoading(true);
    try {
      const formData = form.getFieldsValue(true);
      if (id) {
        formData.id = id;
      }
      const res = id
        ? await requestPUT_NEW(`api/v1/categories/${id}`, formData)
        : await requestPOST_NEW(`api/v1/categories`, {
            ...formData,
            categoryGroupId: '0B29B2D6-2FE5-448B-9160-08DCBC2F7B53',
          });

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
        <Modal.Title className='text-white'>Chi tiết</Modal.Title>
        <button type='button' className='btn-close btn-close-white' aria-label='Close' onClick={handleCancel}></button>
      </Modal.Header>
      <Modal.Body>
        <Spin spinning={loadding}>
          {!loadding && (
            <Form form={form} initialValues={{isActive: true, sortOrder: count + 1}} layout='vertical' autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Tên' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input
                      placeholder=''
                      onInput={async (e) => {
                        form.setFieldValue('code', await translateToEnglish(e.target.value));
                      }}
                    />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Mã' name='code'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Mức độ ưu tiên' name='sortOrder'>
                    <InputNumber placeholder='' min={0} max={1000} style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label=' ' name='isActive' valuePropName='checked'>
                    <Checkbox>Sử dụng</Checkbox>
                  </FormItem>
                </div>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Ghi chú' name='description'>
                    <TextArea rows={4} placeholder='' />
                  </FormItem>
                </div>
              </div>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center align-items-center'>
          <Button className='btn-sm btn-primary rounded-1 py-2 px-5 ms-2' onClick={onFinish} disabled={btnLoading}>
            <i className='fa fa-save me-2'></i>
            {id ? 'Lưu' : 'Tạo mới'}
          </Button>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
          <Button className='btn-sm btn-secondary rounded-1 p-2 ms-2' onClick={handleCancel}>
            <i className='fa fa-times me-2'></i>Đóng
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItem;
