import {useState, useEffect} from 'react';
import FilterHouse from './FilterHouse';
import {Card, List, Carousel, Avatar} from 'antd';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {formatNumber} from 'src/utils/utils';
import {CardsWidget17} from '../../../../../_metronic/partials/widgets';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import MapHouse from './MapHouse';

const {Meta} = Card;

const contentStyle = {
  margin: 0,
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

function ListHousePage() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const priceRange = useSelector((state) => state.filter.price);
  const areaRange = useSelector((state) => state.filter.area);
  const type = useSelector((state) => state.filter.type);

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);
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
            pageSize: 1000,
            price: priceRange,
            // area: areaRange,
            // type: type,
            orderBy: ['createdOn DESC'],
          })
        );
        setData(res.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [priceRange]);
  return (
    <>
      <div className='row'>
        <div className='col-3'>
          <FilterHouse />
        </div>
        <div className='col-6'>
          <div className='row'>
            <div className='col-12'>
              <MapHouse />
            </div>
            <div className='col-12'>
              <List
                grid={{gutter: 16, column: 3}}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{
                        width: '100%',
                        padding: 0,
                      }}
                      actions={[
                        <div className='d-flex justify-content-between px-3'>
                          <div className='user-info d-flex align-items-center'>
                            <img src={`${item.userAvatar}`} />
                            <span className='ms-2 fs-8 text-dark fw-bold'>{item.userFullName}</span>
                          </div>
                          <div className='user-phone d-flex align-items-center'>
                            <span className='ms-2 fs-8 text-white fw-bold '>
                              <i className='fa-solid fa-square-phone text-white'></i> <span className=''>{item.userPhone}</span>
                            </span>
                          </div>
                        </div>,
                      ]}
                      cover={
                        <Carousel arrows infinite={false}>
                          {item.imageHouses.map((i) => (
                            <div className='carousel-item' key={i.id}>
                              <img src={i.image} />
                            </div>
                          ))}
                        </Carousel>
                      }
                    >
                      <Link to={`/house/detail/${item.id}`}>
                        <div className='d-flex align-items-center justify-content-between'>
                          <span className='title-container fs-9 text-muted flex-grow-1 mt-1'>
                            {item.districtName},{item.provinceName}
                          </span>
                          <span className='color-text fs-7 fw-bold'>
                            {formatNumber(item.price)} <i className='fs-10'>VNĐ</i>
                          </span>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                          <span className='title-container fs-8 text-dark flex-grow-1'>{item.address}</span>
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
                      </Link>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListHousePage;
