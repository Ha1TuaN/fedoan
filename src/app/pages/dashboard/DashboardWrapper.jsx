import {FC} from 'react';
import {useIntl} from 'react-intl';
import {PageTitle} from '../../../_metronic/layout/core';
import {Content} from '../../../_metronic/layout/components/content';
import '../../../_metronic/assets/sass/style.dasboard.scss';
import {Card, Col, Row} from 'antd';
import EChart from './chart/EChart';
import BieChart from './chart/BieChart';
import WidgetCard from './Card/WidgetCard';

const DashboardPage = () => (
  <>
    <WidgetCard />
    <Row gutter={[24, 0]} className='mt-5'>
      <Col xs={24} sm={24} md={24} lg={18} xl={16} className='mb-24'>
        <EChart />
      </Col>
      <Col xs={24} sm={24} md={12} lg={6} xl={8} className='mb-24'>
        <BieChart />
      </Col>
    </Row>
  </>
);

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
    </>
  );
};

export {DashboardWrapper};
