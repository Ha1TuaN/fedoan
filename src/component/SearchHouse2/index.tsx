import { Button, ConfigProvider, Input, Select, Space, Form } from 'antd';
import { useEffect, useState } from 'react';
import { getCity } from '../../utils/api/apiCity';
import { EnvironmentFilled, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCity, setWard } from '../../utils/slices/searchHouseSlice';
import { useNavigate } from 'react-router-dom';
import CardHouse from '../CardItem/CardHouse';
function SearchHouse2() {
    const [form] = Form.useForm();
    const [cities, setCities] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getCity();
                setCities(res ?? []);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);
    const onChange = (value: string) => {
        const city = cities.filter((city: any) => city.Name === value);
        setDistricts(city[0].Districts);
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    const optionsCity = cities.map((city: any) => ({
        value: `${city.Name}`,
        label: `${city.Name}`,
    }));
    const optionsDistrict = districts.map((city: any) => ({
        value: `${city.Name}`,
        label: `${city.Name}`,
    }));
    return (
        <>
            <Form form={form} autoComplete="off">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Space.Compact block>
                        <Form.Item name="city">
                            <Select
                                showSearch
                                className="flex-grow-1"
                                placeholder="Toàn quốc"
                                optionFilterProp="children"
                                onChange={onChange}
                                filterOption={filterOption}
                                options={optionsCity}
                                //labelRender={<EnvironmentFilled />}
                                size="large"
                                style={{ width: '180px', height: '50px' }}
                            />
                        </Form.Item>
                        <Form.Item name="ward">
                            <Select
                                showSearch
                                className="flex-grow-1"
                                placeholder="Chọn quận/huyện"
                                optionFilterProp="children"
                                filterOption={filterOption}
                                options={optionsDistrict}
                                size="large"
                                style={{ width: '180px', height: '50px' }}
                            />
                        </Form.Item>

                        <ConfigProvider
                            theme={{
                                components: {
                                    Button: {
                                        defaultBg: '#f4511e',
                                        defaultColor: '#fff',
                                        defaultBorderColor: '#f4511e',
                                        defaultHoverBg: '#fb641e',
                                        defaultHoverBorderColor: '#fb641e',
                                        defaultHoverColor: '#fff',
                                    },
                                },
                            }}
                        >
                            <Button icon={<SearchOutlined />} size="large" style={{ height: '50px' }}></Button>
                        </ConfigProvider>
                    </Space.Compact>
                </Space>
            </Form>
            
        </>
    );
}

export default SearchHouse2;
