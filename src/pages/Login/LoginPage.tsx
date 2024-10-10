import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CardHouse from '../../component/CardItem/CardHouse';
function LoginPage() {
    return (
        <>
            <div>Trang Login</div>
            <div>
                <CardHouse />
            </div>
        </>
    );
}

export default LoginPage;
