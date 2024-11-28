import React, {useState, useEffect, useRef} from 'react';
import {shallowEqual, useSelector, useDispatch} from 'react-redux';
import {Form, Input, DatePicker} from 'antd';
import Collapse from 'react-bootstrap/Collapse';
import 'moment/locale/vi';
import locale from 'antd/es/date-picker/locale/vi_VN';

import * as actionsModal from 'src/setup/redux/modal/Actions';

const FormItem = Form.Item;

const PageHeader = (props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const {setDataSearch} = props;

  const TimKiem = () => {
    const formData = form.getFieldsValue(true);
    setDataSearch(formData);
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
              </div>
              <div className='row'>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Từ ngày' name='fromDate'>
                    <DatePicker locale={locale} format={'DD/MM/YYYY'} placeholder='Từ ngày' style={{width: '100%'}} />
                  </FormItem>
                </div>
                <div className='col-xl-6 col-lg-6'>
                  <FormItem label='Đến ngày' name='toDate'>
                    <DatePicker locale={locale} format={'DD/MM/YYYY'} placeholder='Đến ngày' style={{width: '100%'}} />
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
    </>
  );
};

export default PageHeader;
