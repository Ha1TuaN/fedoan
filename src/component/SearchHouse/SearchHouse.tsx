import { Button, ConfigProvider, Input, Select, Space } from 'antd';
import { useEffect, useState } from 'react';
import { getCity } from '../../utils/api/apiCity';
import { EnvironmentFilled, EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';

//const { Search } = Input;

function SearchHouse() {
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
        const city = cities.filter((city: any) => city.Id === value);
        setDistricts(city[0].Districts);
    };
    //console.log(districts);
    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const filterOption = (input: string, option?: { label: string; value: string }) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    const optionsCity = cities.map((city: any) => ({
        value: `${city.Id}`,
        label: `${city.Name}`,
    }));
    const optionsDistrict = districts.map((city: any) => ({
        value: `${city.Id}`,
        label: `${city.Name}`,
    }));
    return (
        <>
            <div className="w-100">
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Space.Compact block>
                        <Select
                            showSearch
                            className="flex-grow-1"
                            placeholder="Toàn quốc"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            filterOption={filterOption}
                            options={optionsCity}
                            //labelRender={<EnvironmentFilled />}
                            size="large"
                            style={{ width: '100%', height: '50px' }}
                        />

                        <Select
                            showSearch
                            className="flex-grow-1"
                            placeholder="Chọn quận/huyện"
                            optionFilterProp="children"
                            filterOption={filterOption}
                            options={optionsDistrict}
                            size="large"
                            style={{ width: '100%', height: '50px' }}
                        />

                        {/* <div className="col-xl-3 col-lg-3">
                    <Input
                        size="large"
                        className="flex-grow-1"
                        style={{ width: '100%', height: '50px' }}
                        placeholder=""
                        prefix={<EnvironmentOutlined />}
                    />
                </div> */}

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
            </div>
        </>
    );
}

export default SearchHouse;
