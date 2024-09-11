import './App.scss';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routers';
import { ScrollProvider } from './lib/context/ScrollContext';

function App() {
    return (
        <>
            <Router>
                <div className="App">
                    <ScrollProvider>
                        <Routes>
                            {publicRoutes.map((route, index) => {
                                return <Route key={index} path={route.path} element={route.element} />;
                            })}
                        </Routes>
                    </ScrollProvider>
                </div>
            </Router>
        </>
    );
}

export default App;
