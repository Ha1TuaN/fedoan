import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import _ from 'lodash';
import {PageTitle} from '../../../../_metronic/layout-portal/core';
import {requestPOST, requestGET} from 'src/utils/baseAPI';

import {Card, List} from 'antd';
import './HomeWrapper.scss';
import DashboardCustomer from '../dashboard/DashboardCustomer';
export const API_URL = process.env.REACT_APP_API_URL;

const wizardsBreadCrumbs = [
  {
    title: 'Trang chủ',
    path: '/',
    isSeparator: false,
    isActive: true,
  },
];

const HomeWrapper = () => {
  const navigate = useNavigate();
  const {Meta} = Card;
  const random = useSelector((state) => state.modal.random);

  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(10);
  const [count, setCount] = useState('');
  const [offset, setOffset] = useState(1);
  const [dataSearch, setDataSearch] = useState(null);

  return (
    <>
      <PageTitle breadcrumbs={wizardsBreadCrumbs}>Trang chủ</PageTitle>
      <div className='container '>
        <DashboardCustomer />
      </div>
    </>
  );
};

export default HomeWrapper;
