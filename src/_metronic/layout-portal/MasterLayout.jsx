/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect, useState, useRef} from 'react';
import {Menu, Input, Space, Select, Dropdown, Button} from 'antd';
import {Link, useNavigate, Outlet, useLocation} from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import 'moment/locale/vi'; // without this line it didn't work
import Marquee from 'react-fast-marquee';
import {Navbar, Nav} from 'react-bootstrap';

import {ScrollTop} from './components/scroll-top';
import {Content} from './components/content';
import {ThemeModeProvider} from '../partials';
import {PageDataProvider} from './core';
import {reInitMenu} from '../helpers';
import {checkIsActive, toAbsoluteUrl} from '../helpers';
import {FooterWrapper} from './components/footer';
import {ToolbarWrapper} from './components/toolbar';
import _ from 'lodash';
import {requestPOST} from 'src/utils/baseAPI';
import {Logout, AuthPage, useAuth} from 'src/app/modules/auth';
import {LoginOutlined} from '@ant-design/icons';
import './style.scss';
import SearchItem from './components/search/SearchItem';

moment.locale('vi');

const {Search} = Input;

const MasterLayout = () => {
  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);
  const navigate = useNavigate();
  const {currentUser, logout} = useAuth();

  const {pathname} = location;

  return (
    <PageDataProvider>
      <ThemeModeProvider>
        <div className='page d-flex flex-row flex-column-fluid tdportal'>
          <div className='wrapper d-flex flex-column flex-row-fluid' id='kt_wrapper'>
            {pathname == '/' ? (
              <div id='kt_header' className='header flex-column d-flex ' data-kt-sticky='false' data-kt-sticky-name='header'>
                {/*begin::Container*/}

                <div className='container-xl header-container' style={{backgroundImage: `url(${toAbsoluteUrl('/media/images/bg-header.png')})`}}>
                  <div className='header-container pt-2 py-0 px-5'>
                    <div className='header-menu-container w-100' id='kt_header_nav'>
                      {/*begin::Menu wrapper*/}
                      <div className='d-flex flex-row align-items-center justify-content-between w-100 mw-100'>
                        <div className='logo-qh'>
                          <Link to={`/customer/dashboard`} className='d-flex align-items-center'>
                            <div className='logo-title'>
                              <img
                                alt='Logo'
                                // src={dataBanners.Logo ? (CONFIG.HOST_PATH + dataBanners.Logo) : toAbsoluteUrl('/media/images/bg-header.png')}
                                src={toAbsoluteUrl('/media/logos/logo.svg')}
                                className='img-fluid'
                              />
                            </div>
                          </Link>
                        </div>
                        <div className='p-lg-0 header_nav-right ' id='noibo--desktop1'>
                          {currentUser ? (
                            <Dropdown
                              menu={{
                                items: [
                                  {
                                    key: 'profile',
                                    label: (
                                      <a
                                        href='#'
                                        onClick={() => {
                                          navigate('manage/profile');
                                        }}
                                      >
                                        Thông tin người dùng
                                      </a>
                                    ),
                                  },
                                  {
                                    key: 'createdPost',
                                    label: (
                                      <a
                                        href='/manage/owner/createdpost'
                                        // onClick={() => {
                                        //   navigate('/manage/owner/createdpost');
                                        // }}
                                      >
                                        Tạo bài đăng
                                      </a>
                                    ),
                                  },
                                  {
                                    key: 'managePost',
                                    label: <a onClick={() => navigate('/manage/owner/post')}>Quản lý bài đăng</a>,
                                  },
                                  {
                                    key: 'log-out',
                                    label: <a onClick={logout}>Đăng xuất</a>,
                                  },
                                ],
                              }}
                            >
                              <Button ghost>
                                <span className='fa fa-user me-3'></span>
                                {currentUser.fullName}
                              </Button>
                            </Dropdown>
                          ) : (
                            <Button
                              onClick={() => {
                                debugger;
                                navigate('/auth');
                              }}
                              ghost
                              icon={<LoginOutlined />}
                            >
                              Đăng nhập
                            </Button>
                          )}
                        </div>

                        {/*end::Actions*/}
                      </div>
                      {/*end::Menu wrapper*/}
                    </div>
                  </div>

                  {/*end::Container*/}
                </div>
                <div className='d-flex flex-column align-items-center justify-content-center w-100 mw-100 flex-grow-1'>
                  <h1 className='text-white'>TÌM KIẾM NHÀ TRỌ ƯNG Ý</h1>
                  <SearchItem />
                </div>
              </div>
            ) : (
              <div id='kt_header_house' className=' flex-column d-flex justify-content-center' data-kt-sticky='false' data-kt-sticky-name='header'>
                {/*begin::Container*/}

                <div className='header-container pt-2 py-0 px-5'>
                  <div className='header-menu-container w-100' id='kt_header_nav'>
                    {/*begin::Menu wrapper*/}
                    <div className='d-flex flex-row align-items-center justify-content-between w-100 mw-100'>
                      <div className='logo-qh'>
                        <Link to={`/customer/dashboard`} className='d-flex align-items-center'>
                          <div className='logo-title'>
                            <img
                              alt='Logo'
                              // src={dataBanners.Logo ? (CONFIG.HOST_PATH + dataBanners.Logo) : toAbsoluteUrl('/media/images/bg-header.png')}
                              src={toAbsoluteUrl('/media/logos/logo.svg')}
                              className='img-fluid'
                            />
                          </div>
                        </Link>
                      </div>
                      <div className='p-lg-0 header_nav-right ' id='noibo--desktop1'>
                        {currentUser ? (
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: 'profile',
                                  label: (
                                    <a
                                      href='#'
                                      onClick={() => {
                                        navigate('manage/profile');
                                      }}
                                    >
                                      Thông tin người dùng
                                    </a>
                                  ),
                                },
                                {
                                  key: 'createdPost',
                                  label: (
                                    <a
                                      onClick={() => {
                                        navigate(`manage/owner/createdpost`);
                                      }}
                                    >
                                      Tạo bài đăng
                                    </a>
                                  ),
                                },
                                {
                                  key: 'managePost',
                                  label: (
                                    <a
                                      onClick={() => {
                                        navigate(`/manage/owner/post`);
                                      }}
                                    >
                                      Quản lý bài đăng
                                    </a>
                                  ),
                                },
                                {
                                  key: 'log-out',
                                  label: <a onClick={logout}>Đăng xuất</a>,
                                },
                              ],
                            }}
                          >
                            <Button ghost>
                              <span className='fa fa-user me-3'></span>
                              {currentUser.fullName}
                            </Button>
                          </Dropdown>
                        ) : (
                          <Button onClick={() => navigate('/auth')} ghost icon={<LoginOutlined />}>
                            Đăng nhập
                          </Button>
                        )}
                      </div>

                      {/*end::Actions*/}
                    </div>
                    {/*end::Menu wrapper*/}
                  </div>
                </div>

                {/*end::Container*/}
              </div>
            )}
            {/*end::Header*/}
            {pathname == '/' ? (
              <div className='container content-div'>
                <div className='row portal-content'>
                  <div className='col-md-12 col-12' id='content-main'>
                    {/* <Toolbar /> */}
                    {/* <ToolbarHeadSearch /> */}
                    <Content>
                      <Outlet />
                    </Content>
                  </div>
                </div>
              </div>
            ) : (
              <div className='wrapper-content py-6'>
                <Content>
                  <Outlet />
                </Content>
              </div>
            )}
            <FooterWrapper />
          </div>
        </div>
        <ScrollTop />
      </ThemeModeProvider>
    </PageDataProvider>
  );
};

const Timer = () => {
  const [time, setTime] = useState(moment().format('HH:mm:ss'));
  const [date] = useState(moment().format('dddd'));
  const [dates] = useState(moment().format('DD/MM/yyyy'));

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(moment().format('HH:mm:ss'));
    }, 1000);
    return () => clearInterval(secTimer);
  });
  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex align-items-center flex-shrink-0'>
        <div className='flex-grow-1 header-date-time'>
          <span className='fs-2x fw-bolder text-danger ms-auto header-times'>{time}</span>
          <span className='fs-6 text-gray-800 d-flex d-sm-block header-dates'>
            <span>{date.replace(/^\w/, (c) => c.toUpperCase())}</span> <span>{dates}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export {MasterLayout};
