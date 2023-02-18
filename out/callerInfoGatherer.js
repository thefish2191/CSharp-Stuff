"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallerInfo = exports.ResourceType = exports.osSeparator = exports.fileNameRex = void 0;
const vscode = require("vscode");
const fs = require("fs");
const os = require("os");
exports.fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;
exports.osSeparator = os.platform() === "win32" ? "\\" : "/";
var ResourceType;
(function (ResourceType) {
    ResourceType["null"] = "null";
    ResourceType["file"] = "file";
    ResourceType["folder"] = "folder";
})(ResourceType = exports.ResourceType || (exports.ResourceType = {}));
function getCallerInfo(caller) {
    let incomingType = ResourceType.null;
    if (fs.lstatSync(caller.fsPath).isFile()) {
        incomingType = ResourceType.file;
    }
    else if (fs.lstatSync(caller.fsPath).isDirectory()) {
        incomingType = ResourceType.folder;
    }
    let tempCallerUri = vscode.Uri.file(caller.fsPath).toString();
    let tempWSFolder = vscode.workspace.getWorkspaceFolder(caller)?.uri.toString();
    let tempDir = tempCallerUri.replace(tempWSFolder, '');
    if (incomingType === ResourceType.file) {
        tempDir = tempDir.replace(exports.fileNameRex, '');
    }
    if (incomingType === ResourceType.folder) {
        tempDir += exports.osSeparator;
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
        rootFolderName: vscode.workspace.getWorkspaceFolder(caller).name,
        callerName: caller.fsPath.match(exports.fileNameRex)?.toString(),
        callerUri: vscode.Uri.file(caller.fsPath),
        callerDir: tempDir,
        callerType: incomingType,
    };
    return callerInfo;
}
exports.getCallerInfo = getCallerInfo;
//# sourceMappingURL=callerInfoGatherer.js.map