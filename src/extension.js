const vscode = require("vscode");

const request = require("request");

const url = 'https://api.gushi.ci/all.json';
let timer = null;


function activate(context) {
  var panel = null;

  function showWebview() {
    let username = vscode.workspace.getConfiguration().get("vscodePluginDemo.username");
    if (panel) {
      panel.reveal();
    } else {
      panel = vscode.window.createWebviewPanel("tips", "tips", vscode.ViewColumn.Two, {
        enableScripts: true,
        retainContextWhenHidden: true,
      });

      panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title></title>
        </head>
        <body>
            <div>
                <h1 align='center'>${username}~ 代码写久了，该休息啦~</h1>
                <h3 >可以喝口水</h3>
                <h3 >抬抬头</h3>
                <h3 >眨眨眼</h3>
                <h3 >起来伸个懒腰</h3>

            </div>
        </body>
        </html>
        `;

      panel.onDidDispose(() => {
        panel = undefined;
      });

    }

  }

  function start() {
    let time = vscode.workspace.getConfiguration().get("vscodePluginDemo.intervalTime");
    let isShowTips = vscode.workspace.getConfiguration().get("vscodePluginDemo.isShowTips");
    if (isShowTips) {
      console.log(time  * 1000)
      timer = setTimeout(() => {
        const tips=['站起来走一走吧~','抬头看一看,眨眨眼睛吧！','记得多喝点水','伸一伸懒腰吧'][Math.floor(Math.random()*4)]
        vscode.window.showInformationMessage(`已经敲了${time}分钟代码，${tips}`);
        
        showWebview();
        start();

      },time*60*1000);
    }
  }

  start();

  context.subscriptions.push(
    vscode.commands.registerCommand("extension.say", function () {
      request({
        url
      }, (error, response, body) => {

        let data = JSON.parse(response.body);
        console.log(data);
        vscode.window.showInformationMessage(`${data.content}    --${data.origin}`);
      })
    })
  )

}

exports.activate = activate;

function deactivate() {
  clearTimeout(timer);
}
exports.deactivate = deactivate;