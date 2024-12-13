import {Card, InputNumber} from 'antd';
import {useState} from 'react';
import {formatNumber} from 'src/utils/utils';

const ItemPayment = ({data}) => {
  const [count, setCount] = useState(1);
  return (
    <>
      <Card
        title={data.name}
        className='col-xl-6 col-lg-6 m-3'
        bordered={false}
        style={{width: '50%'}}
        extra={<InputNumber placeholder='Nhập số lượng' min={1} value={count} onChange={(value) => setCount(value)} />}
      >
        <div className='d-flex justify-content-between align-item-center py-3'>
          <span className='me-3 text-muted'>Giá</span>{' '}
          <span className='fs-3 d-flex justify-content-start align-items-center'>
            {formatNumber(data.price)} <i className='fs-7 mt-1 ms-2'>đ</i>
          </span>
        </div>
        <div className='d-flex justify-content-between align-item-center py-3 border-bottom'>
          <span className='me-3 text-muted'>Số lượng</span> <span className='d-flex justify-content-start align-items-center'>{count}</span>
        </div>
        <div className='d-flex justify-content-between align-item-center py-3'>
          <span className='fs-4 me-3 text-muted'>Tổng cộng</span>{' '}
          <span className='fs-2 d-flex justify-content-start align-items-center'>
            {formatNumber(data.price * count)} <i className='fs-7  mt-1 ms-2'>đ</i>
          </span>
        </div>
      </Card>
    </>
  );
};

export default ItemPayment;
