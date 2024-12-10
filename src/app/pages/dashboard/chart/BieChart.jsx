import ReactApexChart from 'react-apexcharts';
import {Row, Col, Typography} from 'antd';
import {Tab, Tabs} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import {useAuth} from '../../../modules/auth';
import {requestPOST} from 'src/utils/baseAPI';

function BieChart() {
  const [data, setData] = useState(null);
  const {currentUser} = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST('api/v1/dashboard/card', {
        ownerId: currentUser?.id,
      });
      setData(res);
    };
    fetchData();
  }, []);
  const houseRent = (data?.houseRent / data?.totalHouse) * 100;
  const houseNotRent = (data?.houseNotRent / data?.totalHouse) * 100;
  const bieChartDanToc = {
    series: [houseRent, houseNotRent],

    options: {
      chart: {
        type: 'donut',
        width: 380,
      },
      labels: ['Đã thuê', 'Chưa thuê'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val}`;
          },
        },
      },
    }, // Explicitly cast options to ApexOptions
  };
  return (
    <>
      <div className='card card-custom h-500px'>
        <div className='card-header'>
          <div className='card-title'>Nhà ở</div>
        </div>
        <div className='card-body'>
          <ReactApexChart options={bieChartDanToc.options} series={bieChartDanToc.series} type='pie' height={400} />
        </div>
      </div>
    </>
  );
}

export default BieChart;
