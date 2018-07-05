## example

```javascript
    import Pagination from 'pagination';

    @params ele [String] -> class
    @params this.page [Number|String] -> 页码
    @params this.total [Number|String] -> 总页数
    @params function -> atgument [index]
    
    new Pagination(ele, this.page, this.total, i => {
        this.page = i;
        this.initView();
    })
```