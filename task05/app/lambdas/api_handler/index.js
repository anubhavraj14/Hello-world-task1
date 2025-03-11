exports.handler = async (event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};


const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.TARGET_TABLE || "Events"; // Uses alias

exports.handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        // Validate request
        if (!body.principalId || !body.content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Invalid request payload" }),
            };
        }

        // Create event object
        const newEvent = {
            id: uuidv4(),
            principalId: body.principalId,
            createdAt: new Date().toISOString(),
            body: body.content,
        };

        // Save event to DynamoDB
        await dynamoDB.put({
            TableName: TABLE_NAME,
            Item: newEvent
        }).promise();

        // Return response
        return {
            statusCode: 201,
            body: JSON.stringify({ event: newEvent }),
        };
    } catch (error) {
        console.error("Error processing request:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
