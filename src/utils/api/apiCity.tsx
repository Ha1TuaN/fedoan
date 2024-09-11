import axios from 'axios';

const API_URL =
    'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json?fbclid=IwZXh0bgNhZW0CMTAAAR0TE55k2p29lZVxvtmLtlPkfUTGwdBJOESRPtuKp0psARdgNhEfzMDWRto_aem_ZmFrZWR1bW15MTZieXRlcw';
export const getCity = async () => {
    try {
        const res = await axios({
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            url: `${API_URL}`,
        });
        return res.data;
    } catch (error) {
        return null;
    }
};
