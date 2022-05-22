import { QueryBuilder, WaterlinePromise, CRUDBuilder, Model, UpdateBuilder, Callback } from "waterline";


type AddToCollectionMember<T> = WaterlinePromise<T> & {
    members(childIds: string[] | number[]): WaterlinePromise<T>;
}

/**
 *  Custom types for Waterline Model
 */
export default interface WaterlineModel<T> {
    create?(params: any): CRUDBuilder<T>;
    create?(params: any[]): CRUDBuilder<T[]>;
    createEach?(params: any[]): CRUDBuilder<T[]>;

    find?(criteria?: any): QueryBuilder<T[]>;
    findOne?(criteria?: any): QueryBuilder<T>;
    findOrCreate?(criteria?: any, values?: any): QueryBuilder<T>;

    update?(criteria: any, changes: any): UpdateBuilder<T[]>;
    update?(criteria: any, changes: any[]): UpdateBuilder<T[]>;
    updateOne?(criteria: any, changes: any[]): UpdateBuilder<T[]>;

    addToCollection?(id: string | number, association: string): AddToCollectionMember<T[]>

    destroy?(criteria: any): CRUDBuilder<T[]>;
    destroy?(criteria: any[]): CRUDBuilder<T[]>;
    destroyOne?(criteria: any[]): CRUDBuilder<T[]>;

    count?(criteria?: any): WaterlinePromise<number>;
    count?(criteria: any[]): WaterlinePromise<number>;

    query(sqlQuery: string, cb: Callback<any>): void;
    query(sqlQuery: string, data: any, cb: Callback<any>): void;
    native(cb: (err: Error, collection: any) => void): void;

    stream?(criteria: any, writeEnd: any): NodeJS.WritableStream | Error;
}
