import {useEffect, useState} from 'react';
import {Cascader, Form, Checkbox, Row, Col, Slider, InputNumber} from 'antd';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {filterPrice, filterType} from 'src/utils/filter';
import {formatNumber} from 'src/utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import * as action from 'src/setup/redux/filter/Actions';

const FilterHouse = () => {
  const dispatch = useDispatch();
  const priceRange = useSelector((state) => state.filter.price);
  const areaRange = useSelector((state) => state.filter.area);
  const bedroomCount = useSelector((state) => state.filter.bedroomCount);
  const bathroomCount = useSelector((state) => state.filter.bathroomCount);
  const [form] = Form.useForm();

  // Handlers for price and area sliders
  const handlePriceChange = (value) => {
    if (value[0] !== priceRange[0] || value[1] !== priceRange[1]) {
      dispatch(action.setPrice(value));
    }
  };

  const handleAreaChange = (value) => {
    if (value[0] !== areaRange[0] || value[1] !== areaRange[1]) {
      dispatch(action.setArea(value));
    }
  };
  const handleBedroomCountChange = (value) => {
    if (value[0] !== bedroomCount[0] || value[1] !== bedroomCount[1]) {
      dispatch(action.setBedRoomCount(value));
    }
  };
  const handleBathroomCountChange = (value) => {
    if (value[0] !== bathroomCount[0] || value[1] !== bathroomCount[1]) {
      dispatch(action.setBathRoomCount(value));
    }
  };

  return (
    <div className='d-flex flex-column px-5'>
      {/* Property Type */}
      <div className='house_type'>
        <h3 className='text-lg font-semibold mb-4'>Loại hình bất động sản</h3>
        <Form form={form} layout='vertical'>
          <Form.Item name='type' className='mb-0'>
            <Checkbox.Group style={{width: '100%'}} onChange={(value) => dispatch(action.setType(value))}>
              <Row>
                {filterType.map((item) => (
                  <Col span={24} key={item.value}>
                    <Checkbox value={item.value} className='py-2'>
                      {item.label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </div>

      {/* Price Range */}
      <div className='house_price mt-5'>
        <div className='d-flex justify-content-between'>
          <h6>Khoảng giá</h6>
        </div>
        <div className=''>
          <Slider range max={100000000} value={priceRange} onChange={handlePriceChange} />
          <div className='d-flex justify-content-between '>
            <InputNumber
              value={priceRange[0]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              suffix={'đ'}
              onChange={(value) => dispatch(action.setPrice([value || 0, priceRange[1]]))}
            />
            <InputNumber
              value={priceRange[1]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              suffix={'đ'}
              onChange={(value) => dispatch(action.setPrice([priceRange[0], value || 100000000]))}
            />
          </div>
          {/* <div>
            <Checkbox.Group style={{width: '100%'}}>
              <Row>
                {filterPrice.map((item) => (
                  <Col span={24} key={item.value}>
                    <Checkbox value={item.value} className='py-2'>
                      {item.label}
                    </Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </div> */}
        </div>
      </div>

      {/* Area Range */}
      <div className='house_area mt-5'>
        <div className='d-flex justify-content-between'>
          <h6>Diện tích sàn</h6>
        </div>
        <div className=' '>
          <Slider range max={1000} value={areaRange} onChange={handleAreaChange} />
          <div className='d-flex justify-content-between '>
            <InputNumber
              value={areaRange[0]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              suffix={'m²'}
              onChange={(value) => dispatch(action.setArea([value || 0, areaRange[1]]))}
            />
            <InputNumber
              value={areaRange[1]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              suffix='m²'
              onChange={(value) => dispatch(action.setArea([areaRange[0], value || 1000]))}
            />
          </div>
        </div>
      </div>

      <div className='house_area mt-5'>
        <div className='d-flex justify-content-between'>
          <h6>Số lượng phòng ngủ</h6>
        </div>
        <div className=' '>
          <Slider range max={10} value={bedroomCount} onChange={handleBedroomCountChange} />
          <div className='d-flex justify-content-between '>
            <InputNumber
              value={bedroomCount[0]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              onChange={(value) => dispatch(action.setBedRoomCount([value || 0, bedroomCount[1]]))}
            />
            <InputNumber
              value={bedroomCount[1]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              onChange={(value) => dispatch(action.setBedRoomCount([bedroomCount[0], value || 1000]))}
            />
          </div>
        </div>
      </div>
      <div className='house_area mt-5'>
        <div className='d-flex justify-content-between'>
          <h6>Số lượng phòng tắm</h6>
        </div>
        <div className=' '>
          <Slider range max={10} value={bathroomCount} onChange={handleBathroomCountChange} />
          <div className='d-flex justify-content-between '>
            <InputNumber
              value={bathroomCount[0]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              onChange={(value) => dispatch(action.setBathRoomCount([value || 0, bathroomCount[1]]))}
            />
            <InputNumber
              value={bathroomCount[1]}
              formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => value.replace(/,/g, '')}
              style={{width: '110px'}}
              onChange={(value) => dispatch(action.setBathRoomCount([bathroomCount[0], value || 1000]))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterHouse;
