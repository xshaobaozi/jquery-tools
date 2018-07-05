function mergeObj(obj, source) {
    let common = {};
    common = Object.keys(obj).reduce((pre, cur) => {
        let module = {};
        // if (typeof obj[cur] == 'object') {
            // module[cur] = mergeObj(obj[cur], source[cur])
        // } else {
            module[cur] = Object.assign({}, obj[cur], source[cur])
        // }
        return Object.assign(pre, module)
    }, {})
    return common;
};

function JSONparse(val) {
    return JSON.parse(JSON.stringify(val));
};
export default {
    mergeObj,
    JSONparse
}