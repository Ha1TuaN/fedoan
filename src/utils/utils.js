import _ from 'lodash';
/* eslint no-useless-escape:0 import/prefer-default-export:0 */

const reg =
  /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
export const isUrl = (path) => reg.test(path);

export const getPageQuery = () => URLSearchParams(window.location.href.split('?')[1]);

export const convertImage = (array) => {
  return array.map((item) => ({
    image: item.response[0],
  }));
};
export const handleImage2 = (array) => {
  const arr = array.map((item) => item.image);
  let res = [];
  arr.forEach((i) => {
    res.push({
      url: i,
      path: i,
      name: i.substring(i.lastIndexOf('/') + 1),
    });
  });
  return res;
};
export const handleImage = (array) => {
  return array.map((item) => item.image);
};
export const convertFileToString = (array) => {
  var temp = array.map((element) => {
    return element.url || element.response[0]?.url;
  });
  var res = temp.join('##');
  return res;
};
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const CheckRole = (roles, role) => {
  if (!roles) {
    return false;
  }
  return roles.some((v) => role.includes(v));
};

export const validatePhoneNumber = (rule, value, callback) => {
  const phoneNumberRegex = /^\d{10}$/;

  if (value && !phoneNumberRegex.test(value)) {
    callback('Vui lòng nhập đúng định dạng số điện thoại !');
  } else {
    callback();
  }
};

export const formatNumber = (value) => {
  if (typeof value === 'number') {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  if (typeof value === 'string') {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return '';
};
