/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as actionsModal from 'src/setup/redux/modal/Actions';

import PageHeader from './components/PageHeader';
import TreeView from './components/OrganizationUnitTreeView';
import UsersList from './components/UsersList';

const OrganizationUnitsPage = () => {
  const dispatch = useDispatch();
  const flexContainerStyle = {
    display: 'flex',
  };

  const flexColumnStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const cardStyle = {
    flex: 1,
  };

  useEffect(() => {
    dispatch(actionsModal.resetData());

    return () => {};
  }, []);

  return (
    <>
      <div className='row mt-2 d-flex' style={flexContainerStyle}>
        <div className='col-xl-3 pe-0' style={flexColumnStyle}>
          <div className='card card-flush h-md-100' style={cardStyle}>
            <PageHeader title='Cơ cấu tổ chức' hasQuickAction={true} />
            <TreeView />
          </div>
        </div>
        <div className='col-xl-9' style={flexColumnStyle}>
          <div className='card card-xl-stretch' style={cardStyle}>
            <UsersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrganizationUnitsPage;
