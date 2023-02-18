import * as vscode from 'vscode';
import * as fs from 'fs';
import * as callerInfoGatherer from './callerInfoGatherer';
import * as os from 'os';
import { osSeparator } from './callerInfoGatherer';
import { error } from 'console';

export const dirNameRex = /[\\/]([\w\d\s\-\_\(\)\,\=\;\.])+[\\/]*$/gm;


export function findCsproj(caller: vscode.Uri) {
    let csprojDir: vscode.Uri;
    let callerInfo = callerInfoGatherer.getCallerInfo(caller);
    let currentFolder = callerInfo.callerUri.fsPath;
    let newPath = "";
    let limit = callerInfo.rootFolderUri?.fsPath;

    let projectFound = false;
    let attempts = 1;
    let safe = 15;
    do {
        // Limits the amount of folders to search in
        if (attempts >= safe) {
            throw new Error(`No target file found in ${attempts} attempts`);
        }
        attempts++;
        let files = fs.readdirSync(currentFolder);
        files.forEach(element => {
            if (element.endsWith('.csproj')) {
                projectFound = true;
                newPath = currentFolder + osSeparator + element;
            }
        });
        if (projectFound) {
            break;
        }
        if (currentFolder === limit) {
            break;
        }
        currentFolder = currentFolder.replace(dirNameRex, '');
    } while (!projectFound);
    if (newPath !== '') {
        csprojDir = vscode.Uri.file(newPath);
    }
    else {
        throw new Error("No .csproj file found");
    }
    return csprojDir;
}