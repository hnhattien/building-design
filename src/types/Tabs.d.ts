import { CSSProperties, DOMAttributes, ReactNode } from 'react';

declare global {
    declare namespace Tabs {
        export type TabModeKey = 'TWO_D' | 'THREE_D' | 'FURNITURE';
        export interface PlanTabItem {
            key: string;
            label: React.ReactNode | string;
            content: TabPlanContent;
        }
        export interface ModeTabItem {
            key: TabModeKey;
            label: React.ReactNode | string;
            content: TabPlanContent;
        }
        export type TabPlanItem = Omit<PlanTabItem, 'label'>;

        export type CloseTabHandler = { (tabKey: string): void };
        export type TabChangeHandler = { (selectedKey: string): void };
        export type NewTabHandler = { (): void };

        export interface TabsProps {
            defaultActiveKey?: string | undefined;
            items: PlanTabItem[] | ModeTabItem[];
            direction?: 'vertical' | 'horizontal';
            tabButtonsCss?: CSSProperties;
            css?: CSSProperties;
            tabContentCss?: CSSProperties;
            dynamic?: boolean;
            iconHtml?: ReactNode;
        }
        export type TabEventHandler = {
            handleClosePlanTab?: CloseTabHandler;
            handleNewTab?: NewTabHandler;
            onTabChange?: TabChangeHandler;
        };
        export type StaticTabProps = {
            onTabChange?: TabChangeHandler;
        } & TabsProps;

        export type DynamicTabProps = {
            handleClosePlanTab?: CloseTabHandler;
            handleNewTab?: NewTabHandler;
            onTabChange?: TabChangeHandler;
        } & TabsProps;
        export interface TabButtonsProps extends TabEventHandler {
            items: PlanTabItem[];
            activePlanTabKey: string | undefined;
            activeModeTabKey: TabModeKey | undefined;
            dynamic?: boolean;
        }

        export type PlanTabKey = string;
        export type TabsPlan = {
            [p: PlanTabKey]: TabPlanContent;
        };
        export interface TabPlanContent {
            walls: Plan.Wall[];
            rooms: Plan.Room[];
            corners: Plan.Corner[];
        }
    }
}
