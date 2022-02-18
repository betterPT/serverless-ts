import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import ThingService from "./service";

const dynamoDBClient = (): DocumentClient => {
  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: "us-west-2",
      endpoint: "http://localhost:8000",
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};

const thingService = new ThingService(dynamoDBClient());

export default thingService;

