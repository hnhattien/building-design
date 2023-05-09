declare namespace UserInput {
    export type Wall = PartialBy<Plan.Wall, '_id'>;
    export type Corner = PartialBy<Plan.Corner, '_id'>;
    export type Room = PartialBy<Plan.Room, '_id'>;
}
