## example

```javascript
    import APIS from '$_common/api';

    APIS.getUserInfo()
    .done(res => {
        ...done
    })
    .fail(err => {
        ...fail    
    })
```