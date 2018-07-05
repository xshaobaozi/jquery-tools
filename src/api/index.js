import apis from './list'


// 整合api
function mergeAPI(api) {
    let common = Object.keys(api).reduce((pre, cur) => {
        let module = {};
        if(typeof api[cur] == 'object'){
            module[cur] = mergeAPI(api[cur]);
        }else{
            module[cur] = new ajax(api[cur])
        }
        return Object.assign(pre, module)
    }, {})

    return common;
};

// 封装api方法
function ajax(options) {
    let _done = function(){};
    let _fail = function(){};
    let _aways = function(){};

    this.fetch = function(options) {
        mergeMethod(options)
            .then(res => {
                if(res.statusText == 'OK' ||  res.code == 0 || res.code == 'OK' || res.result == 0){
                    _done(res)
                }else{
                    _fail(res)
                }
                return res
            })
            .then(res => {
                _aways(res)
            })
            .catch(res => {
                _fail(res)
            })
        return this;
    };

    this.done = function(cb) {
        cb && (_done = cb);
        return this;
    };

    this.fail = function(cb) {
        cb && (_fail = cb);
        return this;
    };

    this.always = function(cb) {
        cb && (_aways = cb);
        return this;
    }

    this.mock = function(options, delay = 2000) {
        new Promise((resolve, reject) => {
            if(options.code === 0 || options.code == 'OK'){
                setTimeout(() => {
                    options.time && (options.data.serverTime = options.time);
                    resolve(options.data)
                }, delay)
            }else{
                setTimeout(() => {
                    reject(options.data)
                }, delay)
            }
        })
            .then(res => _done(res))
            .catch(res => _fail(res))
            .then(res => {
                _aways(res)
            })
        return this;
    }

    function mergeMethod({methods, url, data, params}) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: methods,
                url: url,
                data: data,
                dataType: 'jsonp',
            })
            .done((res) => {
                resolve(res)
            })
            .fail((err, data, xhr,k) => {
                console.log('err------------')
                resolve(data)
            })
        })
    }
    return options.bind(this)
}

export default mergeAPI(apis)