import {Typography} from 'antd';
import {CardsWidget} from './CardsWidget';
import {useEffect, useState} from 'react';
import {requestGET, requestPOST} from 'src/utils/baseAPI';
import {useAuth} from '../../../modules/auth';

function WidgetCard() {
  const {currentUser} = useAuth();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST('api/v1/dashboard/card', {
        ownerId: currentUser?.id,
      });
      setData(res);
    };
    fetchData();
  }, []);
  return (
    <>
      <div className='row mx-0'>
        <div className='col-xl-4 col-lg-4'>
          <CardsWidget
            className=' mb-3 mb-xl-5'
            description={`Tổng số nhà trọ`}
            color={`#0076ff`}
            mainNumber={data?.totalHouse}
            percentage={`${(data?.totalHouse / data?.totalHouse) * 100}%`}
            icon={`fa-solid fa-house-user`}
          />
        </div>
        <div className='col-xl-4 col-lg-4'>
          <CardsWidget
            className=' mb-3 mb-xl-5'
            description={`Số nhà trọ chưa được thuê`}
            color={`#ecab2b`}
            mainNumber={data?.houseNotRent}
            percentage={`${(data?.houseNotRent / data?.totalHouse) * 100}%`}
            icon={`fa-solid fa-house-circle-exclamation`}
          />
        </div>
        <div className='col-xl-4 col-lg-4'>
          <CardsWidget
            className=' mb-3 mb-xl-5'
            description={`Số nhà trọ đã được thuê`}
            color={`#c0a499`}
            mainNumber={data?.houseRent}
            percentage={`${(data?.houseRent / data?.totalHouse) * 100}%`}
            icon={`fa-solid fa-house-circle-check`}
          />
        </div>
      </div>
    </>
  );
}

export default WidgetCard;
