import React, { FunctionComponent, useState } from 'react';

import { v4 } from 'uuid';

import Tabs from '../Tabs';
import Styled from './styled';
import { useDispatch } from 'react-redux';
import { switchModeTab } from '../../store/tabs/TabsSlice';
const PlanModeManagement: FunctionComponent = () => {
    const defaultItems: Tabs.ModeTabItem[] = [
        {
            label: (
                <div className="plan-mode-wrapper">
                    <div className="plan-mode">
                        <img src="/thumbnail/2d-icon.png" />
                        <span className="title">2D</span>
                    </div>
                </div>
            ),
            key: 'TWO_D',
            content: {
                walls: [],
                corners: [],
                rooms: [],
            },
        },
        {
            label: (
                <div className="plan-mode-wrapper">
                    <div className="plan-mode">
                        <img src="/thumbnail/3d-icon.png" />
                        <span className="title">3D</span>
                    </div>
                </div>
            ),
            key: 'THREE_D',
            content: {
                walls: [],
                corners: [],
                rooms: [],
            },
        },
        {
            label: (
                <div className="plan-mode-wrapper">
                    <div className="plan-mode">
                        <img src="/thumbnail/furniture-icon.png" />
                        <span className="title">Furniture</span>
                    </div>
                </div>
            ),
            key: 'FURNITURE',
            content: {
                walls: [],
                corners: [],
                rooms: [],
            },
        },
    ];
    const [items, setItems] = useState(defaultItems);
    const dispatch = useDispatch();
    const onTabChange = (selectedKey: Tabs.TabModeKey | string) => {
        dispatch(switchModeTab(selectedKey as Tabs.TabModeKey));
    };
    return (
        <Styled.Wrapper>
            <Styled.StyledPlanMode>
                <Tabs
                    onTabChange={onTabChange}
                    tabButtonsCss={{}}
                    items={items}
                    defaultActiveKey={items[0].key}
                    direction="vertical"
                ></Tabs>
            </Styled.StyledPlanMode>
        </Styled.Wrapper>
    );
};

export default PlanModeManagement;
