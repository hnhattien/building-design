declare namespace Plan {
    export type ThreeDPlanProps = {};
    export type TwoDPlanProps = {};
    export type Point2D = { x: number; y: number };
    export type WallActionMode = 'DRAW' | 'DELETE' | 'MOVE' | 'IDLE';
    export type Wall = {
        _id: string;
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
    };
    export type Room = {
        _id: string;
        corners: Corner[];
    };
    export type Corner = {
        _id: string;
        x: number;
        y: number;
        walls: [Wall, Wall] | [Wall];
    };
    export interface TwoD {
        walls: Wall[];
    }
    export interface ThreeD {}
}
