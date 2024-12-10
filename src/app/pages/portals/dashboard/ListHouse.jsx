import {useState, useEffect} from 'react';
import {Card, List, Carousel, Avatar, Radio} from 'antd';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {formatNumber} from 'src/utils/utils';
import {useSelector} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';

const {Meta} = Card;

function ListHouse() {
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
            pageSize: 1000,

            orderBy: [`createdOn DESC`],
          })
        );
        setData(res.data ?? []);
        setLoading(false);
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
      <div className='row'>
        <div className='col-12'>
          <div className='card '>
            <div className='card-header p-0 m-0'>
              <div className='card-title'>
                <h3 className='card-label'>Tin đăng mới nhất</h3>
              </div>
              <div class='card-toolbar'>
                <a
                  href='#'
                  onClick={() => navigate('house/listhouse')}
                  class='btn btn-sm btn-light-primary font-weight-bold d-flex align-items-center'
                >
                  <span>
                    Xem thêm <i className='fa-solid fa-arrow-right me-1'></i>
                  </span>
                </a>
              </div>
            </div>
            <div className='card-body px-0'>
              <List
                grid={{gutter: 16, column: 4}}
                dataSource={data}
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 12,
                }}
                renderItem={(item) => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{
                        width: '100%',
                        padding: 0,
                      }}
                      className='card-item'
                      actions={[
                        <span className='px-2 fs-7 text-dark'>
                          <i className='fa-solid fa-bed'></i> {item.bedroomCount}
                        </span>,
                        <span className='px-2 fs-7 text-dark'>
                          <i className='fa-solid fa-bath'></i> {item.bathroomCount}
                        </span>,
                        <span className='px-2 fs-7 text-dark'>
                          <i className='fa-solid fa-kaaba'></i> {item.area} m<sup>2</sup>
                        </span>,
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
                          <span className='title-container fs-7 text-muted flex-grow-1 mt-1'>
                            <i className='fa-solid fa-location-dot fs-9 me-1'></i>
                            {item.districtName},{item.provinceName}
                          </span>
                          <span className='color-text fs-6 fw-bold'>
                            {formatNumber(item.price)} <i className='fs-8 '>đ</i>
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

export default ListHouse;
