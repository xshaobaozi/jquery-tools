## example

```javascript
    <div 
        v-infinite-scroll="vInfiniteScrollMethods"
        :infinite-scroll-disabled="getIsStart"
        :infinite-scroll-distance="50">
    </div>

    ...

    data() {
        return {
            vInfiniteScrollMethods: {
                scrollBottom: this.loadScrollBottom,
                scrollTop: this.loadScrollTop
            },
            getIsStart: true
        }
    },
```