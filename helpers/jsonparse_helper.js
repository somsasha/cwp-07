module.exports = tryparse;

function tryparse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return "null";
    }
}