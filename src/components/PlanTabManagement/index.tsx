import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { v4 } from 'uuid';
import Styled from './styled';
import Tabs from '../Tabs';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { clone, keys } from 'lodash';
import { convertTabsPlanToTabsUI, omitPropFromObject } from '../../utils/helper';
import {
    addManyPlanTabs,
    addPlanTab,
    deleteTab,
    switchIsPermitDeletePlanTab,
    switchPlanTab,
} from '../../store/tabs/TabsSlice';
const PlanTabManagement: FunctionComponent = (props) => {
    const items: Tabs.PlanTabItem[] = useMemo(() => {
        return [
            {
                label: <i>New Tab</i>,
                key: v4(),
                content: {
                    walls: [],
                    corners: [],
                    rooms: [],
                },
            },
            {
                label: <i>New Tab</i>,
                key: v4(),
                content: {
                    walls: [],
                    corners: [],
                    rooms: [],
                },
            },
        ];
    }, []);
    const defaultActiveKey = items[0].key;
    const activePlanTabKey = useSelector((state: RootState) => state.tabStore.activePlanTabKey);
    const allTabsPlan = useSelector((state: RootState) => state.tabStore.planTabs);
    const dispatch = useDispatch();
    const [tabItems, setTabItems] = useState<typeof items>(items);
    useEffect(() => {
        const sample = items[0];
        const allTabs = convertTabsPlanToTabsUI(allTabsPlan, sample);
        setTabItems(allTabs);
        const tabPlanItems = omitPropFromObject<Tabs.PlanTabItem[]>(
            [...tabItems],
            ['label']
        ) as Tabs.TabPlanItem[];
        console.log(tabPlanItems, 'hji');
        dispatch(addManyPlanTabs(tabPlanItems));
        onTabChange(defaultActiveKey as string);
        dispatch(switchIsPermitDeletePlanTab());
    }, []);
    useEffect(() => {
        const sample = items[0];
        const allTabs = convertTabsPlanToTabsUI(allTabsPlan, sample);
        setTabItems(allTabs);
        dispatch(switchIsPermitDeletePlanTab());
    }, [allTabsPlan]);
    const onTabChange = (selectedKey: Tabs.PlanTabKey) => {
        dispatch(switchPlanTab(selectedKey));
    };
    const handleClosePlanTab = (tabKey: Tabs.PlanTabKey) => {
        dispatch(deleteTab(tabKey));
        if (activePlanTabKey === tabKey) {
            const keyList = keys(allTabsPlan);
            console.log(keyList);
            const deleteIndex = keyList.findIndex((key) => key === tabKey);
            console.log(keyList[deleteIndex - 1], 'Switch');
            if (deleteIndex > 0) {
                onTabChange(keyList[deleteIndex - 1]);
            } else {
                onTabChange(keyList[0]);
            }
        }
    };

    const handleNewTab = () => {
        const newTabPlan = omitPropFromObject(items[0], ['label']) as Tabs.TabPlanItem;
        newTabPlan.key = v4();
        dispatch(addPlanTab(newTabPlan));
        onTabChange(newTabPlan.key);
    };
    return (
        <Styled.Wrapper>
            <Styled.StyledPlanTab>
                <Tabs
                    handleNewTab={handleNewTab}
                    onTabChange={onTabChange}
                    handleClosePlanTab={handleClosePlanTab}
                    tabButtonsCss={{
                        width: '150px',
                        maxWidth: '150px',
                        borderRight: '0.1px solid #ccc',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                    items={tabItems}
                    defaultActiveKey={items[0].key}
                    direction="horizontal"
                    dynamic={true}
                ></Tabs>
            </Styled.StyledPlanTab>
        </Styled.Wrapper>
    );
};

export default PlanTabManagement;
