// 成功
exports.success = (res, data = {}, message = 'ok') => {
    res.send({
        status: 200,
        message,
        data
    });
};

// 失败
exports.error = (res, status, error, data = {}) => {
    let message = '';

    message = typeof error === 'string' ? error : error.message;

    res.send({
        status,
        message,
        data
    });
};