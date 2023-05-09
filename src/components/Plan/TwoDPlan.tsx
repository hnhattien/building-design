import Konva from "konva";
import React, {
  EventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";
import { useWindowSize } from "../../lib/hooks";
import { Layer, Line, Stage } from "react-konva";
import { get, range, slice } from "lodash";
import { Vector2d } from "konva/lib/types";
import {
  distance,
  getClosedPointOnPath,
  getWallIfPointIsOnWall,
  isPointIsOnPath,
} from "../../utils/math";
import CircleMouse from "../CircleMouse";
import { KonvaEventObject } from "konva/lib/Node";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { addWall, deleteWall } from "../../store/tabs/TabsSlice";
import {
  createStartPoint,
  emptyStartPoint,
  switchDesignMode,
} from "../../store/2d/TwoDPlanSlice";
import plan from "../../constant/plan";
import { convertWallToPointArray } from "../../utils/helper";

const lineConfig: Konva.LineConfig = {
  strokeWidth: 6,
  stroke: "#6c757d",
};

const TwoDPlan: FunctionComponent<Plan.TwoDPlanProps> = (props) => {
  const { width, height } = useWindowSize();
  const [gutter, setGutter] = useState(20);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const horizontalLines = [];
  const verticalLines = [];
  const [fakeWall, setFakeWall] = useState<UserInput.Wall | null>(null);
  // const [polygons, setPolygons] = useState<number[][]>([]);
  const activePlanTabKey = useSelector(
    (state: RootState) => state.tabStore.activePlanTabKey
  );
  const currentPlanTab = useSelector(
    (state: RootState) => state.tabStore.planTabs[activePlanTabKey]
  );
  const currentMode = useSelector(
    (state: RootState) => state.twoDPlanStore.currentMode
  );
  // const fakePoints = useSelector((state: RootState) => state.twoDPlanStore.fakePoints);
  const startPoint = useSelector(
    (state: RootState) => state.twoDPlanStore.startPoint
  );
  const dispatch = useDispatch();
  const isDrawMode = () => currentMode === plan.WALL_ACTION_MODE.DRAW;
  const isMoveMode = () => currentMode === plan.WALL_ACTION_MODE.MOVE;
  const isDeleteMode = () => currentMode === plan.WALL_ACTION_MODE.DELETE;
  const isIdleMode = () => currentMode === plan.WALL_ACTION_MODE.IDLE;

  const changeWallDesignMode = (mode: Plan.WallActionMode) => {
    dispatch(switchDesignMode(mode));
  };
  const createStartPointAction = (point: Plan.Point2D) => {
    dispatch(createStartPoint(point));
  };
  const deleteWallAction = (wallId: Plan.Wall["_id"]) => {
    dispatch(deleteWall({ wallId }));
  };
  const createFakeWallAction = (wall: UserInput.Wall) => {
    setFakeWall(wall);
  };
  const addWallAction = (
    wall: PartialBy<Plan.Wall, "_id">,
    callback?: (...args: any[]) => void
  ) => {
    dispatch(addWall(wall));
    if (callback?.call) {
      callback();
    }
  };
  const emptyFakeWallAction = () => {
    setFakeWall(null);
  };

  const emptyStartPointAction = () => {
    dispatch(emptyStartPoint());
  };
  useEffect(() => {
    if (isIdleMode()) {
      emptyStartPointAction();
      emptyFakeWallAction();
    }
  }, [currentMode]);
  const switchToIdleMode = () => {
    changeWallDesignMode("IDLE");
  };
  const handleClick = (ev: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = ev.target.getStage()?.getPointerPosition() as Vector2d;
    if (isDrawMode()) {
      if (!startPoint) {
        createStartPointAction({ x, y });
      } else if (distance(startPoint.x, startPoint.y, x, y) < 10) {
        emptyStartPointAction();
        changeWallDesignMode(plan.WALL_ACTION_MODE.IDLE);
      } else {
        const targetWall = getWallIfPointIsOnWall(currentPlanTab.walls, {
          x,
          y,
        });
        console.log(targetWall);
        if (targetWall) {
          if (
            distance(targetWall.start.x, targetWall.start.y, x, y) <
            plan.TOLERANCE
          ) {
            addWallAction({
              start: startPoint,
              end: { x: targetWall.start.x, y: targetWall.start.y },
            });
          } else if (
            distance(targetWall.end.x, targetWall.end.y, x, y) < plan.TOLERANCE
          ) {
            addWallAction({
              start: startPoint,
              end: { x: targetWall.end.x, y: targetWall.end.y },
            });
          } else {
            const closestPointWithWall = getClosedPointOnPath(targetWall, {
              x,
              y,
            });
            addWallAction({
              start: startPoint,
              end: closestPointWithWall,
            });
          }

          changeWallDesignMode(plan.WALL_ACTION_MODE.IDLE);
        } else {
          const wall: UserInput.Wall = {
            start: {
              x: startPoint.x,
              y: startPoint.y,
            },
            end: {
              x,
              y,
            },
          };
          addWallAction(wall);
          createStartPointAction({ x, y });
        }
      }
    } else if (isDeleteMode()) {
      const walls = currentPlanTab.walls;
      const targetWall = getWallIfPointIsOnWall(currentPlanTab.walls, {
        x,
        y,
      });
      if (targetWall) {
        deleteWallAction(targetWall._id);
      }
    }
  };

  const handleMouseMove = (ev: Konva.KonvaEventObject<MouseEvent>) => {
    const { x, y } = ev.target.getStage()?.getPointerPosition() as Vector2d;
    // console.log(x, y);
    if (isDrawMode()) {
      if (startPoint) {
        if (distance(startPoint.x, startPoint.y, x, y) <= 10) {
          emptyFakeWallAction();
        } else {
          createFakeWallAction({
            start: {
              x: startPoint.x,
              y: startPoint.y,
            },
            end: {
              x,
              y,
            },
          });
        }
      }
    }
  };
  for (let i = 0; i <= width; i += gutter) {
    verticalLines.push(
      <Line
        key={`v-${i}`}
        points={[i, 0, i, height]}
        stroke="#ccc"
        strokeWidth={1}
        lineCap="round"
        lineJoin="round"
      ></Line>
    );
  }

  for (let i = 0; i <= height; i += gutter) {
    horizontalLines.push(
      <Line
        key={`h-${i}`}
        points={[0, i, width, i]}
        stroke="#ccc"
        strokeWidth={1}
        lineCap="round"
        lineJoin="round"
      ></Line>
    );
  }

  return (
    <div id="container">
      <CircleMouse position={mousePosition}></CircleMouse>
      <button
        onClick={() => {
          changeWallDesignMode("DRAW");
        }}
      >
        Draw
      </button>
      <button
        onClick={() => {
          changeWallDesignMode(plan.WALL_ACTION_MODE.DELETE);
        }}
      >
        Delete
      </button>
      <span>Current Mode: {currentMode}</span>
      <Stage
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        width={width}
        height={height}
        style={{ maxWidth: "100%" }}
      >
        <Layer>
          {verticalLines.concat(horizontalLines)}
          {currentPlanTab &&
            currentPlanTab.walls.map((wall, index) => {
              const points = [
                wall.start.x,
                wall.start.y,
                wall.end.x,
                wall.end.y,
              ];
              return (
                <Line
                  {...lineConfig}
                  key={index}
                  points={points}
                  tension={0}
                ></Line>
              );
            })}
          {fakeWall && (
            <Line
              {...lineConfig}
              points={convertWallToPointArray(fakeWall)}
              tension={0}
            ></Line>
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default TwoDPlan;
