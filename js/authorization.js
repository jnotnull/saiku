(function authorization(root, authorization) {
    root["authorization"] = authorization;
})(this, {

    getSession: function(callback) {
        var that = this;
        $.ajax({
            type: "GET",
            url: "/saiku/rest/saiku/session",
            data: {},
            success: function(data) {
                if (data.sessionid) {
                    callback.apply(this);
                } else {
                    that.auth(function() {
                        callback.apply(this);
                    })
                }
            },
            error: function(error) {
                that.auth(function() {
                    callback.apply(this);
                })
            }
        })
    },

    auth: function(successcallback) {
        $.ajax({
            type: "POST",
            url: "/saiku/rest/saiku/session",
            data: { username: "admin", password: "admin", isadmin: true, language: 'zh' },
            success: function(data) {
                successcallback.apply(this)
            },
            error: function(error) {
                console.log("auth error")
            },
            contentType: 'application/x-www-form-urlencoded',
            dataType: 'text',
            cache: false,
            async: true
        });
    }
})
