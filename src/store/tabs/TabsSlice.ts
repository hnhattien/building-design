import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { assign, clone, find, findIndex, indexOf, keys, pick, pickBy } from 'lodash';
import { ReactNode } from 'react';
import plan from '../../constant/plan';
import { v4 } from 'uuid';
import { isSamePoint } from '../../utils/math';

interface TabsState {
    activePlanTabKey: Tabs.PlanTabKey;
    activeModeTabKey: Tabs.TabModeKey;
    planTabs: Tabs.TabsPlan;
    // currentPlanTab: Tabs.TabPlanContent;
    isPermitDeletePlanTab: boolean;
}

const initialState: TabsState = {
    activePlanTabKey: '',
    activeModeTabKey: plan.PLAN_MODE.TWO_D,
    planTabs: {},
    // currentPlanTab: {
    //     walls: [],
    //     corners: [],
    //     rooms: [],
    // },
    isPermitDeletePlanTab: true,
};

export const tabsSlice = createSlice({
    name: 'tabStore',
    initialState,
    reducers: {
        switchPlanTab: (state, action: PayloadAction<Tabs.PlanTabKey>) => {
            console.log(action.payload, 'payload action');
            state.activePlanTabKey = action.payload;
            // state.currentPlanTab = state.planTabs[action.payload];
        },
        addPlanTab: (state, action: PayloadAction<Tabs.TabPlanItem>) => {
            console.log(action.payload);
            state.planTabs = Object.assign(state.planTabs, {
                [action.payload.key]: action.payload.content,
            });
        },
        addManyPlanTabs: (state, action: PayloadAction<Tabs.TabPlanItem[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const newTab = action.payload[i];
                state.planTabs[newTab.key] = newTab.content;
            }
        },
        switchIsPermitDeletePlanTab: (state) => {
            if (keys(state.planTabs).length > 1) {
                state.isPermitDeletePlanTab = true;
            } else {
                state.isPermitDeletePlanTab = false;
            }
        },
        deleteTab: (state, action: PayloadAction<Tabs.PlanTabKey>) => {
            if (state.isPermitDeletePlanTab) {
                delete state.planTabs[action.payload];
            }
        },
        addCorner: (state, action: PayloadAction<UserInput.Corner>) => {
            const addedCorner = action.payload;
            const pointA = { x: addedCorner.x, y: addedCorner.y };

            const corners = state.planTabs[state.activePlanTabKey].corners;
            const isExistedCorner =
                findIndex(corners as Plan.Corner[], (el: Plan.Corner) => {
                    const pointB = pick(el, ['x', 'y']);
                    return isSamePoint(pointA, pointB);
                }) >= 0;
            if (!isExistedCorner) {
                if (!addedCorner._id) {
                    addedCorner._id = v4();
                }
                state.planTabs[state.activePlanTabKey].corners.push(addedCorner as Plan.Corner);
            }
        },
        updateCorners: (state, action: PayloadAction<Plan.Wall>) => {
            const walls = state.planTabs[state.activePlanTabKey].walls;
            const addedWall = action.payload;
            const corners: UserInput.Corner[] = [];
            if (walls.length > 0) {
                for (let i = 0; i < walls.length; i++) {
                    const wall = walls[i];
                    const wallStartPoint = { x: wall.start.x, y: wall.start.y };
                    const wallEndPoint = { x: wall.end.x, y: wall.end.y };
                    const addedWallStartPoint = { x: addedWall.start.x, y: addedWall.start.y };
                    const addedWallEndPoint = { x: addedWall.end.x, y: addedWall.end.y };
                    let corner: UserInput.Corner;
                    if (
                        isSamePoint(wall.end, addedWall.start) ||
                        isSamePoint(wall.start, addedWall.end)
                    ) {
                    }
                }
            } else {
                corners.push({
                    x: addedWall.start.x,
                    y: addedWall.start.y,
                    walls: [addedWall],
                });
                corners.push({
                    x: addedWall.end.x,
                    y: addedWall.end.y,
                    walls: [addedWall],
                });
            }
        },
        addWall: (state, action: PayloadAction<PartialBy<Plan.Wall, '_id'>>) => {
            if (action.payload) {
                const wall = action.payload;
                if (!wall._id) wall._id = v4();
                // state.currentPlanTab.walls.push(action.payload);
                state.planTabs[state.activePlanTabKey].walls.push(wall as Plan.Wall);
            }
        },
        addManyWalls: (state, action: PayloadAction<PartialBy<Plan.Wall, '_id'>[]>) => {
            for (let i = 0; i < action.payload.length; i++) {
                const newWall = action.payload[i];
                if (!newWall._id) newWall._id = v4();
                // state.currentPlanTab?.walls.push(newWall);
                state.planTabs[state.activePlanTabKey].walls.push(newWall as Plan.Wall);
            }
        },
        switchModeTab: (state, action: PayloadAction<Tabs.TabModeKey>) => {
            state.activeModeTabKey = action.payload;
        },
        deleteWall: (state, action: PayloadAction<{ wallId: string }>) => {
            const wallId = action.payload.wallId;
            state.planTabs[state.activePlanTabKey].walls = state.planTabs[
                state.activePlanTabKey as string
            ].walls.filter((wall) => wall._id !== wallId);
        },
    },
});

const {
    switchPlanTab,
    addPlanTab,
    addManyPlanTabs,
    addWall,
    addManyWalls,
    deleteTab,
    switchIsPermitDeletePlanTab,
    switchModeTab,
    deleteWall,
} = tabsSlice.actions;

const tabsReducer = tabsSlice.reducer;

export {
    switchPlanTab,
    tabsReducer,
    addPlanTab,
    addManyPlanTabs,
    addWall,
    addManyWalls,
    deleteTab,
    switchIsPermitDeletePlanTab,
    switchModeTab,
    deleteWall,
};
