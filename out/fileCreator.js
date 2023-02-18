"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findFileLocalPath = exports.fileCreator = void 0;
const vscode = require("vscode");
const whiteSpace = /(\s)/g;
async function fileCreator(target) {
    /*
    // Get the whole path, with system specific separator,
    let rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath!;

    // Get the location, folder or file, from where the command was executed, with system specific separator
    let fullFolderName = target.fsPath;

    // get the root folder name
    let rootFolderName = vscode.workspace.getWorkspaceFolder(target)!.name;

    // get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
    let localPath = fullFolderName.replace(rootFolderUri, '');

    // Creates a possible namespace
    let newFileName = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        prompt: "Please enter a name for the new item",
        value: `new class.cs`
    });
    if (typeof (newFileName) === undefined || newFileName!.trim() === '') {
        return;
    }
    let finalName: string;
    if (newFileName?.endsWith('.cs')) {
        finalName = newFileName!;
    }
    else {
        finalName = newFileName + '.cs';
    }
    finalName.replace(whiteSpace, '');
    let newFileFullPath = join.join(target.fsPath, finalName);
    fs.writeFileSync(newFileFullPath, `namespace ${newNamespace};`);
    vscode.commands.executeCommand('vscode.open', `'${newFileFullPath}'`);
    */
}
exports.fileCreator = fileCreator;
function findFileLocalPath(target) {
    // Get the whole path, with system specific separator, 
    let rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath;
    // Get the location, folder or file, from where the command was executed, with system specific separator
    let fullFolderName = target.fsPath;
    // get the root folder name
    let rootFolderName = vscode.workspace.getWorkspaceFolder(target).name;
    // get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
    let fileName = fullFolderName.replace(rootFolderUri, '');
    // Creates a possible namespace
    return fileName;
}
exports.findFileLocalPath = findFileLocalPath;
//# sourceMappingURL=fileCreator.js.map