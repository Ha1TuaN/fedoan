import ReactApexChart from 'react-apexcharts';
import {Row, Col, Typography, Card} from 'antd';
import {useAuth} from '../../../modules/auth';
import {useState, useEffect} from 'react';
import {requestPOST} from 'src/utils/baseAPI';
import dayjs from 'dayjs';
import {formatNumber} from 'src/utils/utils';

function EChart() {
  const {Title, Paragraph} = Typography;
  const {currentUser} = useAuth();
  const [data, setData] = useState([]);
  const month = dayjs().month();
  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST('api/v1/dashboard/chart', {
        ownerId: currentUser?.id,
      });
      setData(res);
    };
    fetchData();
  }, []);

  const items = [
    {
      Title: '1',
      user: 'Số nhà đã thuê',
    },
    {
      Title: '3 000 000',
      user: 'Doanh thu',
    },
  ];
  const eChart = {
    series: [
      {
        name: 'Số lượng bài đăng',
        data: data.map((item) => item.totalPost),
        color: '#fff',
      },
    ],

    options: {
      chart: {
        type: 'bar',
        width: '100%',
        height: 'auto',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent'],
      },
      grid: {
        show: true,
        borderColor: '#ccc',
        strokeDashArray: 2,
      },
      xaxis: {
        categories: data.map((item) => item.month),
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(12).fill('#fff'), // Simplified array creation
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: Array(12).fill('#fff'),
          },
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val}`;
          },
        },
      },
    },
  };
  return (
    <>
      <Card bordered={false} className='criclebox h-500px'>
        <div id='chart'>
          <ReactApexChart className='bar-chart' options={eChart.options} series={eChart.series} type='bar' height={320} />
        </div>
        <div className='chart-vistior'>
          <Title level={5} className='text-muted'>
            Doanh thu tháng {month + 1}
          </Title>
          <Row>
            <Col xs={6} xl={6} sm={6} md={6}>
              <div className='chart-visitor-count'>
                <Title level={4}>{data[month]?.houseRent}</Title>
                <span>Số lượng nhà đã thuê</span>
              </div>
            </Col>
            <Col xs={6} xl={6} sm={6} md={6}>
              <div className='chart-visitor-count'>
                <Title level={4}>{formatNumber(data[month]?.price)} đ</Title>
                <span>Doanh thu</span>
              </div>
            </Col>
          </Row>
        </div>
      </Card>
    </>
  );
}

export default EChart;
