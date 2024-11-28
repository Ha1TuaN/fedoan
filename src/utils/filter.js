import {icons} from 'antd/es/image/PreviewGroup';

export const filterPrice = [
  {
    label: 'Dưới 1 triệu',
    value: [0, 1000000],
  },
  {
    label: '1-3 triệu',
    value: [1000000, 3000000],
  },
  {
    label: '5-10 triệu',
    value: [5000000, 10000000],
  },
  {
    label: '10-40 triệu',
    value: [10000000, 40000000],
  },
  {
    label: '40-70 triệu',
    value: [40000000, 70000000],
  },
  {
    label: '70-100 triệu',
    value: [70000000, 100000000],
  },
  {
    label: 'Trên 100 triệu',
    value: [100000000, 1000000000],
  },
];

export const filterAcreage = [
  {
    label: 'Dưới 30 m2',
    value: [0, 30],
  },
  {
    label: '30-50 m2',
    value: [30, 50],
  },
  {
    label: '50-80 m2',
    value: [50, 80],
  },
  {
    label: '80-100 m2',
    value: [80, 100],
  },
  {
    label: '100-150 m2',
    value: [100, 150],
  },
  {
    label: '150-200 m2',
    value: [150, 200],
  },
  {
    label: 'Trên 200 m2',
    value: [200, 1000000000],
  },
];

export const filterType = [
  {
    label: 'Chung cư',
    value: 'Chung cư',
    icon: 'fa-solid fa-city',
  },
  {
    label: 'Chung cư mini',
    value: 'Chung cư mini',
    icon: 'fa-solid fa-building',
  },
  {
    label: 'Nhà biệt thự, liền kề',
    value: 'Nhà biệt thự liền kề',
    icon: 'fa-solid fa-tree-city',
  },
  {
    label: 'Nhà mặt phố',
    value: 'Nhà mặt phố',
    icon: 'fa-solid fa-kaaba',
  },
  {
    label: 'Nhà trọ, phòng trọ',
    value: 'Nhà trọ, phòng trọ',
    icon: 'fa-solid fa-house-chimney',
  },
  {
    label: 'Nhà riêng',
    value: 'Nhà riêng',
    icon: 'fa-solid fa-tents',
  },
];
