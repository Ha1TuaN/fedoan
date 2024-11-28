import {Space, Dropdown, Cascader, Button, Menu, ConfigProvider} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {useEffect, useState} from 'react';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';

const SearchItem = () => {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const items1 = [
    {
      key: '1',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.antgroup.com'>
          1st menu item
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.aliyun.com'>
          2nd menu item
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target='_blank' rel='noopener noreferrer' href='https://www.luohanacademy.com'>
          3rd menu item
        </a>
      ),
    },
  ];

  const menu = <Menu items={items1} />;

  const onChange = (value) => {
    console.log(value);
  };

  const displayRender = (labels) => labels[labels.length - 1];

  return (
    <>
      <div>
        <Space direction='vertical' size='middle'>
          <Space.Compact>
            <Cascader
              size='large'
              options={areas}
              expandTrigger='hover'
              displayRender={displayRender}
              onChange={onChange}
              placeholder='Tìm theo khu vực'
            />

            <Dropdown overlay={menu} placement='bottom'>
              <Button size='large' className='text-muted'>
                Giá <DownOutlined />
              </Button>
            </Dropdown>
            <Dropdown overlay={menu} placement='bottom'>
              <Button size='large' className='text-muted'>
                Diện tích <DownOutlined />
              </Button>
            </Dropdown>
            <Button type='primary' size='large'>
              Tìm kiếm
            </Button>
          </Space.Compact>
        </Space>
      </div>
    </>
  );
};

export default SearchItem;
