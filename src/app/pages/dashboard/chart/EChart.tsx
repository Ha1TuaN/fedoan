import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, Card } from "antd";
import { eChart } from "./configs/eChart";

function EChart() {
    const { Title, Paragraph } = Typography;

    const items = [
        {
            Title: "1",
            user: "Số nhà đã thuê",
        },
        {
            Title: "3 000 000",
            user: "Doanh thu",
        },
    ];

    return (
        <>
            <Card bordered={false} className="criclebox h-500px">

                <div id="chart">
                    <ReactApexChart
                        className="bar-chart"
                        options={eChart.options}
                        series={eChart.series}
                        type="bar"
                        height={320}
                    />
                </div>
                <div className="chart-vistior">
                    <Title level={5} className="text-muted">Doanh thu tháng 12</Title>
                    <Row>
                        {items.map((v, index) => (
                            <Col xs={6} xl={6} sm={6} md={6} key={index}>
                                <div className="chart-visitor-count">
                                    <Title level={4}>{v.Title}</Title>
                                    <span>{v.user}</span>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </Card>
        </>
    );
}

export default EChart;
