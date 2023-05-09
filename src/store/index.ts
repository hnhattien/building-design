import { applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';

import { configureStore } from '@reduxjs/toolkit';
import { tabsReducer } from './tabs/TabsSlice';
import { twoDPlanReducer } from './2d/TwoDPlanSlice';

const sagaMiddleware = createSagaMiddleware();

const middlewareEnhancer = applyMiddleware(sagaMiddleware);

const store = configureStore({
    reducer: {
        tabStore: tabsReducer,
        twoDPlanStore: twoDPlanReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(sagaMiddleware);
    },
    devTools: true,
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
