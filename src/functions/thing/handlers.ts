import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { v4 } from "uuid";
import thingService from "src/service";


export const getAllThings = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const things = await thingService.getAllThing();
  return formatJSONResponse ({
      things
  })
})

export const createThing = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
      const id = v4();
      const thing = await thingService.createThing({
          id,
          title: event.body['title'],
          description: event.body['description'],
          createdAt: new Date().toISOString()
      })
      return formatJSONResponse({
          thing
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

export const updateThing = middyfy(async (event): Promise<APIGatewayProxyResult> => {
  const id = event.body.thing.id;
  try {
      const thing = await thingService.updateThing(id, event.body.thing)
      return formatJSONResponse({
          thing, id
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})

export const deleteThing = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
      const thing = await thingService.deleteThing(id)
      return formatJSONResponse({
          thing, id
      });
  } catch (e) {
      return formatJSONResponse({
          status: 500,
          message: e
      });
  }
})