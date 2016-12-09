(function eChartsRender(root, eChartsRender) {
    root["eChartsRender"] = eChartsRender;
})(this, {

    // 发送请求
    sendRequest: function(params, ele) {
        var that = this;

        //本地缓存一天
        var saikudata = localStorage.getItem(params.url);
        if (saikudata) {
            saikudata = JSON.parse(saikudata);
            var storageDate = saikudata.date;
            if (Date.now() - storageDate < 1 * 24 * 60 * 60 * 1000) {
                var data = params.successcallback.apply(this, [saikudata.data]);
                that.render(data, ele);
                return false;
            }
        }
        
        // 超过一天删除掉
        localStorage.removeItem(params.url);

        $.ajax({
            type: params.type,
            url: params.url,
            dataType: params.dataType,
            data: {},
            success: function(json) {
                localStorage.setItem(params.url, JSON.stringify({ "date": Date.now(), "data": json }))
                var data = params.successcallback.apply(this, [json]);
                that.render(data, ele);
            }
        })
    },

    // 渲染方法
    render: function(data, ele) {
        var myChart = echarts.init(ele);

        var option = this.buildOption(data);

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    buildOption: function(data) {
        return convertor.buildOption(data, echartsconfig);
    }
})
