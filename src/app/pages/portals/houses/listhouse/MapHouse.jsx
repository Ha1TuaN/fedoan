import React, {useEffect, useState} from 'react';
import {GoogleMap, Marker, useJsApiLoader, InfoWindow} from '@react-google-maps/api';
import {Cascader, Spin, notification} from 'antd';
import {requestPOST} from 'src/utils/baseAPI';
import _ from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import * as action from '../../../../../setup/redux/filter/Actions';

const MapHouse = ({locations}) => {
  const dispatch = useDispatch();

  // Lấy giá trị từ Redux store
  const provinceId = useSelector((state) => state.filter.provinceId);
  const districtId = useSelector((state) => state.filter.districtId);

  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState({lat: 21.0285, lng: 105.8542});
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null); // ID của marker đang hover
  const {isLoaded} = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg', // Đảm bảo rằng API key hợp lệ
  });

  const calculateCenter = () => {
    if (locations.length === 0) return {lat: 0, lng: 0};

    const latitudes = locations.map((location) => location.lat);
    const longitudes = locations.map((location) => location.lng);

    const avgLat = latitudes.reduce((acc, lat) => acc + lat, 0) / latitudes.length;
    const avgLng = longitudes.reduce((acc, lng) => acc + lng, 0) / longitudes.length;

    return {lat: avgLat, lng: avgLng};
  };

  const center = calculateCenter();

  const fetchAreas = async () => {
    try {
      const res = await requestPOST('api/v1/areas/search', {
        advancedSearch: {
          fields: ['name', 'shortName', 'code'],
          keyword: null,
        },
        pageNumber: 1,
        pageSize: 1000,
        level: 1,
        orderBy: ['code ASC'],
      });

      return res.data.map((item) => ({
        ...item,
        value: item.id,
        label: item.name,
        children: item.children.map((i) => ({
          ...i,
          value: i.id,
          label: i.name,
        })),
      }));
    } catch (error) {
      notification.error({
        message: 'Error',
        description: 'Failed to load areas. Please try again later.',
      });
      throw error;
    }
  };

  useEffect(() => {
    const loadAreas = async () => {
      setLoading(true);
      try {
        const data = await fetchAreas();
        setAreas(data ?? []);
      } finally {
        setLoading(false);
      }
    };

    loadAreas();
  }, []);

  const displayRender = (labels) => labels[labels.length - 1];

  const handleCascaderChange = (value, place) => {
    if (value) {
      const address = place[1].name;
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({address}, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          setPlace({
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error('Geocoder failed due to:', status);
        }
      });
      dispatch(action.setProvinceId(value[0]));
      dispatch(action.setDistrictId(value[1]));
    } else {
      dispatch(action.setProvinceId(null));
      dispatch(action.setDistrictId(null));
    }
  };

  if (!isLoaded) return <Spin tip='Loading map...' />;

  return (
    <div className='card-body'>
      <Spin spinning={loading}>
        <Cascader
          size='large'
          options={areas}
          dropdownMenuColumnStyle={{minWidth: '500px', overflow: 'auto'}}
          expandTrigger='hover'
          displayRender={displayRender}
          onChange={handleCascaderChange}
          value={provinceId && districtId ? [provinceId, districtId] : null}
          placeholder={provinceId && districtId ? '' : 'Tìm theo khu vực'}
          style={{width: '100%', marginBottom: '10px'}}
        />
      </Spin>

      <div style={{width: '100%', height: '300px'}}>
        <GoogleMap mapContainerStyle={{width: '100%', height: '100%'}} zoom={10} center={place}>
          {locations.map((location) => (
            <Marker
              key={location.id}
              position={{lat: location.lat, lng: location.lng}}
              onMouseOver={() => setHoveredMarkerId(location.id)} // Đặt ID của marker
              onMouseOut={() => setHoveredMarkerId(null)} // Xóa ID khi hover ra ngoài
            >
              {hoveredMarkerId === location.id && ( // Chỉ hiển thị nếu ID khớp
                <InfoWindow>
                  <div>
                    <strong>Địa chỉ:</strong> {location.address || 'Không có thông tin địa chỉ'}
                  </div>
                </InfoWindow>
              )}
            </Marker>
          ))}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapHouse;
