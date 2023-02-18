"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInfo = exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const os = require("os");
// A reference to all csproj in the root
let result;
async function activate(context) {
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (invoker) => {
        updateProjectList();
        console.log(`here we go`);
        result.forEach(element => {
            console.log(element);
        });
    });
    let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
    });
}
exports.activate = activate;
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
function updateProjectList() {
    try {
        vscode.workspace.findFiles('**/*.csproj')
            .then((dir) => {
            dir.forEach(element => {
                result.push(element.fsPath);
            });
        });
    }
    catch (error) {
        console.log(error);
    }
}
class ItemInfo {
    constructor(item) {
        let tempCallerUri = vscode.Uri.file(item.fsPath).fsPath;
        let tempWSFolder = vscode.Uri.file(vscode.workspace.getWorkspaceFolder(item).uri.fsPath).fsPath;
        let tempDir = tempCallerUri.replace(tempWSFolder, '');
        let nameWithEx = item.fsPath.match(ItemInfo.fileNameRex)?.toString();
        let nameNoEx = nameWithEx?.replace(ItemInfo.fileExNameRex, '');
        this.rootFolderUri = vscode.workspace.getWorkspaceFolder(item).uri;
        this.rootFolderName = vscode.workspace.getWorkspaceFolder(item).name;
        this.callerUri = vscode.Uri.file(item.fsPath);
        this.callerNameWithEx = item.fsPath.match(ItemInfo.fileNameRex)?.toString();
        this.callerNameNoEx = nameNoEx;
        this.callerDir = tempDir;
    }
}
exports.ItemInfo = ItemInfo;
ItemInfo.fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;
ItemInfo.fileExNameRex = /\.+([\w\d])+$/gm;
ItemInfo.osSeparator = os.platform() === "win32" ? "\\" : "/";
//# sourceMappingURL=extension.js.map