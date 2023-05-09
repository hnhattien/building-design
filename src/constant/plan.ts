const Canvas_SIZE = {
    width: '100%',
    height: 'auto',
};
const PLAN_MODE: Record<Tabs.TabModeKey, Tabs.TabModeKey> = {
    TWO_D: 'TWO_D',
    THREE_D: 'THREE_D',
    FURNITURE: 'FURNITURE',
};
const WALL_ACTION_MODE: Record<Plan.WallActionMode, Plan.WallActionMode> = {
    DRAW: 'DRAW',
    MOVE: 'MOVE',
    DELETE: 'DELETE',
    IDLE: 'IDLE',
};
const TOLERANCE = 10;
export default { Canvas_SIZE, PLAN_MODE, WALL_ACTION_MODE, TOLERANCE };
