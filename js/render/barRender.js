(function barRender(root, barRender) {
    root["barRender"] = barRender;
})(this, {
    buildOption: function(data, echartsconfig) {
        return {
            title: {
                text: echartsconfig.title
            },
            tooltip: {},
            legend: {
                data: echartsconfig.legendData
            },
            xAxis: {
                data: this.getxAxis(data)
            },
            yAxis: {},
            series: this.getSeries(data, echartsconfig.type)
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

    getSeries: function(data, type) {
        var fields = data[0];

        var fieldsIndexs = [];
        for (var i = 0; i < echartsconfig.yAxis.length; i++) {
            var fieldIndex = fields.indexOf(echartsconfig.yAxis[i]);
            if (fieldIndex > -1) {
                fieldsIndexs.push(fieldIndex);
            }
        }

        var result = [];
        for (var j = 0; j < fieldsIndexs.length; j++) {
            var obj = {};
            obj.name = data[0][fieldsIndexs[j]];
            obj.type = type;
            obj.data = [];
            for (var i = 1; i < data.length; i++) {
                obj.data.push(data[i][fieldsIndexs[j]]);
            }
            result.push(obj);
        }

        return result;
    }
})
