import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Form, Input, Select} from 'antd';
import Collapse from 'react-bootstrap/Collapse';
import {toast} from 'react-toastify';

import {requestPOST} from 'src/utils/baseAPI';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import ModalDongBo from './ModalDongBo';

const FormItem = Form.Item;
const {Option} = Select;

const lstTrangThai = [
  {id: null, name: 'Toàn bộ'},
  {id: true, name: 'Đang hoạt động'},
  {id: false, name: 'Bị khoá'},
];

const lstXacThuc = [
  {id: null, name: 'Toàn bộ'},
  {id: true, name: 'Đã xác thực'},
  {id: false, name: 'Chưa xác thực'},
];

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const {setDataSearch} = props;

  const TimKiem = () => {
    const formData = form.getFieldsValue(true);
    setDataSearch(formData);
  };

  const DongBoNguoiDung = async () => {
    const res = await requestPOST(`api/v1/organizationunitusers/fetchdata`, {});
    toast.success('Quá trình đồng bộ đang được thực hiện! Vui lòng truy cập lại chức năng sau 15 phút');
    setModalVisible(false);
  };

  return (
    <>
      <div className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'>
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        <div className='d-flex align-items-center'>
          <button className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2' type='button' aria-expanded={open} onClick={() => setOpen(!open)}>
            <span>
              <i className='fas fa-search'></i>
              <span className=''>Tìm kiếm</span>
            </span>
          </button>
          <button
            className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
            onClick={() => {
              dispatch(actionsModal.setDataModal({...null, readOnly: false}));
              dispatch(actionsModal.setModalVisible(true));
            }}
          >
            <span>
              <i className='fas fa-plus'></i>
              <span className=''>Thêm mới</span>
            </span>
          </button>
        </div>
      </div>
      <div>
        <Collapse in={open}>
          <div className='card card-body'>
            <Form form={form} hideRequiredMark autoComplete='off'>
              <div className='row'>
                <div className='col-xl-12 col-lg-12'>
                  <FormItem label='Từ khoá' name='keywordSearch'>
                    <Input placeholder='' />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Trạng thái' name='isActive'>
                    <Select allowClear placeholder='Trạng thái'>
                      {lstTrangThai.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Xác thực tài khoản' name='isVerified'>
                    <Select allowClear placeholder='Xác thực tài khoản'>
                      {lstXacThuc.map((item) => {
                        return (
                          <Option key={item.id} value={item.id}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </FormItem>
                </div>
              </div>
              <div className='row'>
                <div className='col-xl-12 col-lg-12 d-flex justify-content-center'>
                  <button className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2' onClick={TimKiem}>
                    <span>
                      <i className='fas fa-search'></i>
                      <span className=''>Tìm kiếm</span>
                    </span>
                  </button>
                  <button
                    className='btn btn-secondary btn-sm m-btn m-btn--icon py-2 me-2'
                    onClick={() => {
                      form.resetFields();
                      TimKiem();
                    }}
                  >
                    <span>
                      <i className='fas fa-sync'></i>
                      <span className=''>Tải lại</span>
                    </span>
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </Collapse>
      </div>
      <ModalDongBo modalVisible={modalVisible} onCancel={() => setModalVisible(false)} onFinish={DongBoNguoiDung} />
    </>
  );
};

export default PageHeader;
