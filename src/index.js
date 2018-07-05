//页码导航栏
//后续利用设置属性的方式解决请求url的问题
function Pagination(elem , currentPage, totalPage, pageFun){
    this.elem = elem;
    this.currentPage = currentPage;
    this.totalPage = totalPage;
    //若果有cb 就存起来
    if(pageFun){
        this.pageFun = pageFun;
    } else {
        this.pageFun = function(){}
    }
    this.init();
    this.eventSet();
}

Pagination.prototype = {
    constructor: Pagination,

    setCurrentPage: function(page){
        this.currentPage = page;
    },

    setTotalPage: function(page){
        this.totalPage = page;
    },

    getCurrentPage:function(){
        return this.currentPage;
    },

    prevPage:function(){
        this.currentPage--;
        var list = this.elem.find('.page .cpage');
        list.removeClass('select');
        this.pageLayout(list);
        this.pageFun(this.currentPage);
    },

    nextPage:function(){
        this.currentPage++;
        var list = this.elem.find('.page .cpage');
        list.removeClass('select');
        this.pageLayout(list);
        this.pageFun(this.currentPage);
    },

    leadPage:function(page){
        this.initleadPage(page);
        this.pageFun(this.currentPage);
    },

    initleadPage: function(page) {
        this.currentPage = page;

        var list = this.elem.find('.page .cpage');
        list.removeClass('select');
        this.pageLayout(list);
    },

    //设计思路：根据currentpage的值去控制导航栏元素的显示状态
    pageLayout:function(list){
        var dotA = this.elem.find('.dot').eq(0),
            dotB = this.elem.find('.dot').eq(1),
            prevBtn = this.elem.find('.prev'),
            nextBtn = this.elem.find('.next'),
            pagem = this.elem.find('.pagem');

        //判断上翻页下翻页是否显示
        if(this.currentPage >= 2){
            prevBtn.css('visibility','visible');
        }else{
            prevBtn.css('visibility','hidden');
        }

        if(this.currentPage == this.totalPage){
            nextBtn.css('visibility','hidden');
        }else{
            nextBtn.show();
            nextBtn.css('visibility','visible');
        }

        //主体逻辑
        if(this.totalPage <= 7){

            list.eq(this.currentPage - 1).addClass('select');

        }else{

            //判断省略号是否显示
            if(this.currentPage>=5){
                dotA.show()
            }else{
                dotA.hide()
            }

            if(this.currentPage+3 >= this.totalPage){
                dotB.hide();
            }else{
                dotB.show();
            }

            //判断当前选中页码的状态
            if (this.currentPage >=5 && this.currentPage < this.totalPage - 2){ 
                list.eq(3).addClass('select');                          
            }else if(this.currentPage >= this.totalPage - 2){
                list.eq( this.currentPage + 6 - this.totalPage).addClass('select');
            }else{
                list.eq(this.currentPage - 1).addClass('select');                               
            }

            //中部页码导航页数显示，样式为pagem
            if( (this.currentPage >=4 ) && (this.currentPage + 2 < this.totalPage) ){
                for(var i = 0; i<5; i++){
                    pagem.eq(i).text(this.currentPage-2+i);
                }                   
            }else if(this.currentPage + 2 >= this.totalPage && this.currentPage <= this.totalPage){
                for(var i = 0; i<5; i++){
                    pagem.eq(i).text(this.totalPage-5+i);
                }   
            }else if(this.currentPage <4 && this.currentPage >=1){
                for(var i = 0; i<5; i++){
                    pagem.eq(i).text(i+2);
                }                   
            }
        }       
    },

    init: function(){
        try{
            if(this.currentPage > this.totalPage) throw "err:当前页码大于总页数";
        }catch(e){
            console.log(e)
        }
        // 移除上一次事件
        //根据总页数生成导航HTML
        var str = '';
        str = '<div href="javascript:;" class="select cpage">1</div>'+
              '<div class="dot">...</div>'+
              '<div href="javascript:;" class="cpage pagem">2</div>'+
              '<div href="javascript:;" class="cpage pagem">3</div>'+
              '<div href="javascript:;" class="cpage pagem">4</div>'+
              '<div href="javascript:;" class="cpage pagem">5</div>'+
              '<div href="javascript:;" class="cpage pagem">6</div>'+
              '<div class="dot">...</div>'+
              '<div href="javascript:;" class="cpage">'+this.totalPage+'</div>';
        this.elem.find('.page').html(str); 
        if(this.totalPage <= 7){
            this.elem.find('.dot').remove();
            var len = 7 - this.totalPage;
            if(this.totalPage <= 6){
                for(var i = 0; i<len; i++){
                    this.elem.find('.cpage').last().remove();
                }
            }
        }
        // 初始化的时候 不再自动调用回调
        this.initleadPage(this.currentPage)

    },

    eventSet: function(){
        var cthis = this;
        //添加事件
        //下一页
        this.elem.find('.next').unbind('click').on('click', function(){
            cthis.nextPage();
        })

        // //上一页
        this.elem.find('.prev').unbind('click').on('click', function(){
            cthis.prevPage();
        })

        //     // 处理二次生成的时候上一次的绑定事件
        // //具体页码导航
        var oparent = this.elem.find('.page');
        oparent.unbind('click').on('click', '.cpage', function(event){
            var e = window.event || event;
            var t = e.srcElement || e.target;
            var aim = $(t);

            var page = parseInt(aim.text());

            cthis.leadPage(page);
        })

    }
}
module.exports = Pagination;