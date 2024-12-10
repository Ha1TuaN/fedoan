/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import clsx from 'clsx';
import {getUserByToken, register} from '../core/_requests';
import {Link, useNavigate} from 'react-router-dom';
import {toAbsoluteUrl} from '../../../../_metronic/helpers';
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components';
import {useAuth} from '../core/Auth';

const initialValues = {
  fullName: '',
  phoneNumber: '',
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  fullName: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Họ tên là trường bắt buộc'),
  email: Yup.string().email('Wrong email format').min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Email là trường bắt buộc'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{10,15}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại là trường bắt buộc'),
  userName: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Tên đăng nhập là trường bắt buộc'),
  password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Mật khẩu là trường bắt buộc'),
  confirmPassword: Yup.string()
    .required('Nhập lại mật khẩu là trường bắt buộc')
    .oneOf([Yup.ref('password')], 'Mật khẩu và Nhập lại mật khẩu không khớp'),
  acceptTerms: Yup.bool().oneOf([true], 'Bạn phải chấp nhận các điều khoản và điều kiện'),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const {saveAuth, setCurrentUser} = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      try {
        const {data: auth} = await register(
          values.fullName,
          values.phoneNumber,
          values.email,
          values.userName,
          values.password,
          values.confirmPassword
        );
        saveAuth(auth);
        navigate(-1);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The registration details is incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework' noValidate id='kt_login_signup_form' onSubmit={formik.handleSubmit}>
      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group fullName */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-light fs-6'>Họ tên</label>
        <input
          placeholder='Họ tên'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('fullName')}
          className={clsx(
            'form-control bg-transparent text-white',
            {
              'is-invalid': formik.touched.fullName && formik.errors.fullName,
            },
            {
              'is-valid': formik.touched.fullName && !formik.errors.fullName,
            }
          )}
        />
        {formik.touched.fullName && formik.errors.fullName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.fullName}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group phoneNumber */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-light fs-6'>Số điện thoại</label>
        <input
          placeholder='Số điện thoại'
          type='phoneNumber'
          autoComplete='off'
          {...formik.getFieldProps('phoneNumber')}
          className={clsx(
            'form-control bg-transparent text-white',
            {'is-invalid': formik.touched.phoneNumber && formik.errors.phoneNumber},
            {
              'is-valid': formik.touched.phoneNumber && !formik.errors.phoneNumber,
            }
          )}
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.phoneNumber}</span>
            </div>
          </div>
        )}
      </div>
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-light fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent text-white',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-light fs-6'>Tên đăng nhập</label>
        <input
          placeholder='Tên đăng nhập'
          type='userName'
          autoComplete='off'
          {...formik.getFieldProps('userName')}
          className={clsx(
            'form-control bg-transparent text-white',
            {'is-invalid': formik.touched.userName && formik.errors.userName},
            {
              'is-valid': formik.touched.userName && !formik.errors.userName,
            }
          )}
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.userName}</span>
            </div>
          </div>
        )}
      </div>
      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-light fs-6'>Mật khẩu</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Password'
              autoComplete='off'
              {...formik.getFieldProps('password')}
              className={clsx(
                'form-control bg-transparent text-white',
                {
                  'is-invalid': formik.touched.password && formik.errors.password,
                },
                {
                  'is-valid': formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div className='d-flex align-items-center mb-3' data-kt-password-meter-control='highlight'>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>Sử dụng 8 ký tự trở lên với sự kết hợp của các chữ cái, số và ký hiệu.</div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-light fs-6'>Nhập lại mật khẩu</label>
        <input
          type='password'
          placeholder='Password confirmation'
          autoComplete='off'
          {...formik.getFieldProps('confirmPassword')}
          className={clsx(
            'form-control bg-transparent text-white',
            {
              'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
            },
            {
              'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
            }
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input className='form-check-input' type='checkbox' id='kt_login_toc_agree' {...formik.getFieldProps('acceptTerms')} />
          <span className='text-white'>
            Chấp nhận
            <a href='https://keenthemes.com/metronic/?page=faq' target='_blank' className='ms-1 link-primary'>
              Các điều khoản
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          //disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
        >
          {!loading && <span className='indicator-label'>Submit</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>

        <Link to='/auth/login'>
          <button type='button' id='kt_login_signup_form_cancel_button' className='btn btn-lg btn-light-primary w-100 mb-5'>
            Cancel
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );
}
