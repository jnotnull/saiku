(function pieRender(root, pieRender) {
    root["pieRender"] = pieRender;
})(this, {
    buildOption: function(data, echartsconfig) {
        return {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: this.getLegendData(data)
            },
            series: [{
                name: echartsconfig.seriesName,
                type: echartsconfig.type,
                radius: echartsconfig.radius,
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: this.getPieSeriesData(data)
            }]
        }
    },

    getLegendData: function(data) {
        var result = [];
        var fields = data[0];
        var legendDataFieldsIndexs = [];

        // 获得字段索引
        for (var i = 0; i < echartsconfig.legendDataFields.length; i++) {
            var fieldIndex = fields.indexOf(echartsconfig.legendDataFields[i]);
            if (fieldIndex > -1) {
                legendDataFieldsIndexs.push(fieldIndex);
            }
        }

        // 获得字段索引对应数据
        for (var i = 1; i < data.length; i++) {
            var temp = [];
            for (var j = 0; j < legendDataFieldsIndexs.length; j++) {
                temp.push(data[i][legendDataFieldsIndexs[j]])
            }
            result.push(temp.join(echartsconfig.xConnecter || '~'));
        }

        return result;
    },

    getPieSeriesData: function(data) {
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

        // 名称字段索引
        var seriesDataNameFieldsIndexs = [];
        for (var i = 0; i < echartsconfig.seriesDataNameFields.length; i++) {
            var fieldIndex = fields.indexOf(echartsconfig.seriesDataNameFields[i]);
            if (fieldIndex > -1) {
                seriesDataNameFieldsIndexs.push(fieldIndex);
            }
        }

        for (var i = 1; i < data.length; i++) {
            var temp = [];
            for (var j = 0; j < fieldsIndexs.length; j++) {

                var temp = [];
                for (var k = 0; k < seriesDataNameFieldsIndexs.length; k++) {
                    temp.push(data[i][seriesDataNameFieldsIndexs[k]])
                }

                result.push({ name: temp.join(echartsconfig.xConnecter || "~"), value: data[i][fieldsIndexs[j]] })
            }
        }

        return result;

    }
})
