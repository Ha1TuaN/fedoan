import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import { bieChartDanToc, bieChartTonGiao } from "./configs/bieChart";
import { Tab, Tabs } from "react-bootstrap";

function BieChart() {

    return (
        <>
            <div className="card card-custom h-500px">
                <div className="card-header">
                    <div className="card-title">Nhà ở</div>
                </div>
                <div className="card-body">

                    <ReactApexChart
                        options={bieChartDanToc.options}
                        series={bieChartDanToc.series}
                        type="pie"
                        height={400}
                    />


                </div>
            </div>
        </>
    );
}

export default BieChart;
