# 通过 midway 来创建的本地服务，提供多个服务接口可供调用

目前有:

1.  `github Api`, 文件所在: `gist.controller`

    a. 在这个 demo 中 我们使用 github 维护的`Octokit`插件来在`node`中访问 `gists`和`blob`。，这个插件是 github 开源的客户端插件，可以容易的调用 `github Api`,更多`Octokit`细节详见[官网](https://github.com/octokit/core.js#readme)

    b. [REST API](https://docs.github.com/zh/rest/gists/gists?apiVersion=2022-11-28#about-gists)

    c. 可访问官网链接获取详细**demo**

2.  missav 数据获取, 文件所在: `missav.controller`

    a. 将爬取到的数据通过html模板渲染到页面，爬取脚本并不在这个项目中 详见`copy-missav-video`项目

    b. html 模板依赖 `nunjucks`

3.  一个获取天气的后端接口服务 demo, 文件所在: `weather.controller`

    a. 也是通过 html 模板 渲染展示数据

    b. html 模板依赖 `nunjucks`
