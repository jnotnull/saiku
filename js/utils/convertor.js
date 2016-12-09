(function convertor(root, convertor) {
    root["convertor"] = convertor;
})(this, {
    buildOption: function(data, echartsconfig) {
        var map = {
            'bar': function(data, echartsconfig) {
                return barRender.buildOption(data, echartsconfig);
            },
            'pie': function(data, echartsconfig) {
                return pieRender.buildOption(data, echartsconfig);
            },
            'line': function(data, echartsconfig) {
                return lineRender.buildOption(data, echartsconfig);
            }
        }

        var render = map[echartsconfig.type];
        if (render) {
            return render.apply(this, [data, echartsconfig]);
        }
    },

    // 对saiku数据进行转换
    convertData: function(json) {

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
        console.log(result);
        return result;
    }
})
