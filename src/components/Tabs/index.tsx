import { clone, find, keys, map } from 'lodash';
import { ComponentProps, FunctionComponent, MouseEventHandler, useEffect, useState } from 'react';
import TabButtons from './TabButtons';
import Styled from './styled';
import ui from '../../constant/ui';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useDispatch } from 'react-redux';
import {
    addManyPlanTabs,
    addPlanTab,
    deleteTab,
    switchIsPermitDeletePlanTab,
    switchPlanTab,
} from '../../store/tabs/TabsSlice';
import DynamicContent from '../../pages/DynamicContent';
import TwoDPlan from '../Plan/TwoDPlan';
import { v4 } from 'uuid';
import { convertTabsPlanToTabsUI, omitPropFromObject } from '../../utils/helper';

const Tabs: FunctionComponent<
    Tabs.DynamicTabProps & Tabs.StaticTabProps & ComponentProps<'div'>
> = (props) => {
    // const [activePlanTabKey, setActiveTabKey] = useState<Tabs.PlanTabKey>(
    //     props.defaultActiveKey || props.items[0].key
    // );
    const activePlanTabKey = useSelector((state: RootState) => state.tabStore.activePlanTabKey);
    const activeModeTabKey = useSelector((state: RootState) => state.tabStore.activeModeTabKey);
    return (
        <Styled.Wrapper>
            <Styled.StyledTabs tabButtonsCss={props.tabButtonsCss} direction={props.direction}>
                <TabButtons
                    dynamic={props.dynamic}
                    handleClosePlanTab={
                        props.handleClosePlanTab as Tabs.DynamicTabProps['handleClosePlanTab']
                    }
                    activeModeTabKey={activeModeTabKey as Tabs.TabModeKey}
                    activePlanTabKey={activePlanTabKey as string}
                    onTabChange={props.onTabChange as Tabs.DynamicTabProps['onTabChange']}
                    items={props.items}
                ></TabButtons>
                {props.dynamic && (
                    <span
                        onClick={props.handleNewTab}
                        style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer' }}
                        className="bi bi-plus-lg add-btn font-weight-bold"
                    ></span>
                )}
                {/* {find(items, (item: Tabs.PlanTabItem) => item.key === activePlanTabKey)?.content} */}
            </Styled.StyledTabs>
        </Styled.Wrapper>
    );
};

export default Tabs;
