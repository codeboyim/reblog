[Re/blog](https://github.com/codeboyim/reblog)
======

Re/blog is a simple but complete single page application for blogging or publishing news with responsive design, built on [React][react] and other awesome tools and frameworks. It is written in JavaScript Harmony (ES6) with features supported and transformed by JSXTransformer.


Demo
---
Demo homepage: http://codeboyim.github.io/reblog/ 

Start/edit an article: http://codeboyim.github.io/reblog/#/a/p/new (account ```guest```, password ```guest123```).

A quick guide is also available at http://codeboyim.github.io/reblog/#/p/Reblog-101

Notice, because some experimental JavaScript and CSS3 features are used, a **recent version** of your favourite browser is required. Polyfills will be considered in future development.



Tech highlights
---
- [React][react] - UI components
- [Parse][parse] - Cloud backend solution and authentication support
- [director](https://github.com/flatiron/director) - Client URL router
- [Webpack](http://webpack.github.io/) - Module bundler, hot update development environment via Webpack-dev-server
- [Bourbon](http://bourbon.io/), [Neat](http://neat.bourbon.io/) - SASS mixins and a lightweight grid framework for a responsive UI
- [Ace](http://ace.c9.io/) - Embedded article editor
- [highlight.js](https://highlightjs.org/) - Syntax highlighting the code in articles
- [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [flaticon](http://www.flaticon.com/) - Icon fonts
- [Grunt](http://gruntjs.com/) - Task automation
- [npm](https://www.npmjs.org/), [bower](http://bower.io/) - Package managers



Before all else
---
Reblog stores data on [Parse][parse] by its JavaScript SDK. If you haven't dealt with Parse before, please head to https://parse.com/docs for details.

- **Create your own Parse app and use its own keys**
- **Create a user in Parse**, this user will be used as "admin" who is able to edit posts created by other users.

Replace following settings in ```Package.json``` with the information you get above
```json
"parse":{
    "applicationId":"your-parse-app-id",
    "javascriptKey":"your-parse-app-js-key",
    "adminId":"your-admin-user-objectId"
  }
```



Get started
---
Prerequisite: Git, Node, npm, Grunt cli, Bower

- download [latest release](https://github.com/codeboyim/reblog/archive/0.1.0.zip "0.1.0"), or clone the repo ```git clone https://github.com/codeboyim/reblog.git```
- install bower packages ```bower install```
- install npm packages ```npm install```
 
Development
---

Run ```grunt``` in command line to start  [webpack-dev-server](http://webpack.github.io/docs/webpack-dev-server.html), a small express server, to serve the webpack bundles and response to HTTP requests.

You may need to read ```webpack.config.js``` file to find out the default directories where webpack will look up packages for bundles or SASS/CSS to import, or add/change for your own development purpose.

Find details of all webpack configuration options [here](http://webpack.github.io/docs/configuration.html).

Build and deployment
---
Run this command in the project directory
```bash
grunt build
```
Built result will be created and copied to ```/release``` folder.

Reblog is a pure JavaScript application, it only requires a static Web server. Simply ```xcopy``` or ftp all files under ```/release``` folder to your Web server.

The repo has a Grunt deployment task which uses [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control) to push the released content to a Web server or publish environment, e.g. gh-pages branch on Github.

If this is your preferable way to deploy, remember to change following settings in the ```Gruntfile.js``` file for your own situation.

```javascript
buildcontrol: {
    options: {
        dir: 'release',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    github: {
        options: {
            remote: 'git@github.com:codeboyim/reblog.git',
            branch: 'gh-pages'
        }
    }
}
```

Then you should be able to deploy your application by running this command
```bash
grunt deploy
```

License
---
MIT. All vendor packages and artistic works are subject to their own license requirements.



[react]: http://facebook.github.io/react/
[parse]: https://parse.com/
 



