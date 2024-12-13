import {Button, Card} from 'antd';
import {useEffect, useState} from 'react';
import _ from 'lodash';
import {requestPOST} from 'src/utils/baseAPI';
import {formatNumber} from 'src/utils/utils';
import {CreditCardFilled} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import * as actionsModal from 'src/setup/redux/modal/Actions';
import ModalItem from './components/ChiTietModal';

function MembershipPaymentPage() {
  const dispatch = useDispatch();
  const modalVisible = useSelector((state) => state.modal.modalVisible);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/memberships/search`,
          _.assign({
            advancedSearch: {
              fields: ['name'],
              keyword: null,
            },
            pageNumber: 1,
            pageSize: 1000,
          })
        );
        setData(res?.data ?? []);
        setCount(res?.totalCount ?? 0);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className='d-flex justify-content-center align-items-center  '>
        {data.map((item) => (
          <Card title={item.name} className='col-xl-6 col-lg-6 m-3' bordered={false} style={{width: 300}}>
            <div className='d-flex justify-content-start align-item-center'>
              <h1 className='me-3' style={{color: '#e75211'}}>
                {formatNumber(item.price)}{' '}
              </h1>{' '}
              <span className='d-flex justify-content-start align-items-center'>đ/1 tin đăng</span>
            </div>
            <h6>Tiện ích</h6>
            <ul>
              {!item.isVip ? (
                <>
                  <li>Tin đăng chỉ xuất hiện ở danh sách thông thường</li>
                  <li>Tin đăng có thể bị giới hạn thời gian hiển thị 7 ngày</li>
                </>
              ) : (
                <>
                  <li>Tin VIP được hiển thị ở đầu danh sách hoặc trang chủ.</li>
                  <li>Tin có thể được hiển thị trong thời gian 30 ngày</li>
                </>
              )}
            </ul>
            <Button
              type='primary'
              size='large'
              style={{backgroundColor: '#e75211'}}
              icon={<CreditCardFilled />}
              className='w-100 py-3'
              onClick={() => {
                dispatch(actionsModal.setDataModal(item));
                dispatch(actionsModal.setModalVisible(true));
              }}
            >
              Thanh toán
            </Button>
          </Card>
        ))}
      </div>
      {modalVisible ? <ModalItem /> : <></>}
    </>
  );
}

export default MembershipPaymentPage;
