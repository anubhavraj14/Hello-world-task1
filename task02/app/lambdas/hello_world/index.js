exports.handler = async (event) => {
    const { path, httpMethod } = event;

    if (path === '/hello' && httpMethod === 'GET') {
        const response = {
            statusCode: 200,
            message: 'Hello from Lambda',
        };
        return response;
    } else {
        const errorResponse = {
            statusCode: 400,
            message: `Bad request syntax or unsupported method. Request path: ${path}. HTTP method: ${httpMethod}`,
        };
        return errorResponse;
    }
};

