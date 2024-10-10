import React, { useEffect, useState } from 'react';
import type { InputNumberProps } from 'antd';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
import axios from 'axios';
export const IntegerStep: React.FC = () => {
    const [inputValue, setInputValue] = useState(0);
    const [infor, setInfor] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const onChange: InputNumberProps['onChange'] = (newValue) => {
        setInputValue(newValue as number);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('');
                setInfor(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        fetchData();
    }, []);
    // const FilterHouse = infor.filter((kq) => {
    //     return kq <= inputValue;
    // })
    return (
        <Row>
            <Col span={12}>
                <Slider min={0} max={100} onChange={onChange} value={typeof inputValue === 'number' ? inputValue : 0} />
            </Col>
            <Col span={4}>
                <InputNumber min={0} max={100} style={{ margin: '0 16px' }} value={inputValue} onChange={onChange} />
            </Col>
        </Row>
    );
};

export const DecimalStep: React.FC = () => {
    const [inputValue, setInputValue] = useState(0);
    const [infor, setInfor] = useState([]);
    const [error, setError] = useState<string | null>(null);
    const onChange: InputNumberProps['onChange'] = (value) => {
        setInputValue(value as number);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('');
                setInfor(response.data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };
        fetchData();
    }, []);
    const FilterHouse = infor.filter((kq) => {
        return kq <= inputValue;
    });
    return (
        <Row>
            <Col span={12}>
                <Slider
                    min={0}
                    max={200}
                    onChange={onChange}
                    value={typeof inputValue === 'number' ? inputValue : 0}
                    step={5}
                />
            </Col>
            <Col span={4}>
                <InputNumber
                    min={0}
                    max={200}
                    style={{ margin: '0 16px' }}
                    step={5}
                    value={inputValue}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};
