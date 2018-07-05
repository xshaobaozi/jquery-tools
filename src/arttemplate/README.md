## examlpe

```javascript
    window.template = require('atrtemplate');
    
    render: function({target, id, data}) {
        return $(target).html(template(id, data));
    }

    this.render({
        target: @params string [class]
        id: @params string [id]
        data: @params Object
    })

    <script id="kill_list-table" type="text/html">
        {{if list.length > 0}}
                    {{each list}}
                            <div class="kill_list-table__main col-xs-12">
                                <div class="col-xs-2 rank">
                                    {{$value.ranking_kill}}
                                </div>
                                <div 
                                    title="{{$value.teamName}}"
                                    class="col-xs-4 team">
                                    {{$value.teamName}}
                                </div>
                                <div class="col-xs-4 leader">
                                    {{$value.captainName}}
                                </div>
                                <div class="col-xs-2 score">
                                    {{$value.killCount}}
                                </div>
                            </div>
                            {{if stage_index == $value.ranking_kill}}
                                <div class="kill_list-table__line col-xs-12">
                                    <div></div>
                                </div>
                            {{/if}}
                    {{/each}}
                </div>
            {{else}}
                <div class="kill_list-table__empty col-xs-12">
                        暂无数据
                </div>
        {{/if}}
    </script>
```