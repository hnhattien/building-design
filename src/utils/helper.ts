import { clone, isArray, keys, map, omit } from 'lodash';
import { CSSProperties } from 'react';

const styleToString = (style: { [p: string]: any }) => {
    return Object.keys(style).reduce(
        (acc, key) =>
            acc +
            key
                .split(/(?=[A-Z])/)
                .join('-')
                .toLowerCase() +
            ':' +
            style[key] +
            ';',
        ''
    );
};

const convertTabsPlanToTabsUI = (allTabsPlan: Tabs.TabsPlan, sample: Tabs.PlanTabItem) => {
    const allTabs: Tabs.PlanTabItem[] = map(keys(allTabsPlan), (key) => {
        return {
            key: key,
            label: sample.label,
            content: allTabsPlan[key],
        };
    });

    return allTabs;
};

function omitPropFromObject<
    T extends { [p: string | symbol]: any } | { [p: string | symbol]: any }[]
>(
    source: T,
    omitedKeys: T extends { [p: string | symbol]: any }[] ? (keyof T[number])[] : (keyof T)[]
) {
    if (isArray(source)) {
        let newSource = [];
        newSource = source.map((obj) => {
            for (let i = 0; i < omitedKeys.length; i++) {
                const omitKey = omitedKeys[i];
                return omit(obj, omitKey);
            }
        });
        return newSource;
    } else {
        let newSource = {};
        for (let i = 0; i < omitedKeys.length; i++) {
            const omitKey = omitedKeys[i];
            newSource = omit(source, omitKey);
        }
        return newSource;
    }
}

const convertWallToPointArray = (wall: UserInput.Wall) => {
    return [wall.start.x, wall.start.y, wall.end.x, wall.end.y];
};
export { styleToString, convertWallToPointArray, convertTabsPlanToTabsUI, omitPropFromObject };
