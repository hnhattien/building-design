import { FunctionComponent } from 'react';

const SideBar: FunctionComponent<React.ComponentProps<'div'>> = ({ children }) => {
    return (
        <div
            className="side-bar"
            style={{
                width: '50px',
                height: '100vh',
                backgroundColor: 'white',
            }}
        >
            {children}
        </div>
    );
};

export default SideBar;
