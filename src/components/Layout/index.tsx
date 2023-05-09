import { FunctionComponent } from 'react';
import Header from './Header';
import PlanModeManagement from '../PlanModeManagement';
import SideBar from '../SideBar';

const Layout: FunctionComponent<React.ComponentProps<'div'>> = ({ children }) => {
    return (
        <div className="App">
            <Header></Header>
            <div className="main-content" style={{ display: 'flex' }}>
                <SideBar>
                    <PlanModeManagement />
                </SideBar>
                {children}
            </div>
        </div>
    );
};

export default Layout;
