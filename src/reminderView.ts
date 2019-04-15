'use strict';
import * as vscode from 'vscode';
import pic from './pic';

export class ReminderView {
    private static panel: vscode.WebviewPanel | undefined;

    public static show(context: vscode.ExtensionContext) {
        let username = vscode.workspace.getConfiguration().get("vscodePluginDemo.username");
        const imagePath = pic[~~(Math.random() * 3)];
        if (this.panel) {
            this.panel.reveal();
        } else {
            this.panel = vscode.window.createWebviewPanel("tips", "tips", vscode.ViewColumn.Two, {
                enableScripts: true,
                retainContextWhenHidden: true,
            });

            this.panel.webview.html = `
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
                    <img style='position:absolute;top:0px;right:0px;' src="${imagePath}">
    
                </div>
            </body>
            </html>
            `;

            this.panel.onDidDispose(() => {
                this.panel = undefined;
            });
        }
    }
}