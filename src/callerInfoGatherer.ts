import * as vscode from 'vscode';
import * as fs from 'fs';
import * as os from 'os';

export const fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;
export const osSeparator = os.platform() === "win32" ? "\\" : "/";


export enum ResourceType {
    null = `null`,
    file = `file`,
    folder = `folder`
}
export function getCallerInfo(caller: vscode.Uri) {
    let incomingType = ResourceType.null;
    if (fs.lstatSync(caller.fsPath).isFile()) {
        incomingType = ResourceType.file;
    }
    else if (fs.lstatSync(caller.fsPath).isDirectory()) {
        incomingType = ResourceType.folder;
    }

    let tempCallerUri = vscode.Uri.file(caller.fsPath)!.toString();
    let tempWSFolder = vscode.workspace.getWorkspaceFolder(caller)?.uri.toString()!;
    let tempDir = tempCallerUri.replace(tempWSFolder, '');
    if (incomingType === ResourceType.file) {
        tempDir = tempDir.replace(fileNameRex, '');
    }
    if (incomingType === ResourceType.folder) {
        tempDir += osSeparator;
    }

    /**
     * Caller info, but better
     * @param rootFolderUri Uri: the Uri of the root folder, as vscode.Uri obj
     * @param rootFolderName String: Gets the root folder name
     * 
     * @param callerName The item's name, that triggered the event
     * @param callerUri  The item's Uri, that triggered the event as vscode.Uri
     * @param callerDir  The item's local directory, that triggered the event, as string
     * @param callerType The item's type, that triggered the event, as Custom enum type
     */
    let callerInfo = {

        rootFolderUri: vscode.workspace.getWorkspaceFolder(caller)?.uri,
        rootFolderName: vscode.workspace.getWorkspaceFolder(caller)!.name,

        callerName: caller.fsPath.match(fileNameRex)?.toString(),
        callerUri: vscode.Uri.file(caller.fsPath),
        callerDir: tempDir,
        callerType: incomingType,
    };
    return callerInfo;
}
