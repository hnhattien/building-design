export {};
declare global {
    export type Nullable<T> = T | null | undefined;
    export type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
}
