import React, {useState, useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {Divider, Form, Select, Input, InputNumber, Button} from 'antd';
import * as actionsModal from 'src/setup/redux/modal/Actions';

import {toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';
import _ from 'lodash';
import {API_URL, requestPOST} from 'src/utils/baseAPI';
import ImageUpload from '../../../components/FileUpload';
import {convertImage} from 'src/utils/utils';
import {filterType} from 'src/utils/filter';
import HeaderTitle from '../../../components/HeaderTitle';
import {useAuth} from '../../../../app/modules/auth';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const FormItem = Form.Item;

const {TextArea} = Input;

const PostCreatePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {currentUser} = useAuth();

  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinceCode, setProvinceCode] = useState(null);
  const [editorData, setEditorData] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/areas/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['code'],
        level: 1,
      });
      if (res && res.data) setProvinces(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    if (provinceCode) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['code'],
          level: 2,
          parentCode: provinceCode,
        });
        if (res && res.data) setDistricts(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [provinceCode]);

  const onFinish = async () => {
    const values = await form.validateFields();
    try {
      const formData = form.getFieldsValue(true);
      // if (id) {
      //     formData.id = id;
      // }
      formData.imageHouses = convertImage(file);
      formData.userId = currentUser.id;
      formData.userFullName = currentUser.fullName;
      formData.userPhone = currentUser.phoneNumber;
      formData.userAvatar = currentUser.imageUrl;

      console.log(formData);
      const res = await requestPOST(`api/v1/motels`, formData);
      // id
      //     ? await requestPUT(`api/v1/motels/${id}`, formData)
      //     :
      if (res.data) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
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
  };
  return (
    <>
      <div className='card card-xl-stretch mb-xl-3'>
        <div className='px-3 py-3 d-flex align-items-center justify-content-between'>
          <div className='d-flex align-items-center'>
            <a
              className='btn btn-icon btn-active-light-primary btn-sm me-1 rounded-circle'
              data-toggle='m-tooltip'
              title='Trở về'
              onClick={() => {
                navigate(-1);
              }}
            >
              <i className='fa fa-arrow-left fs-2 text-gray-600'></i>
            </a>
            <h3 className='card-title fw-bolder text-header-td fs-2 mb-0'>Đăng tin mới</h3>
          </div>
          <div className='d-flex align-items-center'>
            <button
              className='btn btn-primary btn-sm m-btn m-btn--icon py-2 me-2'
              onClick={() => {
                onFinish();
              }}
            >
              <span>
                <i className='fas fa-save me-2'></i>
                <span className=''>Lưu</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <div className='py-4 flex flex-col gap-8 flex-auto'>
          <Form form={form} initialValues={{status: 'Chưa thuê'}} layout='vertical' autoComplete='off'>
            <div className='card card-body p-5 my-3'>
              <div className='p-5'>
                <HeaderTitle title={'ĐỊA CHỈ CHO THUÊ'} />
                <div className='row'>
                  <div className='col-xl-6 col-lg-6'>
                    <FormItem label='Tỉnh/Thành phố' name='provinces'>
                      <Select
                        showSearch
                        placeholder='Chọn Tỉnh/Thành phố'
                        allowClear
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        style={{width: '100%'}}
                        options={provinces.map((item) => ({
                          ...item,
                          value: item.id,
                          label: item.name,
                        }))}
                        onChange={(value, current) => {
                          if (value) {
                            console.log(current);
                            form.setFieldValue('provinceId', current.id);
                            form.setFieldValue('districts', null);
                            form.setFieldValue('communes', null);
                            setProvinceCode(current.code);
                          } else {
                            form.setFieldValue('districts', null);
                            form.setFieldValue('communes', null);
                          }
                        }}
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-6 col-lg-6'>
                    <FormItem label='Quận/Huyện' name='districts'>
                      <Select
                        showSearch
                        placeholder='Chọn Quận/Huyện'
                        allowClear
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        style={{width: '100%'}}
                        options={districts.map((item) => ({
                          ...item,
                          value: item.id,
                          label: item.name,
                        }))}
                        onChange={(value, current) => {
                          if (value) {
                            console.log(current);
                            form.setFieldValue('districtId', current.id);
                          } else {
                            form.setFieldValue('communes', null);
                          }
                        }}
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-12 col-lg-12'>
                    <FormItem label='Địa chỉ cụ thể' name='address'>
                      <Input
                        onBlur={(e) => {
                          const address = e.target.value;

                          const geocoder = new window.google.maps.Geocoder();
                          console.log(geocoder);
                          geocoder.geocode({address}, (results, status) => {
                            if (status === 'OK' && results[0]) {
                              const location = results[0].geometry.location;
                              form.setFieldsValue({
                                lat: location.lat(),
                                lng: location.lng(),
                              });
                            } else {
                              console.error('Geocoder failed due to:', status);
                            }
                          });
                        }}
                      />
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
            <div className='card card-body p-5 my-3'>
              <div className='p-5'>
                <HeaderTitle title={'THÔNG TIN MÔ TẢ'} />

                <div className='row'>
                  <div className='col-xl-6 col-lg-6'>
                    <FormItem label='Loại căn hộ' name='type'>
                      <Select
                        showSearch
                        placeholder='Chọn'
                        allowClear
                        filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                        style={{width: '100%'}}
                        options={filterType.map((item) => ({
                          value: item.value,
                          label: item.label,
                        }))}
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-12 col-lg-12'>
                    <FormItem label='Tiêu đề' name='title'>
                      <Input />
                    </FormItem>
                  </div>
                  <div className='col-xl-12 col-lg-12'>
                    <FormItem label='Mô tả' name='description'>
                      <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        onChange={(event, editor) => {
                          const data = editor.getData();
                          setEditorData(data);
                        }}
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-3 col-lg-3'>
                    <FormItem label='Giá cho thuê' name='price'>
                      <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                        addonAfter='VNĐ'
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-3 col-lg-3'>
                    <FormItem label='Diện tích' name='area'>
                      <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                        addonAfter={
                          <span>
                            m<sup>2</sup>
                          </span>
                        }
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-3 col-lg-3'>
                    <FormItem label='Số lượng phòng ngủ' name='numberBedroom'>
                      <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                        addonAfter='phòng'
                      />
                    </FormItem>
                  </div>
                  <div className='col-xl-3 col-lg-3'>
                    <FormItem label='Số lượng phòng tắm' name='bathRoom'>
                      <InputNumber
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                        addonAfter='phòng'
                      />
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
            <div className='card card-body p-5 my-3'>
              <div className='p-5'>
                <HeaderTitle title={'HÌNH ẢNH'} />
                <small>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
                <div className='row'>
                  <FormItem label='' name='imageHouses'>
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
            </div>
          </Form>
        </div>
        {/* <div className="w-[30%] flex-none">
                    maps
                    <Loading />
                </div> */}
      </div>
    </>
  );
};

export default PostCreatePage;
