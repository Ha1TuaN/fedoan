import { useSelector } from 'react-redux';
import SearchHouse from '../../component/SearchHouse/SearchHouse';
import NavLayout from '../../layouts/NavLayout/NavLayout';
import './House.scss';
import { RootState } from '../../lib/redux/store';
function HousePage() {
    const dataSearch = useSelector((state: RootState) => state.searchHouse);
    return (
        <>
            <NavLayout backgroundHeader="#fff" color="#000" />
            <div className="search-house1">
                <SearchHouse isCommune={true} />
            </div>
            <div style={{ margin: '50px 150px' }}>
                <div className="d-flex justify-content-start">
                    <h3>Cho thuê phòng trọ tại {dataSearch.ward}</h3>
                </div>
            </div>
        </>
    );
}

export default HousePage;
