"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
async function activate(context) {
    let test = vscode.commands.registerCommand(`dotnet-helper.tester`, async (caller) => {
    });
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (target) => {
    });
    let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
    });
}
exports.activate = activate;
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
const dirsRegex = /[\/\\]/g;
async function generateNamespace(caller) {
    try {
        // Get the whole path, with system specific separator, 
        let rootFolderUri = vscode.workspace.getWorkspaceFolder(caller)?.uri.fsPath;
        // Get the location, folder or file, from where the command was executed, with system specific separator
        let fullFolderName = caller.fsPath;
        // get the root folder name
        let rootFolderName = vscode.workspace.getWorkspaceFolder(caller).name;
        // get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
        let localPath = fullFolderName.replace(rootFolderUri, '');
        // Creates a possible namespace
        let newNamespace = localPath.replace(dirsRegex, '.');
        newNamespace = rootFolderName + newNamespace;
        return newNamespace.toString();
    }
    catch (error) {
    }
}
var ResourceType;
(function (ResourceType) {
    ResourceType["null"] = "null";
    ResourceType["file"] = "file";
    ResourceType["folder"] = "folder";
})(ResourceType || (ResourceType = {}));
const fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;
async function getCallerInfo(caller) {
    let incomingType = ResourceType.null;
    if (fs.lstatSync(caller.fsPath).isFile()) {
        incomingType = ResourceType.file;
    }
    else if (fs.lstatSync(caller.fsPath).isDirectory()) {
        incomingType = ResourceType.folder;
    }
    let callerInfo = {
        rootFolderUri: vscode.workspace.getWorkspaceFolder(caller)?.uri,
        rootFolderName: vscode.workspace.getWorkspaceFolder(caller).name,
        callerName: caller.fsPath.match(fileNameRex),
        callerUri: vscode.Uri.file(caller.fsPath),
        callerType: incomingType
    };
    return callerInfo;
}
//# sourceMappingURL=extension.js.map