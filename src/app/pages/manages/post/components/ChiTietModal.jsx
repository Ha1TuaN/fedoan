import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {Form, Input, Spin, DatePicker, Divider} from 'antd';
import {Modal, Button} from 'react-bootstrap';
import {toast} from 'react-toastify';
import _ from 'lodash';

import * as actionsModal from 'src/setup/redux/modal/Actions';
import TDSelect from 'src/app/components/TDSelect';
import {requestPOST, requestGET, requestPOST_NEW, requestPUT_NEW} from 'src/utils/baseAPI';
import locale from 'antd/es/date-picker/locale/vi_VN';
import {validatePhoneNumber} from 'src/utils/utils';
import moment from 'moment';
import dayjs from 'dayjs';

const FormItem = Form.Item;

const {TextArea} = Input;

const ModalItem = (props) => {
  const dispatch = useDispatch();

  const dataModal = useSelector((state) => state.modal.dataModal);
  const modalVisible = useSelector((state) => state.modal.modalVisible);
  const id = dataModal?.id ?? null;

  const [form] = Form.useForm();

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [btnLoading, setBtnLoading] = useState(false);
  const [isContracting, setIsContracting] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await requestGET(`api/v1/reportgenerals/${id}`);

      if (res && res.data) {
        var _obj = res.data;
        _obj.reportDate = _obj.reportDate ? dayjs(_obj.reportDate) : null;
        form.setFieldsValue(_obj);
        setStatus(_obj.status);
      }
      setLoading(false);
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

  // const onFinish = async () => {
  //   const values = await form.validateFields();
  //   setBtnLoading(true);
  //   try {
  //     const formData = form.getFieldsValue(true);
  //     if (id) {
  //       formData.id = id;
  //     }
  //     const res = id ? await requestPUT_NEW(`api/v1/reportgenerals/${id}`, formData) : await requestPOST_NEW(`api/v1/reportgenerals`, formData);

  //     if (res.status === 200) {
  //       toast.success('Cập nhật thành công!');
  //       dispatch(actionsModal.setRandom());
  //       handleCancel();
  //     } else {
  //       //toast.error('Thất bại, vui lòng thử lại!');
  //       const errors = Object.values(res?.data?.errors ?? {});
  //       let final_arr = [];
  //       errors.forEach((item) => {
  //         final_arr = _.concat(final_arr, item);
  //       });
  //       toast.error('Thất bại, vui lòng thử lại! ' + final_arr.join(' '));
  //     }
  //   } catch (errorInfo) {
  //     console.log('Failed:', errorInfo);
  //   }
  //   setBtnLoading(false);
  // };
  const handleApprove = async (x) => {
    if (x === 'Approve') {
      const res = await requestPUT_NEW(`api/v1/reportgenerals/approve/${id}`, {
        id: id,
        status: 'Phê duyệt báo cáo',
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
    } else if (x === 'Not Approve') {
      const res = await requestPUT_NEW(`api/v1/reportgenerals/approve/${id}`, {
        id: id,
        status: 'Từ chối phê duyệt báo cáo',
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
    }
  };
  return (
    <Modal
      show={modalVisible}
      fullscreen={'xl-down'}
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
        <Spin spinning={loading}>
          {!loading && (
            <Form form={form} layout='vertical' autoComplete='off'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Tên kế hoạch' name='name' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Người thực hiện' name='executor' rules={[{required: true, message: 'Không được để trống!'}]}>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Kết quả ' name='result'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Đánh giá' name='evaluation'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Mô tả' name='description'>
                    <TextArea placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Ngày báo cáo' name='reportDate'>
                    <DatePicker placeholder='Chọn ngày' locale={locale} style={{width: '100%'}} format={'DD/MM/YYYY'} />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Ghi chú' name='note'>
                    <TextArea placeholder='' />
                  </FormItem>
                </div>
              </div>
            </Form>
          )}
        </Spin>
      </Modal.Body>
      <Modal.Footer className='bg-light px-4 py-2 align-items-center'>
        <div className='d-flex justify-content-center  align-items-center'>
          {status === 'Đang xử lý' && (
            <>
              <Button className='btn-sm btn-primary rounded-1 p-2 ms-2' onClick={() => handleApprove('Approve')}>
                <i className='fa fa-times me-2'></i>Phê duyệt
              </Button>
              <Button className='btn-sm btn-danger rounded-1 p-2 ms-2' onClick={() => handleApprove('Not Approve')}>
                <i className='fa fa-times me-2'></i>Từ chối phê duyệt
              </Button>
            </>
          )}
          <Button className='btn-sm btn-secondary rounded-1 p-2  ms-2' onClick={handleCancel}>
            <i className='fa fa-times me-2'></i>Đóng
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalItem;
