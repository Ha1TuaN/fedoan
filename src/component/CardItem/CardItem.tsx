import { Card, Image } from 'antd';
import bedLogo from '../../assets/images/icon/Bed.svg';
import showerLogo from '../../assets/images/icon/Shower.svg';
import sizeLogo from '../../assets/images/icon/Size.svg';
import { getMoneyVN } from '../../utils/utils';

interface Props {
    data: any;
}

const CardItem: React.FC<Props> = ({ data }) => (
    <Card
        hoverable
        style={{ width: 300 }}
        cover={
            <Image
                style={{ width: '100%', height: '250px' }}
                src={data?.thumbnail ? data?.thumbnail : data?.imageHouse[0]?.image}
            />
        }
        actions={[
            <div>
                <img src={bedLogo} /> {data?.numberBedroom}
            </div>,
            <div>
                <img src={showerLogo} /> {data?.bathRoom}
            </div>,
            <div>
                <img src={sizeLogo} /> {data?.acreage} m2
            </div>,
        ]}
    >
        <div className="d-flex flex-column align-items-start">
            <h6 style={{ textAlign: 'left' }}>{data?.address}</h6>
            <p className="text-secondary" style={{ fontSize: '10px' }}>
                private room
            </p>
            <h6 style={{ color: '#F4511E' }}>{getMoneyVN(data?.price)} VNĐ/tháng</h6>
        </div>
    </Card>
);

export default CardItem;
