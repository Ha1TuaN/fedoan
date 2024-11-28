import {Dropdown} from 'antd';
import {useDispatch} from 'react-redux';
import * as actionsModal from 'src/setup/redux/modal/Actions';

const PageHeader = (props) => {
  const {hasQuickAction} = props;
  const dispatch = useDispatch();
  return (
    <>
      <div
        style={{height: '55px'}}
        className='px-3 py-3 border-bottom border-secondary border-bottom-solid d-flex align-items-center justify-content-between'
      >
        <h3 className='card-title fw-bold text-header-td fs-4 mb-0'>{props?.title ?? ''}</h3>
        {hasQuickAction && (
          <div className='d-flex align-items-center'>
            <Dropdown
              trigger={'click'}
              menu={{
                items: [
                  {
                    key: 'them-nhom-goc',
                    disabled: false,
                    label: (
                      <span
                        className='e-1 p-2 text-dark'
                        onClick={() => {
                          dispatch(actionsModal.setModalOrganizationUnit({modalVisible: true, type: 'themnhomgoc'}));
                        }}
                      >
                        <i className={`fas fa-plus me-2`}></i>
                        {'Thêm nhóm gốc'}
                      </span>
                    ),
                  },
                  {
                    key: 'dong-bo',
                    disabled: false,
                    label: (
                      <span className='e-1 p-2 text-dark' onClick={() => {}}>
                        <i className={`fas fa-rotate me-2`}></i>
                        {'Đồng bộ từ nhóm người dùng'}
                      </span>
                    ),
                  },
                ],
              }}
            >
              <button className='btn btn-sm btn-icon btn-bg-light btn-active-color-primary' title='Thao tác nhanh'>
                <i className='fa fa-ellipsis-h'></i>
              </button>
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
};

export default PageHeader;
