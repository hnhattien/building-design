import React, { FunctionComponent, useState } from 'react';
import Styled from './styled';
import Tabs from '../../Tabs';
import DynamicContent from '../../../pages/DynamicContent';
import { v4 } from 'uuid';
import PlanTabManagement from '../../PlanTabManagement';
const Header: FunctionComponent<Layout.HeaderProps> = () => {
    return (
        <Styled.Wrapper>
            <Styled.StyledHeader>
                <PlanTabManagement />
            </Styled.StyledHeader>
        </Styled.Wrapper>
    );
};

export default Header;
