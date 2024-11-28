/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react';
import * as Yup from 'yup';
import clsx from 'clsx';
import {Link} from 'react-router-dom';
import {useFormik} from 'formik';
import {getUserByToken, login, getCurrentPermissions} from '../core/_requests';
import {toAbsoluteUrl} from '../../../../_metronic/helpers';
import {useAuth} from '../core/Auth';

const loginSchema = Yup.object().shape({
  userName: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('UserName is required'),
  password: Yup.string().min(3, 'Minimum 3 symbols').max(50, 'Maximum 50 symbols').required('Password is required'),
});

const initialValues = {
  userName: '',
  password: '',
};

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false);
  const {saveAuth, setCurrentUser, setCurrentPermissions} = useAuth();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true);
      try {
        const {data: auth} = await login(values.userName, values.password);
        saveAuth(auth);
        const {data: user} = await getUserByToken(auth.token);
        setCurrentUser(user);
        const {data: permissions} = await getCurrentPermissions();
        setCurrentPermissions(permissions);
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus('The login details are incorrect');
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form className='form w-100' onSubmit={formik.handleSubmit} noValidate id='kt_login_signin_form'>
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-dark fw-bolder mb-3'>PHẦN MỀM QUẢN LÝ</h1>
        <h1 className='text-dark fw-bolder mb-3'>NHIỆM VỤ KHOA HỌC</h1>

        {/* <h1 className='text-dark fw-bolder mb-3'>Đăng nhập</h1> */}
      </div>
      {/* begin::Heading */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'></div>
        </div>
      )}

      {/* begin::Form group */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-dark'>Tài khoản</label>
        <input
          placeholder='Tài khoản'
          {...formik.getFieldProps('userName')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.userName && formik.errors.userName},
            {
              'is-valid': formik.touched.userName && !formik.errors.userName,
            }
          )}
          type='text'
          name='userName'
          autoComplete='off'
        />
        {formik.touched.userName && formik.errors.userName && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.userName}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-dark fs-6 mb-0'>Mật khẩu</label>
        <input
          type='password'
          placeholder='Mật khẩu'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
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
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Quên mật khẩu ?
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button type='submit' id='kt_sign_in_submit' className='btn btn-primary' disabled={formik.isSubmitting || !formik.isValid}>
          {!loading && <span className='indicator-label'>Đăng nhập</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Please wait...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}
    </form>
  );
}
