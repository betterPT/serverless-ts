import { handlerPath } from '@libs/handler-resolver';

export const getAllThings = {
    handler: `${handlerPath(__dirname)}/handlers.getAllThings`,
    events: [
        {
            http: {
                method: 'get',
                path: 'thing/',
            },
        },
    ],
};

export const createThing = {
    handler: `${handlerPath(__dirname)}/handlers.createThing`,
    events: [
        {
            http: {
                method: 'post',
                path: 'thing',
            },
        },
    ],
};

export const getThing = {
    handler: `${handlerPath(__dirname)}/handlers.getThing`,
    events: [
        {
            http: {
                method: 'get',
                path: 'thing/{id}',
            },
        },
    ],
};

export const updateThing = {
    handler: `${handlerPath(__dirname)}/handlers.updateThing`,
    events: [
        {
            http: {
                method: 'post',
                path: 'thing/{id}',
            },
        },
    ],
};

export const deleteThing = {
    handler: `${handlerPath(__dirname)}/handlers.deleteThing`,
    events: [
        {
            http: {
                method: 'delete',
                path: 'thing/{id}',
            },
        },
    ],
};