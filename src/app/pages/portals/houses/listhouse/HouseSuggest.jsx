import {useState, useEffect} from 'react';
import {Card, List, Carousel, Avatar, Radio} from 'antd';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {formatNumber} from 'src/utils/utils';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const {Meta} = Card;

function HouseSuggest() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await requestPOST(
          `api/v1/motels/search`,
          _.assign({
            advancedSearch: {
              fields: ['address'],
              keyword: null,
            },
            pageNumber: 1,
            pageSize: 5,

            orderBy: [`createdOn DESC`],
          })
        );
        setData(res.data ?? []);
        setLoading(false);
        console.log(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='card card-custom'>
        <div className='card-header p-0 m-0'>
          <h3 className='card-title'>Tin đăng nổi bật</h3>
        </div>
        <div className='card-body p-0 m-0'>
          <div className='row'>
            {data.map((item) => (
              <div className='d-flex justify-content-between align-items-center border-bottom' onClick={() => navigate(`/house/detail/${item.id}`)}>
                <div className='d-flex align-items-center flex-column ms-2 my-5'>
                  <img
                    src={`${item?.imageHouses[0].image}`}
                    alt={'Ảnh nhà'}
                    style={{width: '100px', height: '70px', objectFit: 'cover'}}
                    className='rounded'
                  />
                  <span className='ms-2 fs-5 text-dark fw-bold'>{data?.userFullName}</span>
                </div>
                <div className='px-3 d-flex flex-column align-items-start justify-content-start cursor-pointer'>
                  <div className='d-flex align-items-center justify-content-between'>
                    <span className='color-text fs-7 fw-bold'>
                      {formatNumber(item.price)} <i className='fs-10'>VNĐ</i>
                    </span>
                  </div>
                  <div className='d-flex align-items-center justify-content-between'>
                    <span className='title-container fs-8 text-dark flex-grow-1'>
                      <i className='fa-solid fa-location-dot me-3'></i>
                      {item.address}
                    </span>
                  </div>
                  <div>
                    <span className='px-2 fs-7 text-dark'>
                      <i className='fa-solid fa-bed'></i> {item.bedroomCount}
                    </span>
                    <span className='px-2 fs-7 text-dark'>
                      <i className='fa-solid fa-bath'></i> {item.bathroomCount}
                    </span>
                    <span className='px-2 fs-7 text-dark'>
                      <i className='fa-solid fa-kaaba'></i> {item.area} m<sup>2</sup>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HouseSuggest;
