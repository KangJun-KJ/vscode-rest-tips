const vscode = require("vscode");

const request = require("request");

const url = 'https://api.gushi.ci/all.json';
let timer = null;


function activate(context) {
  
  function start() {
    let time = vscode.workspace.getConfiguration().get("vscodePluginDemo.intervalTime");
    let isShowTips = vscode.workspace.getConfiguration().get("vscodePluginDemo.isShowTips");
    if (isShowTips) {
      timer = setTimeout(() => {
        vscode.window.showInformationMessage(`已经敲了${time}分钟代码，${['站起来走一走吧~','抬头看一看,眨眨眼睛吧！','记得多喝点水','伸一伸懒腰吧'][Math.floor(Math.random()*4)]}`);
        start();  
      }, time * 60 * 1000);
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