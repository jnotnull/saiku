# saiku-echarts

##1.功能说明
###1.支持saiku数据缓存，缓存时间为一天


##2.代码地图

    ├── css
    │   └── index.css
    ├── dashboard.html
    ├── favicon.ico
    ├── images
    ├── index.html
    └── js
        ├── authorization.js
        ├── config
        │   └── echartsInstanceConfigs.js
        ├── eChartsRender.js
        ├── index.js
        ├── lib
        │   ├── echarts.js
        │   └── jquery.min.js
        ├── render
        │   ├── barRender.js
        │   ├── lineRender.js
        │   └── pieRender.js
        └── utils
            ├── convertor.js
            └── utils.js


# saiku3.9 问题汇总

##执行mvn clean install -DskipTests遇到的问题：

###1. mondrian jar包找不到。

   解决方法：到库中找到存在的版本号，修改下即可：

         <dependency>
                <groupId>pentaho</groupId>
                <artifactId>mondrian</artifactId>
                <version>4.3.0.1.2-SPARK</version>
            </dependency>

###2.  saiku-ui工程中pom文件中的http://jsdoctk-plugin.googlecode.com/svn/repo 无法访问

    解决方法：注释掉即可：
    
        <repositories>
         <!-- <repository>
             <id>jsdoctk1</id>
             <url>http://jsdoctk-plugin.googlecode.com/svn/repo</url>
         </repository> -->
        </repositories>
        <pluginRepositories>
        <!-- <pluginRepository>
            <id>jsdoctk2</id>
            <url>http://jsdoctk-plugin.googlecode.com/svn/repo</url>
        </pluginRepository> -->
        <pluginRepository>
            <name>oss.sonatype.org</name>
            <id>oss.sonatype.org</id>
            <url>http://oss.sonatype.org/content/groups/public</url>
        </pluginRepository>
        </pluginRepositories>

##启动tomcat遇到的问题

###1.  java.net.BindException: Cannot assign requested address

     server.xml改为如下即可
      
        <Server address="0.0.0.0" port="8005" shutdown="SHUTDOWN">

##Saiku embed 相关问题

###1. Saiku embed只能在用户登录下才能访问，否则服务端报如下错误

    [ExporterResource] Error exporting JSON for file: /homes/home:admin/sample_reports/number_of_quakes_over_time.saiku java.lang.NullPointerException
	at org.saiku.web.rest.resources.BasicRepositoryResource2.getResource
     
   解决方法：增加如下代码：
   
    // 进行登录授权
    var auth = function(successcallback) {
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
