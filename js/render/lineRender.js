(function lineRender(root, lineRender) {
    root["lineRender"] = lineRender;
})(this, {
    buildOption: function(data, echartsconfig) {
        return {
            title: {
                text: echartsconfig.title
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: echartsconfig.legendDataFields
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.getxAxis(data)
            },
            yAxis: {
                type: 'value'
            },
            series: this.getLineSeriesData(data, echartsconfig.type, echartsconfig.stack)
            // series: [{
            //     name: '邮件营销',
            //     type: 'line',
            //     stack: '总量',
            //     data: [120, 132, 101, 134, 90, 230, 210]
            // }]
        }
    },

    getxAxis: function(data) {
        var fields = data[0];

        var fieldsIndexs = [];
        for (var i = 0; i < echartsconfig.xAxis.length; i++) {
            var fieldIndex = fields.indexOf(echartsconfig.xAxis[i]);
            if (fieldIndex > -1) {
                fieldsIndexs.push(fieldIndex);
            }
        }

        var result = [];
        for (var i = 1; i < data.length; i++) {
            var temp = [];
            for (var j = 0; j < fieldsIndexs.length; j++) {
                temp.push(data[i][fieldsIndexs[j]])
            }
            result.push(temp.join(echartsconfig.xConnecter || '~'));
        }
        return result;
    },

    getLineSeriesData: function(data, type, stack) {
        var result = [];
        var fields = data[0];

        // 取值字段索引
        var fieldsIndexs = [];
        for (var i = 0; i < echartsconfig.seriesFields.length; i++) {
            var fieldIndex = fields.indexOf(echartsconfig.seriesFields[i]);
            if (fieldIndex > -1) {
                fieldsIndexs.push(fieldIndex);
            }
        }

        for (var j = 0; j < fieldsIndexs.length; j++) {
            var obj = {};
            obj.name = data[0][fieldsIndexs[j]];
            obj.type = type;
            obj.stack = stack;
            obj.data = [];
            for (var i = 1; i < data.length; i++) {
                obj.data.push(data[i][fieldsIndexs[j]]);
            }
            result.push(obj);
        }

        return result;

    }
})
