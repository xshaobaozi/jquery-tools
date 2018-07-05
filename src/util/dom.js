function getPosition(element) {
    let x = 0;
    let y = 0;

    if (!element.tagName) {
        console.warn('element must be a HTML element object');
        return {
            x: null,
            y: null
        };
    }

    while (element !== document.body) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }

    return {
        x: x,
        y: y
    };
}

export default {
    getPosition
}