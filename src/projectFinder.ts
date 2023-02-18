import * as vscode from 'vscode';
import * as fs from 'fs';
import * as callerInfoGatherer from './callerInfoGatherer';
import * as os from 'os';
import { osSeparator } from './callerInfoGatherer';

export const dirNameRex = /([\w\d\s\-\_\(\)\,\=\;\.])+[\\/]*$/gm;


export function findCsproj(caller: vscode.Uri) {
    let csprojDir;
    let callerInfo = callerInfoGatherer.getCallerInfo(caller);
    let currentFolder = callerInfo.callerUri.fsPath;
    let newPath = "";

    let projectFound = false;
    do {
        let files = fs.readdirSync(currentFolder);
        files.forEach(element => {
            if (element.endsWith('.csproj')) {
                projectFound = true;
                newPath = currentFolder + element;
            }
        });
        if (projectFound) {
            break;
        }
        if (currentFolder === callerInfo.rootFolderUri?.fsPath) {
            break;
        }
        currentFolder = currentFolder.replace(dirNameRex, '');
    } while (!projectFound);
    if (newPath !== '') {
        csprojDir = vscode.Uri.file(newPath);
    }
    return csprojDir;
}