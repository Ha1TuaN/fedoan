/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as actionsModal from 'src/setup/redux/modal/Actions';

import ItemsList from './components/ItemsList';

const UsersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionsModal.resetData());

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='card card-xl-stretch mb-xl-9'>
        <ItemsList title='Nhật ký thao tác' />
      </div>
    </>
  );
};

export default UsersPage;
