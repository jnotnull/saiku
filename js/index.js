
// echarts渲染引擎
var eChartsRender = {

    // 发送请求
    sendRequest: function(params, ele) {
        var that = this;

        $.ajax({
            type: params.type,
            url: params.url,
            dataType: params.dataType,
            data: {},
            success: function(json) {
                var data = params.successcallback.apply(this, [json]);
                that.render(data, ele);
            }
        })
    },

    // 渲染方法
    render: function(data, ele) {
        var myChart = echarts.init(ele);

        var option = {
            title: {
                text: 'saiku转换'
            },
            tooltip: {},
            legend: {
                data: ['Number of quakes']
            },
            xAxis: {
                data: this.getAxis(data)
            },
            yAxis: {},
            series: this.getSeries(data, 'bar')
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    },

    getAxis: function(data) {
        var result = [];
        for (var i = 1; i < data.length; i++) {
            result.push(data[i][0] + "~" + data[i][1]);
        }
        return result;
    },

    getSeries: function(data, type) {
        var result = [];
        var obj = {};
        obj.name = data[0][2];
        obj.type = type;
        obj.data = [];
        for (var i = 1; i < data.length; i++) {
            obj.data.push(data[i][2]);
        }
        result.push(obj);
        return result;
    }
}

// 成功后的回调
var successcallback = function(json) {
    return convertData(json);
};

// 请求参数
var params = {
    url: "/saiku/rest/saiku/embed/export/saiku/json?formatter=flattened&file=/homes/home:admin/sample_reports/number_of_quakes_over_time.saiku&_=1481093927018",
    type: 'get',
    dataType: 'json',
    successcallback: successcallback
}

// 发送请求
eChartsRender.sendRequest(params, document.getElementById('main'));

// 对saiku数据进行转换
var convertData = function(json) {
    var result = new Array();

    var array = json.cellset;

    var columnHeader = new Array(json.width);

    for (var i = 0; i < array.length; i++) {
        var cols = array[i];
        if ("ROW_HEADER" == (cols[0].type)) {
            break;
        } else {
            for (var j = 0; j < cols.length; j++) {
                var value = cols[j].value;
                if (columnHeader[j] == null) {
                    columnHeader[j] = (value == "null" ? "" : value);
                } else {
                    columnHeader[j] += (value == "null" ? "" : value);
                }
            }
        }

        for (var i = 0; i < (json.height - (i - 1)); i++) {
            result[i] = new Array();
            for (var j = 0; j < json.width; j++) {
                result[i][j] = "";
            }
        }

        result[0] = columnHeader;
        var rowHeader = new Array(json.width);
        for (var j = i; j < array.length; j++) {
            var cols = array[j];
            for (var k = 0; k < cols.length; k++) {
                if ("DATA_CELL" == (cols[k].type)) {
                    var raw = cols[k].properties.raw;
                    if (!isNaN(raw)) {
                        result[j - i + 1][k] = raw;
                    } else {
                        result[j - i + 1][k] = "0";
                    }
                } else {
                    var v = cols[k].value;
                    if ("null" !== v) {
                        result[j - i + 1][k] = cols[k].value;
                        rowHeader[k] = cols[k].value;
                    } else {
                        result[j - i + 1][k] = rowHeader[k];
                    }

                }
            }
        }
    }

    return result;
}
