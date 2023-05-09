import { map } from 'lodash';
import React, { FunctionComponent } from 'react';
import Styled from './styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const TabButtons: FunctionComponent<Tabs.TabButtonsProps> = ({
    items,
    activePlanTabKey,
    onTabChange,
    dynamic,
    handleClosePlanTab,
    activeModeTabKey,
}) => {
    const isPermitDeletePlanTab = useSelector(
        (state: RootState) => state.tabStore.isPermitDeletePlanTab
    );
    return (
        <>
            <Styled.TabButtons className="nav nav-pills nav-fill tab-button-list">
                {map(items, ({ label, key }) => {
                    return (
                        <li
                            key={key}
                            data-key={key}
                            onClick={(ev) => {
                                onTabChange?.call(null, key);
                            }}
                            className="nav-item tab-button-item"
                        >
                            {key === (dynamic ? activePlanTabKey : activeModeTabKey) ? (
                                <a className="nav-link active" aria-current="page" href="#">
                                    {label}
                                </a>
                            ) : (
                                <a className="nav-link" aria-current="page" href="#">
                                    {label}
                                </a>
                            )}

                            {dynamic && (
                                <span
                                    onClick={(ev) => {
                                        ev.stopPropagation(); /* Prevent "switch tab" reducer  called twice 
                                        when user click on close icon to close tab */
                                        handleClosePlanTab?.call(null, key);
                                    }}
                                    style={{
                                        right: 0,
                                        paddingRight: '10px',
                                        padding: '10px',

                                        cursor: isPermitDeletePlanTab ? 'pointer' : 'not-allowed',
                                    }}
                                    className="icon"
                                >
                                    <i className="bi bi-x-lg"></i>
                                </span>
                            )}
                        </li>
                    );
                })}
            </Styled.TabButtons>
        </>
    );
};

export default TabButtons;
