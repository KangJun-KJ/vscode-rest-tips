'use strict';
import * as vscode from "vscode";
import { ReminderView } from './reminderView';

export class Scheduler {
    public constructor(private context: vscode.ExtensionContext) {
    }

    public start() {
        let time = ~~(vscode.workspace.getConfiguration().get("vscodePluginDemo.intervalTime") || 0);
        setInterval(() => {
            ReminderView.show(this.context);
        }, time * 60 * 1000);
    }
}