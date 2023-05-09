import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import plan from '../../constant/plan';

interface TwoDPlanState {
    currentMode: Plan.WallActionMode;
    startPoint: Plan.Point2D | null; // if x1 vs x2 is same point on coordinate then it don't be add to line
}
const initialState: TwoDPlanState = {
    currentMode: plan.WALL_ACTION_MODE.IDLE,
    startPoint: null,
};

export const TwoDPlanSlice = createSlice({
    name: 'twoDPlanStore',
    initialState,
    reducers: {
        createStartPoint: (state, action: PayloadAction<Plan.Point2D>) => {
            if (state.currentMode === plan.WALL_ACTION_MODE.DRAW) {
                state.startPoint = action.payload;
            }
        },
        switchDesignMode: (state, action: PayloadAction<Plan.WallActionMode>) => {
            state.currentMode = action.payload;
        },
        emptyStartPoint: (state, action: PayloadAction) => {
            state.startPoint = null;
        },
    },
});

const { switchDesignMode, createStartPoint, emptyStartPoint } = TwoDPlanSlice.actions;

const twoDPlanReducer = TwoDPlanSlice.reducer;

export { twoDPlanReducer, createStartPoint, switchDesignMode, emptyStartPoint };
