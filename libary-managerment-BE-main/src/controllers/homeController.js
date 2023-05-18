
const getLoginPage = (req, res) => {
    let indexUrl = __dirname.replace('\\controllers', '\\views')
    return res.sendFile(indexUrl + '/index.html');
}

module.exports = {
    getLoginPage
}