"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const fs = require("fs");
const join = require("path");
const dirsRegex = /[\/\\]/g;
function activate(context) {
    function namespaceGenerator(target) {
        // Get the whole path, with system specific separator, 
        var rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath;
        // Get the location, folder or file, from where the command was executed, with system specific separator
        var fullFolderName = target.fsPath;
        // get the root folder name
        var rootFolderName = vscode.workspace.getWorkspaceFolder(target).name;
        // get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
        var localPath = fullFolderName.replace(rootFolderUri, '');
        // Creates a possible namespace
        var newNamespace = localPath.replace(dirsRegex, '.');
        newNamespace = rootFolderName + newNamespace;
        return newNamespace;
    }
    function findFileLocalPath(target) {
        // Get the whole path, with system specific separator, 
        var rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath;
        // Get the location, folder or file, from where the command was executed, with system specific separator
        var fullFolderName = target.fsPath;
        // get the root folder name
        var rootFolderName = vscode.workspace.getWorkspaceFolder(target).name;
        // get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
        var fileName = fullFolderName.replace(rootFolderUri, '');
        // Creates a possible namespace
        return fileName;
    }
    let getNamespace = vscode.commands.registerCommand(`dotnet-helper.namespaceGenerate`, (prayer) => {
        var newFileName = "test.cs";
        var newFileFullPath = join.join(prayer.fsPath, newFileName);
        fs.writeFileSync(newFileFullPath, `namespace ${namespaceGenerator(prayer)};`);
    });
    let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, (prayer) => {
    });
}
exports.activate = activate;
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map