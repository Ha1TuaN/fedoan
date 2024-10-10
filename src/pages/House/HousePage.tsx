import { useSelector } from 'react-redux';
import SearchHouse from '../../component/SearchHouse/SearchHouse';
import NavLayout from '../../layouts/NavLayout/NavLayout';
import './House.scss';
import { RootState } from '../../lib/redux/store';
import { IntegerStep, DecimalStep } from './Slider';
import FilterHouse from '../../component/FilterHouse/FilterHouse';

function HousePage() {
    const dataSearch = useSelector((state: RootState) => state.searchHouse);

    return (
        <>
            <NavLayout backgroundHeader="#fff" color="#000" />
            <div className="search-house1">
                <SearchHouse isCommune={true} />
            </div>
            <div className="row" style={{ margin: '50px 150px' }}>
                <div className="col-xl-10">
                    <h3>Cho thuê phòng trọ tại : {dataSearch.ward}</h3>
                </div>
                <div className="col-xl-2">
                    <FilterHouse />
                </div>
            </div>
            {/* <div style={{ margin: '50px' }}>
                <div style={{ display: 'flex' }}>
                    <b style={{ width: '20%' }}>Giá(triệu) : </b>
                    <div style={{ width: '90%', marginLeft: '10px' }}>
                        <IntegerStep />
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <b style={{ width: '20%' }}>Diện tích(mét vuông) : </b>
                    <div style={{ width: '90%', marginLeft: '10px' }}>
                        <DecimalStep />
                    </div>
                </div>
            </div> */}
        </>
    );
}

export default HousePage;
