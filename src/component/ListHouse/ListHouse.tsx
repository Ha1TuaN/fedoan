import { Card, List } from 'antd';
import { useEffect, useState } from 'react';
import { requestGETAll } from '../../utils/api/baseApi';
import _ from 'lodash';
import CardItem from '../CardItem/CardItem';
const ListHouse = () => {
    const [lstHouse, setLstHouse] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await requestGETAll('House', _.assign({}));
                setLstHouse(res ? res : []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
        return () => {};
    }, []);

    return (
        <>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={lstHouse}
                renderItem={(item) => (
                    <List.Item>
                        <CardItem data={item} />
                    </List.Item>
                )}
            />
        </>
    );
};

export default ListHouse;
