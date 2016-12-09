// 从URL中解析参数
var saikufile = decodeURI(utils.getUrlVar('saikufile'));
var echartsconfig = echartsInstanceConfigs[saikufile];

// 成功后的回调
var successcallback = function(json) {
    return convertor.convertData(json);
};

// 请求参数
var params = {
    url: "/saiku/rest/saiku/embed/export/saiku/json?formatter=flattened&file=" + saikufile + "&_=1481093927018",
    type: 'get',
    dataType: 'json',
    successcallback: successcallback
}

// 执行请求
var doSendRequest = function() {
    eChartsRender.sendRequest(params, document.getElementById('main'));
}

// 入口
authorization.getSession(doSendRequest);