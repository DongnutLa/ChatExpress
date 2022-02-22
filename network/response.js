exports.success = (req, res, msg, status) => {
    res.status(status || 200).send({
        "error": '',
        "message": msg
    });
}

exports.error = (req, res, msg, status, details) => {
    console.error('[Response error] ' + details)
    res.status(status || 500).send({
        "error": msg,
        "message": '',
    });
}
