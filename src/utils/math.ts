import { chunk } from 'lodash';
import plan from '../constant/plan';

const distance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.abs(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
};
const isSamePoint = (pointA: Plan.Point2D, pointB: Plan.Point2D) => {
    return distance(pointA.x, pointA.y, pointB.x, pointB.y) === 0;
};
const isPointIsOnPath = (path: UserInput.Wall, point: Plan.Point2D, tolerance = plan.TOLERANCE) => {
    const length = distance(path.start.x, path.start.y, path.end.x, path.end.y);
    const d1 = distance(path.start.x, path.start.y, point.x, point.y);
    const d2 = distance(path.end.x, path.end.y, point.x, point.y);
    const d = d1 + d2;
    return Math.abs(d - length) < tolerance;
};
const getClosedPointOnPath = (path: UserInput.Wall, point: Plan.Point2D) => {
    const x = point.x;
    const y = point.y;
    const x1 = path.start.x;
    const x2 = path.end.x;
    const y1 = path.start.y;
    const y2 = path.end.y;
    const A = x - x1;
    const B = y - y1;
    const C = x2 - x1;
    const D = y2 - y1;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    const param = dot / len_sq;

    let xx, yy;

    if (param < 0 || (x1 == x2 && y1 == y2)) {
        xx = x1;
        yy = y1;
    } else if (param > 1) {
        xx = x2;
        yy = y2;
    } else {
        xx = x1 + param * C;
        yy = y1 + param * D;
    }

    return {
        x: xx,
        y: yy,
    };
};
const getWallIfPointIsOnWall = (
    walls: Plan.Wall[],
    point: Plan.Point2D,
    tolerance = plan.TOLERANCE
) => {
    for (let i = 0; i < walls.length; i++) {
        const wall = walls[i];
        if (isPointIsOnPath(wall, point, tolerance)) {
            return wall;
        }
    }
    return null;
};
export { distance, isPointIsOnPath, getWallIfPointIsOnWall, getClosedPointOnPath, isSamePoint };
