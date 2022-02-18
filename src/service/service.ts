import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Thing from '../dynamo/thing';

export default class ThingService {

    private tableName: string = "TodosTable2";

    constructor(private docClient: DocumentClient) { }

    async getAllThing(): Promise<Thing[]> {
        const result = await this.docClient.scan({
            TableName: this.tableName
        }).promise();

        const items = result.Items;
        return items as Thing[];
    }

    async createThing(thing: Thing): Promise<Thing> {
        await this.docClient.put({
            TableName: this.tableName,
            Item: thing
        }).promise();

        return thing;
    }

    async getThing(id: string): Promise<Thing> {
        const result = await this.docClient.get({
            TableName: this.tableName,
            Key: {
                "pk": id
            }
        }).promise();

        if (!result.Item) {
            throw new Error(`Thing with id ${id} not found`);
        }

        return result.Item as Thing;
    }

    async updateThing(id: string, thing: Thing): Promise<Thing> {
        await this.docClient.update({
            TableName: this.tableName,
            Key: {
                "pk": id
            },
            UpdateExpression: "set title = :title, description = :description",
            ExpressionAttributeValues: {
                ":title": thing.title,
                ":description": thing.description
            }
        }).promise();

        return thing;
    }

    async deleteThing(id: string): Promise<void> {
        await this.docClient.delete({
            TableName: this.tableName,
            Key: {
                "pk": id
            }
        }).promise();
    }
}