import {Form, Input} from 'antd';
import ImageUpload from '../../../components/ImageUpload';
import {API_URL, requestPUT} from 'src/utils/baseAPI';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useDispatch} from 'react-redux';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import {useAuth} from '../../../modules/auth';
import _ from 'lodash';
import {convertImage, handleImage2} from 'src/utils/utils';

const FormItem = Form.Item;
function ProfilePage() {
  const [form] = Form.useForm();
  const [image, setImage] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {currentUser} = useAuth();

  useEffect(() => {
    form.setFieldsValue(currentUser);

    if (currentUser?.imageUrl) {
      const arr = _.without(_.split(currentUser.imageUrl, '##'), '');
      const res = arr.map((i) => ({
        url: currentUser.imageUrl, // Assuming a consistent URL pattern
        path: i,
        name: i.substring(i.lastIndexOf('/') + 1),
      }));
      setImage(res);
    } else {
      setImage([]); // Fallback for no images
    }
  }, [currentUser]);

  const onFinish = async () => {
    const values = await form.validateFields();
    try {
      const formData = form.getFieldsValue(true);
      formData.imageUrl = convertImage(image)[0].url;

      const res = await requestPUT(`api/users/${currentUser.id}`, formData);
      if (res) {
        toast.success('Cập nhật thành công!');
        dispatch(actionsModal.setRandom());
        navigate('/manage/dashboard');
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
            <h3 className='card-title fw-bolder text-header-td fs-2 mb-0'>Thay đổi thông tin người dùng</h3>
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
          <Form form={form} layout='vertical' autoComplete='off'>
            <div className='card card-body p-5 my-3'>
              <div className='p-5'>
                <div className='row '>
                  <div className='col col-xl-4'>
                    <FormItem label='Ảnh đại diện'>
                      <ImageUpload URL={`${API_URL}/api/fileupload`} fileList={image} onChange={(e) => setImage(e.fileList)} />
                    </FormItem>
                  </div>
                  <div className='col col-xl-4'>
                    <div className='row'>
                      <div className='col-xl-12'>
                        <FormItem
                          label='Tên đăng nhập'
                          name='userName'
                          rules={[
                            {required: true, message: 'Không được để trống!'},
                            {
                              pattern: /^[a-z0-9_.]{5,50}$/,
                              message: 'Tên đăng nhập tối thiểu 5 ký tự và tối đa 50 ký tự! Vui lòng kiểm tra lại!',
                            },
                          ]}
                        >
                          <Input placeholder='Tên đăng nhập' />
                        </FormItem>
                      </div>
                      <div className='col-xl-12 col-lg-12'>
                        <FormItem label='Họ và tên' name='fullName' rules={[{required: true, message: 'Không được để trống!'}]}>
                          <Input
                            placeholder='Họ và tên'
                            style={{height: '35px', width: '100%'}}
                            value={form.getFieldValue('fullName')} // Gán giá trị từ form
                            onChange={(e) => form.setFieldsValue({fullName: e.target.value})} // Cập nhật giá trị khi thay đổi
                          />
                          {/* <Space.Compact block>
                    <Tooltip title='Chọn lý lịch khoa học'>
                      <Btn
                        onClick={() => {
                          setModalSelectProfile(true);
                        }}
                        icon={<SelectOutlined />}
                        style={{height: '35px', display: 'flex', alignItems: 'center'}}
                      />
                    </Tooltip>
                  </Space.Compact> */}
                        </FormItem>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-xl-4 col-lg-6'>
                    <FormItem
                      label='Số điện thoại'
                      name='phoneNumber'
                      rules={[
                        // {required: true, message: 'Không được để trống!'},
                        {
                          pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
                          message: 'Chưa đúng định dạng của số điện thoại! Vui lòng kiểm tra lại!',
                        },
                      ]}
                    >
                      <Input placeholder='' />
                    </FormItem>
                  </div>
                  <div className='col-xl-4 col-lg-6'>
                    <FormItem
                      label='Email'
                      name='email'
                      rules={[
                        {required: true, message: 'Email không được để trống!'},
                        {
                          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g,
                          message: 'Địa chỉ email không hợp lệ! Vui lòng kiểm tra lại!',
                        },
                      ]}
                    >
                      <Input placeholder='Nhập email của bạn' />
                    </FormItem>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
