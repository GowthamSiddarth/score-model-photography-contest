const messageResponse = (success, message, status = 200) => {
    return { status: status, success: success, message: message };
};

const objectResponse = (success, obj, status = 200) => {
    return Object.assign(obj, { status: status, success: success });
};

module.exports = {
    messageResponse,
    objectResponse
};