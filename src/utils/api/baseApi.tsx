import axios from 'axios';

const API_URL = 'https://localhost:7037/api/RentHome';
export const requestGETAll = async (URL: string, query: any) => {
    try {
        const res = await axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}/${URL}`,
            params: {
                ...query,
            },
        });
        return res.data;
    } catch (error) {
        return null;
    }
};

export const requestPOST = async (URL: string, data: any) => {
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
        return error ?? null;
    }
};

export const requestPUT = async (URL: string, data: any) => {
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
        return error ?? null;
    }
};

export const requestDELETE = async (URL: string) => {
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
