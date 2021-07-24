# 通过Travis自动部署Vue项目

## travis 是什么

> Travis CI 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器。

持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码"集成"到主干。

持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码。

## **名词解释**

* 持续集成(每次提交代码的时候，都进行构建、测试等)

* 持续交付(代码通过测试后，将其部署到测试环境)

* 持续部署(代码通过测试后，将其部署到生产环境)

## 为什么需要自动部署

比如我们现在开发一个组件库，里面涉及一个文档(静态网页)
    
1. `npm run docs:build`
2. 推送至gh-page分支 `add commit push`

***这几步完全可以使用自动化部署，今天采用git仓库和Travis CI实现自动化部署，把文章发布的工作交给Travis CI去完成，我们只专心创作就行。***

## 具体流程大纲

* 脚手架一个项目并GitHub托管(自动部署貌似现在支持码云⭐)
* 上[Travis](https://travis-ci.com)官网配置仓库
* 生成[GitHub令牌Access Token](https://github.com/settings/tokens)
* 在Travis配置token
* Vue项目根目录创建并配置.travis.yml文件
* 推送触发编译生成分支gh-pages
* 仓库开启分支GitHub page功能,分支选址gh-pages
* push到仓库就会触发Travis CI 的自动构建

## Travis配置token

![github生成key](~$docs/public/notes/travis_setting.jpg)

## github生成key
- ***只需要勾上repo*** 其他随意
- ***生成后第一时间复制key，页面刷新就没了***

![github生成key](~$docs/public/notes/github_tokens.jpg)

## 创建.travis.yml配置文件

```yaml
# 指定语言及版本
language: node_js
node_js:
  - "10"

# 安装项目包
install:
  - npm install
  - npm add node-sass

# 运行脚本
script:
  - npm run docs:build

# 自动化编译推送GitHub
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $travis_ci # travis setting 中的环境变量 GITHUB_TOKEN
  local-dir: ./web/my-components-librarys # 根据情况自定义到静态文件输出目录
  target-branch: gh-pages # 构建后的静态资源提交到这个分支
  verbose: true
  on:
    branch: master # 触发自动化部署的分支


```

## 记录一点心得(踩坑)

> 一不注意就能折腾半天

.travis.yml文件配置注意点

* ***一开始用了yarn 报了一些依赖包下载不了的错，如果遇到这种情况更换npm***
* ***在install完之后加一句(如果项目依赖node-sass)***
  `npm add node-sass`

token令牌在GitHub个人设置下的

* Developer settings
* Personal access tokens
* new token
* 随便命名及勾选repo
* ***记得保存下来(页面刷新就没了)***

Travis官网配置token令牌

* 在左边的My Repositories加号打开对应的仓库及设置
* 在Environment Variables中添加自己的token令牌
* 在.travis.yml配置文件中使用在官网添加的token令牌
* ***token名字要跟环境变量github-token配置的一致***

开启仓库分支的GitHub page功能

* 在自己的仓库首页选择setting
* 在下面有个GitHub Pages
* 在None选项中选择gh-pages分支 Save一下
* 页面刷新后回到这个位置会看到有个可以访问的地址(github部署需要时间 需要等一小会)

***[仓库地址](https://qc-z.github.io/my-components-librarys/)***







