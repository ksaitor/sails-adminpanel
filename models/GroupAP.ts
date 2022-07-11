import WaterlineModel from "../interfaces/waterlineModel";
import WaterlineEntity from "../interfaces/waterlineORM";
import UserAP from "./UserAP";

let attributes = {

    id: {
        type: 'number',
        autoIncrement: true
    },
    name: {
        type: "string",
        required: true,
        unique: true
    } as unknown as string,
    description: "string",
    tokens: {
        type: "json"
    } as unknown as string[],
    users: {
        collection: "userap",
        via: "groups"
    } as unknown as UserAP[]

};

type attributes = typeof attributes & WaterlineEntity;
interface GroupAP extends attributes {}
export default GroupAP;

let model = {
    beforeCreate: (item, next) => {
        return next();
    }

};

module.exports = {
    primaryKey: "id",
    attributes: attributes,
    ...model,
};

declare global {
    const GroupAP: typeof model & WaterlineModel<GroupAP>;
}

