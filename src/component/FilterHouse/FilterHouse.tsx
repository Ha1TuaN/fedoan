import { Card, Form, Col, InputNumber, Row, Slider, Checkbox } from 'antd';
import { filterAcreage, filterPrice, filterType } from '../../utils/filter/filter';

function FilterHouse() {
    const [formPrice] = Form.useForm();
    const [formAcreage] = Form.useForm();
    const [formType] = Form.useForm();

    return (
        <>
            <Card style={{ width: 300 }}>
                <h6>Khoảng giá</h6>
                <Form form={formPrice} layout="vertical">
                    <Form.Item name="price" className="mb-0">
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {filterPrice.map((item: any) => (
                                    <Col span={24}>
                                        <Checkbox value={item.value} className="py-2">
                                            {item.label}
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Card>
            <Card style={{ width: 300, marginTop: '10px' }}>
                <h6>Diện tích</h6>
                <Form form={formAcreage} layout="vertical">
                    <Form.Item name="acreage" className="mb-0">
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {filterAcreage.map((item: any) => (
                                    <Col span={24}>
                                        <Checkbox value={item.value} className="py-2">
                                            {item.label}
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Card>
            <Card style={{ width: 300, marginTop: '10px' }}>
                <h6>Loại nhà</h6>
                <Form form={formType} layout="vertical">
                    <Form.Item name="type" className="mb-0">
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row>
                                {filterType.map((item: any) => (
                                    <Col span={24}>
                                        <Checkbox value={item.value} className="py-2">
                                            {item.label}
                                        </Checkbox>
                                    </Col>
                                ))}
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default FilterHouse;

// <Card style={{ width: 300 }}>
// <h6>Khoảng giá</h6>
// <div className="mt-3">
//     <Slider
//         range
//         max={100000000}
//         defaultValue={[0, 100000000]}
//         onChange={(value: any) => setPrice(value)}
//     />
//     <div className="d-flex justify-content-between m-3">
//         <a>VNĐ {formatNumber(price[0])}</a>
//         <a>VNĐ {formatNumber(price[1])}</a>
//     </div>
// </div>
// </Card>
// <Card style={{ width: 300 }}>
// <h6>Diện tích</h6>
// <div className="mt-3">
//     <Slider range max={1000} defaultValue={[0, 1000]} onChange={(value: any) => seAcreage(value)} />
//     <div className="d-flex justify-content-between m-3">
//         <a>{formatNumber(acreage[0])} m2</a>
//         <a>{formatNumber(acreage[1])} m2</a>
//     </div>
// </div>
// </Card>
