function Select({cls, data, select, cb, check}) {
    const that = this;
    this.cb = cb;
    this.cls = $(`${cls}`);
    this.isFirst = true;
    data.forEach(item => {
        if (item.type == check) {
            this.setText(item.desc)
        }
    })

    // this.addEl();
    
    this.cls.unbind('click').bind('click', function() {
        let list = '';
        data.forEach((item, i) => {
            if(check - 1 == i){
                list+= `<div class="xb_select_item check" data-type="${item.type}">${item.desc}</div>`;
            }else{
                list+= `<div class="xb_select_item" data-type="${item.type}">${item.desc}</div>`;
            }
        });
        if (!that.isFirst) {
            if (that.isShow) {
                that.removeEl();
            }
            else{
                $(this).append(`<div class="xb_select_list">${list}</div>`);
                that.addEl();
            }
        }else{
            $(this).append(`<div class="xb_select_list">${list}</div>`);
            that.addEl();
            that.isFirst = false;
        }

        setTimeout(() => {
            $('.xb_select_item')
                .unbind('click')
                .on('click', function(e) {
                    e.stopPropagation();

                    let type = $(this).data('type');
                    
                    $(this)
                        .addClass('check')
                        .data('type')
                    $(this)
                        .siblings()
                        .removeClass('check');

                    that.removeEl();

                    that.setText(data[type - 1].desc);
                    check = type;
                    cb && cb(type);
                })
        }, 500);
        select && select();
    })

    $('body').bind('click', e => {
        if (!this.isShow) {
            return true
        }
        let count = 0;
        let el = e.target;
        let cls = e.target.className;
        if (!cls) {
            this.removeEl();
        }else{
            while (count < 3) {
                if (/xb_select/.test(cls)) {
                    count = 999;
                }else{
                    count++;
                }
                cls = el.parentElement.className;
                el = el.parentElement;
            }
            if(count !== 999){
                this.removeEl();
            }
        }
    })
}

Select.prototype = {
    setText: function(desc) {
        this.cls.html(`<div class="select">${desc}</div>`)
    },
    removeEl: function() {
        this.isShow = false;
        this.cls.removeClass('isShow');
        $('.xb_select_list').remove();
    },
    addEl: function() {
        this.isShow = true;
        this.cls.addClass('isShow');
    }
}

module.exports = Select