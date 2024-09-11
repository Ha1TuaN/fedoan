import logo from '../../assets/images/logo.svg';
import { Button, ConfigProvider, Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import './NavLayout.scss';
import { Link } from 'react-router-dom';
const { Header } = Layout;

interface Props {
    backgroundHeader: string;
}
const items: MenuProps['items'] = [
    {
        key: 1,
        label: (
            <Link to="/" style={{ textDecoration: 'none' }}>
                Trang chủ
            </Link>
        ),
    },
    {
        key: 2,
        label: (
            <Link to="/chu_nha" style={{ textDecoration: 'none' }}>
                Chủ nhà
            </Link>
        ),
    },
    {
        key: 5,
        label: (
            <Link to="/lien_he" style={{ textDecoration: 'none' }}>
                Liên hệ
            </Link>
        ),
    },
];
const NavLayout: React.FC<Props> = ({ backgroundHeader }) => {
    return (
        <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: `${backgroundHeader}`,
                position: 'fixed',
                width: '100%',
                zIndex: 1,
            }}
        >
            <div className="demo-logo">
                <img src={logo} alt="logoapp" />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                        Menu: {
                            horizontalItemSelectedColor: '#fff',
                            itemSelectedColor: '#fff',
                            itemPaddingInline: 25,
                            itemColor: '#ffffffe6',
                            itemHoverColor: '#fff',
                        },
                    },
                }}
            >
                <Menu
                    theme="light"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{
                        flex: 1,
                        //maxWidth: '75%',
                        display: 'flex',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        textDecoration: 'none',
                    }}
                />
            </ConfigProvider>
            <div>
                <Button type="text" size="large" className="text-light btn-background">
                    <Link to={'/login'}>Đăng nhập</Link>
                </Button>
                <Button type="text" size="large" className="text-light btn-background">
                    Đăng ký
                </Button>
            </div>
        </Header>
    );
};

export default NavLayout;
