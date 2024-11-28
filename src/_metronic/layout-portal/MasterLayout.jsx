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

const RecursiveParent = ({parent, data, maDonVi}) => {
  const location = useLocation();
  const {pathname} = location;
  const {currentUser, currentPermissions} = useAuth();

  return (
    <Menu
      mode='horizontal'
      className='py-0'
      items={[
        {
          key: 'motel',
          disabled: false,
          label: (
            <Link
              to={`/customer/motel`}
              className={clsx('', {
                active: checkIsActive(pathname, '/customer/motel'),
              })}
            >
              Nhà trọ
            </Link>
          ),
        },
        {
          key: 'house',
          disabled: false,
          label: (
            <Link
              to={`/customer/house`}
              className={clsx('', {
                active: checkIsActive(pathname, '/customer/house'),
              })}
            >
              Nhà nguyên căn
            </Link>
          ),
        },
        {
          key: 'apartment',
          disabled: false,
          label: (
            <Link
              to={`/customer/apartment`}
              className={clsx('', {
                active: checkIsActive(pathname, '/customer/apartment'),
              })}
            >
              Chung cư
            </Link>
          ),
        },
        {
          key: 'mimiapartment',
          disabled: false,
          label: (
            <Link
              to={`/customer/mimiapartment`}
              className={clsx('', {
                active: checkIsActive(pathname, '/customer/mimiapartment'),
              })}
            >
              Chung cư mini
            </Link>
          ),
        },
      ]}
    ></Menu>
  );
};

const MasterLayout = () => {
  const dataImage = [
    {
      image: 'https://sotaydangvien.hanoi.dcs.vn/TaiLieu/LichCongTac/2022-10/Congbao.jpg',
      link: 'https://www.hanoi.gov.vn/',
    },
    {
      image: 'https://sotaydangvien.hanoi.dcs.vn/TaiLieu/LichCongTac/2022-10/mail.jpg',
      link: 'https://sso.thudo.gov.vn/sso/login#!login',
    },
  ];

  const location = useLocation();
  useEffect(() => {
    reInitMenu();
  }, [location.key]);
  const navigate = useNavigate();
  const {currentUser, logout} = useAuth();

  const marqueeInnerWidth = useRef(null);

  const [dataNotify, setDataNotify] = useState([]);
  const {pathname} = location;
  const [selectedLienKetWeb, setSelectedLienKetWeb] = useState('');

  const [linkWebsite, setLinkWebsite] = useState([]);
  const [linkImgae, setLinkImage] = useState([]);

  const onSearch = (values) => {
    navigate(`/search?keyword=${values}`);
  };

  const onChagneLienKetWeb = (value) => {
    setSelectedLienKetWeb(value);
    if (value) {
      window.open(value, '_blank').focus();
      setSelectedLienKetWeb('');
    }
  };
  // <Navbar bg='transparent' variant='dark' expand='lg' className='headerNav p-0 mw-100'>

  //                     <Navbar.Collapse id='basic-navbar-nav' className='w-100 mw-100 show'>
  //                       <Nav className='w-100 mw-100'>
  //                         <RecursiveParent parent data={[]} maDonVi={123} />
  //                       </Nav>
  //                     </Navbar.Collapse>
  //                   </Navbar>  <Navbar bg='transparent' variant='dark' expand='lg' className='headerNav p-0 mw-100'>

  //                     <Navbar.Collapse id='basic-navbar-nav' className='w-100 mw-100 show'>
  //                       <Nav className='w-100 mw-100'>
  //                         <RecursiveParent parent data={[]} maDonVi={123} />
  //                       </Nav>
  //                     </Navbar.Collapse>
  //                   </Navbar>
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
                                    label: <a>Thông tin người dùng</a>,
                                  },
                                  {
                                    key: 'createdPost',
                                    label: (
                                      <a
                                        onClick={() => {
                                          console.log('....');
                                          navigate(`/owner/createdpost`);
                                        }}
                                      >
                                        Tạo bài đăng
                                      </a>
                                    ),
                                  },
                                  {
                                    key: 'managePost',
                                    label: <a>Quản lý bài đăng</a>,
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
                                  label: <a>Thông tin người dùng</a>,
                                },
                                {
                                  key: 'createdPost',
                                  label: (
                                    <a
                                      onClick={() => {
                                        console.log('....');
                                        navigate(`/manage/owner/createpost`);
                                      }}
                                    >
                                      Tạo bài đăng
                                    </a>
                                  ),
                                },
                                {
                                  key: 'managePost',
                                  label: <a>Quản lý bài đăng</a>,
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

            <div className='wrapper-content py-6'>
              {checkIsActive(pathname, '/portal/profile') ? (
                <>
                  <ToolbarWrapper />
                  <Content>
                    <Outlet />
                  </Content>
                </>
              ) : checkIsActive(pathname, '/customer/dashboard') ? (
                <>
                  <ToolbarWrapper />
                  <Content>
                    <Outlet />
                  </Content>
                </>
              ) : checkIsActive(pathname, `/portal/profile`) ? (
                <>
                  <Content>
                    <Outlet />
                  </Content>
                </>
              ) : (
                <Content>
                  <Outlet />
                </Content>
              )}

              {/* {currentUser?.profilePersonalId ? (
              
              ) : (
                <div className='d-flex justify-content-center align-items-center'>
                  <h1 className='text-danger'>Tài khoản chưa liên kết với lý lịch khoa học</h1>
                </div>
              )} */}
            </div>
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
