import { FC } from 'react'
import { Link } from 'react-router-dom'
import { toAbsoluteUrl } from '../../../../_metronic/helpers'
import { Logout, AuthPage, useAuth } from 'src/app/modules/auth';

const ErrorScientific: FC = () => {
  const { currentUser, logout } = useAuth();

  return (
    <>
      {/* begin::Title */}
      <h1 className='fw-bolder fs-2qx text-gray-900 mb-4'>System Error</h1>
      {/* end::Title */}

      {/* begin::Text */}
      <div className='fw-semibold fs-6 text-gray-500 mb-7'>
        Tài khoản chưa liên kết với lý lịch khoa học
      </div>
      {/* end::Text */}

      {/* begin::Illustration */}
      <div className='mb-11'>
        <img
          src={toAbsoluteUrl('/media/auth/errorfail.jpg')}
          className='mw-100 mh-300px theme-light-show'
          alt=''
        />
        <img
          src={toAbsoluteUrl('/media/auth/errorfail.jpg')}
          className='mw-100 mh-300px theme-dark-show'
          alt=''
        />
      </div>
      {/* end::Illustration */}

      {/* begin::Link */}
      <div className='mb-0'>
        <Link to='/login' className='btn btn-sm btn-primary' onClick={logout}>
          Return Login
        </Link>
      </div>
      {/* end::Link */}
    </>
  )
}

export { ErrorScientific }
