import axios from 'axios';

export const API_URL = 'http://localhost:5005';
export const GATEWAY_URL = process.env.REACT_APP_GATEWAY_URL;
export const GATEWAY_TOKEN = process.env.REACT_APP_GATEWAY_TOKEN;

export const HOST_API = `${API_URL}/api/v1/`;
export const HOST_API_NEUTRAL = `${API_URL}/api/`;
export const FILE_URL = `${process.env.REACT_APP_FILE_URL}/api/v1/attachments/minio/`;

export const requestGET = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST_NEW = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestPUT_NEW = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestDOWNLOADFILE = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return null;
  }
};

export const requestPUT = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
      data,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestDELETE = async (URL) => {
  try {
    const res = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${API_URL}/${URL}`,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestGETNeutral = async (URL) => {
  try {
    const res = await axios({
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
    });
    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOSTNeutral = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
      data,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};

export const requestPOST_NEWNeutral = async (URL, data) => {
  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestPUTNeutral = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestPUT_NEWNeutral = async (URL, data) => {
  try {
    const res = await axios({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
      data,
    });

    return res;
  } catch (error) {
    return error?.response ?? null;
  }
};

export const requestDELETENeutral = async (URL) => {
  try {
    const res = await axios({
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      url: `${HOST_API_NEUTRAL}${URL}`,
    });

    return res.data;
  } catch (error) {
    return null;
  }
};
