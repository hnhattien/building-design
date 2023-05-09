import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tabs from './components/Tabs';
import DynamicContent from './pages/DynamicContent';
import Layout from './components/Layout';
import TwoDPlan from './components/Plan/TwoDPlan';
import ThreeDPlan from './components/Plan/ThreeDPlan';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
    const planMode = useSelector((state: RootState) => state.tabStore.activeModeTabKey);
    const PlansByMode: Record<Tabs.TabModeKey, JSX.Element> = {
        TWO_D: <TwoDPlan />,
        THREE_D: <ThreeDPlan />,
        FURNITURE: <ThreeDPlan />,
    };
    return <Layout>{PlansByMode[planMode]}</Layout>;
}

export default App;
