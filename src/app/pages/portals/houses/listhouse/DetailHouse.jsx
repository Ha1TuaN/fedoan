import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {requestGET} from 'src/utils/baseAPI';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import {Image, Spin} from 'antd';
import {formatNumber} from 'src/utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import * as action from 'src/setup/redux/modal/Actions';
import ModalItem from './ChiTietModal';
import {GoogleMap, Marker, LoadScript} from '@react-google-maps/api';

function DetailHouse() {
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await requestGET(`api/v1/motels/${id}`);
        if (res && res.data) {
          const _data = res.data;
          setData(_data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    if (id) {
      fetchData();
    }

    return () => {};
  }, [id]);

  if (loading) {
    return <Spin size='large' />;
  }

  return (
    <>
      <div className='container mt-4'>
        <div className='row'>
          <div className='col-md-6 col-xl-6 p-1'>
            <img src={data?.imageHouses[0].image} alt='Main House' style={{width: '100%', height: '600px', objectFit: 'cover'}} className='rounded' />
          </div>
          <div className='col-md-3 col-xl-3 p-1'>
            <div className='col'>
              {data?.imageHouses.slice(1, 3).map((item) => (
                <div key={item.id} className='row-6 mb-2'>
                  <img
                    src={item.image}
                    alt={`House Image ${item.id}`}
                    style={{width: '100%', height: '297px', objectFit: 'cover'}}
                    className='rounded'
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='col-md-3 col-xl-3 p-1'>
            <div className='col'>
              {data?.imageHouses.slice(3, 4).map((item) => (
                <div key={item.id} className='row-6 mb-2'>
                  <img width='100%' height='550px' src={item.image} style={{objectFit: 'cover'}} alt={`House Image ${item.id}`} className='rounded' />
                </div>
              ))}
              <a
                href='#'
                className='row-6 d-flex justify-content-center align-items-center rounded text-hover-dark'
                style={{height: '44px', backgroundColor: '#000000e3'}}
                onClick={() => {
                  dispatch(action.setModalVisible(true));
                  dispatch(action.setDataModal(data.imageHouses));
                }}
              >
                <span className='text-white fs-6'> Hiển thị tất cả ảnh</span>
              </a>
            </div>
          </div>
        </div>
        <div className='row mb-5'>
          <div className='col-xl-6'>
            <h2 className='fs-6'>
              <i className='fa-solid fa-location-dot'></i> {data?.address}
            </h2>
          </div>
        </div>
        <div className='row mt-5 pt-5'>
          <div className='col-xl-9'>
            <div className='row'>
              <div className='col-xl-8'>
                <h1 className='fs-1 color-text'>
                  <span className='text-muted fs-6'>Giá thuê: </span>
                  {formatNumber(data?.price)} đ
                </h1>
              </div>
              <div className='col-xl-4'>
                <div>
                  <h3>
                    <span className='fs-1'>
                      {data?.area}
                      <i className='fs-8 text-muted'>
                        m<sup>2</sup>
                      </i>
                    </span>
                    <span className='px-2 fs-1'>
                      {data?.bedroomCount} <i className='fs-8 text-muted'>phòng ngủ</i>
                    </span>
                    <span className='px-2 fs-1'>
                      {data?.bathroomCount} <i className='fs-8 text-muted'>phòng tắm</i>
                    </span>
                  </h3>
                </div>
              </div>
              <div className='col-xl-12 mt-5'>
                <h6 className='text-muted'>Thông tin mô tả</h6>
                <div dangerouslySetInnerHTML={{__html: data?.description}} />
              </div>
              <div className='col-xl-12 mt-5'>
                <h6 className='text-muted'>Vị trí bản đồ</h6>
                <LoadScript googleMapsApiKey='AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg'>
                  <GoogleMap
                    mapContainerStyle={{width: '100%', height: '500px'}}
                    center={{
                      lat: data?.lat || 0, // Default to 0 if lat is not available
                      lng: data?.lng || 0, // Default to 0 if lng is not available
                    }}
                    zoom={15}
                  >
                    {data?.lat && data?.lng && <Marker position={{lat: data.lat, lng: data.lng}} />}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          <div className='col-xl-3'>
            <div className='d-flex justify-content-between align-items-center flex-column border'>
              <div className='d-flex align-items-center flex-column ms-2 my-5'>
                <img src={`${data?.userAvatar}`} alt='User Avatar' style={{width: 80, height: 80}} className='border rounded-circle' />
                <span className='ms-2 fs-5 text-dark fw-bold'>{data?.userFullName}</span>
              </div>
              <a href='#' className='user-phone d-flex align-items-center w-100 rounded'>
                <span className='fs-8 text-white fw-bold w-100 d-flex align-items-center justify-content-center'>
                  <i className='fa-solid fa-square-phone text-white'></i> <span>{data?.userPhone}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {modalVisible ? <ModalItem /> : <></>}
    </>
  );
}

export default DetailHouse;
