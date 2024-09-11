import CardItem from '../../component/CardItem/CardItem';
import ListHouse from '../../component/ListHouse/ListHouse';
import SearchHouse from '../../component/SearchHouse/SearchHouse';
import { useScrollContext } from '../../lib/context/ScrollContext';
import NavLayout from '../NavLayout/NavLayout';
import './BannerLayout.scss';
function BannerLayout() {
    const { isFixed } = useScrollContext();
    return (
        <>
            <div className="bannerlayout-content">
                <NavLayout backgroundHeader={isFixed ? '#4c4b48' : 'transparent'} />
                {/* <div className={`header ${isFixed ? 'fixed' : ''}`}>
                </div> */}
                <div className="d-flex align-items-center justify-content-around" style={{ height: '100%' }}>
                    <div className="slogan">
                        <h1>
                            Tìm nhà ưng ý <br /> Thuê ngay không phí!
                        </h1>
                    </div>
                    <div>
                        <div style={{ width: '100%', padding: '10px' }}>
                            <iframe
                                width="400"
                                height="350"
                                src="https://maps.google.com/maps?width=400&amp;height=350&amp;hl=en&amp;q=H%C3%A0%20N%E1%BB%99i+()&amp;t=p&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                            >
                                <a href="https://www.gps.ie/">gps systems</a>
                            </iframe>
                        </div>
                        <div className="search-house">
                            <SearchHouse />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BannerLayout;
