import {Space, Dropdown, Cascader, Button, Menu, ConfigProvider, Form, Select} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {useDispatch} from 'react-redux';
import * as action from 'src/setup/redux/filter/Actions';
import {useNavigate} from 'react-router-dom';

const FormItem = Form.Item;

const SearchItem = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinceCode, setProvinceCode] = useState(null);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await requestPOST(`api/v1/areas/search`, {
        pageNumber: 1,
        pageSize: 1000,
        orderBy: ['code'],
        level: 1,
      });
      if (res && res.data) setProvinces(res.data);
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    if (provinceCode) {
      const fetchData = async () => {
        const res = await requestPOST(`api/v1/areas/search`, {
          pageNumber: 1,
          pageSize: 1000,
          orderBy: ['code'],
          level: 2,
          parentCode: provinceCode,
        });
        if (res && res.data) setDistricts(res.data);
      };
      fetchData();
    }
    return () => {};
  }, [provinceCode]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await requestPOST(
          `api/v1/areas/search`,
          _.assign({
            advancedSearch: {
              fields: ['name', 'shortName', 'code'],
              keyword: null,
            },
            pageNumber: 1,
            pageSize: 1000,
            level: 1,
            orderBy: ['code ASC'],
          })
        );
        const data = res.data.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
          children: item.children.map((i) => ({
            ...i,
            value: i.id,
            label: i.name,
          })),
        }));
        setAreas(data ?? []);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onChange = (value) => {
    console.log(value);
  };

  const displayRender = (labels) => labels[labels.length - 1];
  const onFinish = async () => {
    const values = await form.validateFields();
    try {
      const formData = form.getFieldsValue(true);
      dispatch(action.setDistrictId(formData.districtId));
      dispatch(action.setProvinceId(formData.provinceId));
      navigate('/house/listhouse');
      console.log(formData);
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  };
  return (
    <>
      <div>
        <Form form={form} autoComplete='off'>
          <Space direction='vertical' size='middle'>
            <ConfigProvider
              theme={{
                token: {
                  colorBgBase: 'tranparent',
                  colorText: '#fff',
                },
              }}
            >
              <Space.Compact>
                <FormItem label='' name='province'>
                  <Select
                    showSearch
                    className='select-tranparent'
                    suffixIcon={<DownOutlined className='text-light' />}
                    placeholder={<span className='text-light'>Chọn tỉnh thành phố</span>}
                    size='large'
                    allowClear
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    style={{width: '250px'}}
                    options={provinces.map((item) => ({
                      ...item,
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={(value, current) => {
                      if (value) {
                        console.log(current);
                        form.setFieldValue('provinceId', current.id);
                        form.setFieldValue('districts', null);
                        form.setFieldValue('communes', null);
                        setProvinceCode(current.code);
                      } else {
                        form.setFieldValue('districts', null);
                        form.setFieldValue('communes', null);
                      }
                    }}
                  />
                </FormItem>
                <FormItem label='' name='district'>
                  <Select
                    showSearch
                    suffixIcon={<DownOutlined className='text-light' />}
                    placeholder={<span className='text-light'>Chọn quận huyện</span>}
                    allowClear
                    className='select-tranparent'
                    size='large'
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    style={{width: '250px'}}
                    options={districts.map((item) => ({
                      ...item,
                      value: item.id,
                      label: item.name,
                    }))}
                    onChange={(value, current) => {
                      if (value) {
                        console.log(current);
                        form.setFieldValue('districtId', current.id);
                      } else {
                        form.setFieldValue('communes', null);
                      }
                    }}
                  />
                </FormItem>

                <Button size='large' style={{background: '#f7f2f28a', border: 0}} onClick={onFinish}>
                  Tìm kiếm
                </Button>
              </Space.Compact>
            </ConfigProvider>
          </Space>
        </Form>
      </div>
    </>
  );
};

export default SearchItem;
