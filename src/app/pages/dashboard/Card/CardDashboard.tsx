import {

    Typography,

} from "antd";
import { CardsWidget } from "./CardsWidget";

const data = [
    {
        title: "Tổng số nhà trọ",
        value: 10,
        percent: 100,
        icon: 'fa-solid fa-house-user',
        background: '#0076ff'
    },
    {
        title: "Số nhà trọ chưa được thuê",
        value: 9,
        percent: 90,
        icon: 'fa-solid fa-house-circle-exclamation',
        background: '#ecab2b'
    },
    {
        title: "Số nhà trọ đã được thuê",
        value: 1,
        percent: 10,
        icon: 'fa-solid fa-house-circle-check',
        background: '#c0a499'
    },

];

function CardDashboard() {
    const { Title, Text } = Typography;

    return (
        <>
            <div className="row mx-0">
                {data.map(item => (
                    <div className="col-xl-4 col-lg-4">
                        <CardsWidget
                            className=' mb-3 mb-xl-5'
                            description={`${item.title}`}
                            color={`${item.background}`}
                            mainNumber={item.value}
                            percentage={`${item.percent}%`}
                            icon={`${item.icon}`}
                        />
                    </div>
                ))}

            </div>


        </>
    );
}

export default CardDashboard;
