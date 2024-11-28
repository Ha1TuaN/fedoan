import {AuthModel} from './_models';
import {refresh} from './_requests';

const AUTH_LOCAL_STORAGE_KEY = 'kt-auth-react-v';
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return;
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY);
  if (!lsValue) {
    return;
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel;
    if (auth) {
      // You can easily check auth_token expiration also
      return auth;
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error);
  }
};

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return;
  }

  try {
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error);
  }
};

const removeAuth = () => {
  if (!localStorage) {
    return;
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error);
  }
};

export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json';
  axios.defaults.withCredentials = true;

  axios.interceptors.request.use(
    (config: {headers: {Authorization: string}}) => {
      const auth = getAuth();
      if (auth && auth.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      const originalConfig = error.config;
      // Nếu response trả về error 401 và request chưa được retry

      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        // Yêu cầu access token mới và gửi lại request ban đầu đã thất bại với access token mới
        try {
          const auth = getAuth();

          if (!auth || !auth.refreshToken || !auth.token) {
            removeAuth();
            return;
          }
          const {data} = await refresh(auth.token, auth.refreshToken);
          setAuth(data);
          originalConfig.headers.Authorization = `Bearer ${data.token}`;
          const instance = axios.create();
          return instance(originalConfig);
        } catch (error) {
          removeAuth();
          return;
        }
      }

      return Promise.reject(error);
    }
  );
}

export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY};
