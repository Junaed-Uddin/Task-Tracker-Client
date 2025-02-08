import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { DarkModeProvider } from '../contexts/DarkModeContext';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
    const { theme } = useContext(DarkModeProvider);

    return (
        <div className={`${theme}`}>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;