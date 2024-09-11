import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface PropsType {
    isFixed: boolean;
}
interface Props {
    children: ReactNode;
}

const ScrollContext = createContext<PropsType>({ isFixed: false });

export const useScrollContext = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<Props> = ({ children }) => {
    const [isFixed, setIsFixed] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return <ScrollContext.Provider value={{ isFixed }}>{children}</ScrollContext.Provider>;
};
