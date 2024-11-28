/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

import {KTSVG} from 'src/_metronic/helpers';
import {requestGET} from 'src/utils/baseAPI';

import ItemsList from './ItemsList';
import * as actionsModal from 'src/setup/redux/modal/Actions';

const UsersList = (props) => {
  const dispatch = useDispatch();
  const random = useSelector((state) => state.modal.random);

  const dataModal = useSelector((state) => state.modal.currentOrganizationUnit);
  const id = dataModal?.id ?? null;
  const [loading, setLoading] = useState(false);
  const [organizationUnit, setOrganizationUnit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await requestGET(`api/v1/organizationunits/${id}`);

      setOrganizationUnit(res?.data ?? null);

      setLoading(false);
    };
    if (id) {
      fetchData();
    } else {
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, random]);

  return (
    <>
      <div className='card-body card-dashboard px-3 py-3'>
        <div className='card-body pt-1 p-0'>
          <div className='table-responsive'>
            {/*begin::Table*/}
            <table className='table align-middle table-row-dashed gy-5' id='kt_table_users_login_session'>
              {/*begin::Table body*/}
              <tbody className='fs-6 fw-semibold text-gray-600'>
                <tr>
                  <td>Mã đơn vị</td>
                  <td>
                    <span className='fw-bold fs-6 text-dark'>{organizationUnit?.code}</span>
                  </td>
                  <td>Cấp tổ chức</td>
                  <td>
                    <span className='fw-bold fs-6 text-dark'>{organizationUnit?.organizationUnitType?.name ?? ''}</span>
                  </td>
                </tr>
                <tr>
                  <td>Chức năng nhiệm vụ</td>
                  <td>
                    <span className='fw-bold fs-6 text-dark'>{organizationUnit?.mainTask}</span>
                  </td>
                  <td>Địa chỉ</td>
                  <td>
                    <span className='fw-bold fs-6 text-dark'>{organizationUnit?.address}</span>
                  </td>
                </tr>
              </tbody>
              {/*end::Table body*/}
            </table>
            {/*end::Table*/}
          </div>
        </div>
        <ItemsList />
      </div>
    </>
  );
};

export default UsersList;
