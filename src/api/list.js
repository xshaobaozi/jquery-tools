let PREFIX = '';
if(process.env.NODE_ENV =='production'){
    PREFIX = '//xxx.com/'
} else {
    PREFIX = '//xxx.dev.com/'
}
let url = {
    getPhotoDates: `${PREFIX}xxx`,

}

export default {
    getPhotoDates(data, params) {
        // return this.mock({
        //     code: 0,
        //     data: {
        //         }
        //     }
        // }, 0)
        return this.fetch({methods: 'get', url: url.getPhotoDates, data: data, params: params})
    }
}


function random(val = 1000) {
    return parseInt(Math.random() * val);
};

function setImg() {
    const list = [
        'http://imgs.aixifan.com/content/2018_05_09/1525901595.png',
        'http://imgs.aixifan.com/content/2018_05_08/1525766918.gif',
        'http://imgs.aixifan.com/content/2018_05_09/1525870190.png'
    ];
    return list[parseInt(random(2))];
};

function setName() {
    const list = [
        'xxshaobaozi',
        '路修·Vi·不列颠尼亚',
        '尤菲米亚·Li·布里塔尼亚',
        '路修·Vi·不列颠尼亚 && 尤菲米亚·Li·布里塔尼亚路修·Vi·不列颠尼亚'
    ];
    return list[parseInt(random(3))];
}
