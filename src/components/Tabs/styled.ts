import styled, { StyledComponent } from 'styled-components';
import { styleToString } from '../../utils/helper';
const StyledTabs = styled.div<Partial<Tabs.TabsProps>>`
    display: flex;
    align-items: center;
    .nav-link {
        border-radius: 0;
    }
    .nav {
        flex-direction: ${(props) => (props.direction === 'vertical' ? 'column' : 'row')};
    }
    li {
        ${(props) => props.tabButtonsCss && styleToString(props.tabButtonsCss)}
    }
`;
const Wrapper = styled.div`
    .add-btn {
        cursor: pointer;
    }
`;
const TabContent = styled.div``;
const TabButtons = styled.ul`
    li {
        position: relative;
        cursor: pointer;
        .icon {
            position: absolute;
        }
    }
`;
export default {
    StyledTabs,
    Wrapper,
    TabContent,
    TabButtons,
};
