"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemInfo = exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
let rootDir;
const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm;
const fileExNameRex = /\.+([\w\d])+$/gm;
const folderRegexFront = /^([/\\])([\w\d\s\-\_\(\)\,\=\;]+)/gm;
let projectsDirs;
let projectsDirsNoFilename;
let projectsDirsNoNothing;
async function activate(context) {
    console.clear();
    // register the updater to the event on did create files
    // vscode.workspace.onDidCreateFiles(() => updateProjectList());
    // Do the other stuff
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (invoker) => {
        vscode.workspace.findFiles('**/*.csproj')
            .then((dir) => {
            projectsDirs = new Array();
            dir.forEach(element => {
                projectsDirs.push(element.fsPath);
            });
        });
        console.log(`Deleting filenames`);
        projectsDirsNoFilename = new Array();
        projectsDirs.forEach(element => {
            projectsDirs.forEach((element) => {
                let temp = element.replace(fileExNameRex, '');
                console.log(temp);
                projectsDirsNoFilename.push(temp);
            });
            console.log((`Deleting external path`));
            projectsDirsNoNothing = new Array();
            projectsDirsNoFilename.forEach(element => {
                let temp = element.replace(folderRegexFront, '');
                projectsDirsNoNothing.push(temp);
                console.log(temp);
            });
            // split incoming path in individual folders
            // checks if the first matches in any string in the ws list
            // if not, no root project
            // if yes, add the next folder to the slice, and repeat
            let pathFromClick = invoker.fsPath;
            rootDir = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
            // Attempt to find the perfect namespace
            let lastMatch;
            /*
            projectsDirsNoNothing.forEach(element => {
                let temp = element.split(folderRegexFront);
            });*/
        });
    });
}
exports.activate = activate;
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
class ItemInfo {
    constructor(item) {
        let tempCallerUri = vscode.Uri.file(item.fsPath).fsPath;
        let tempWSFolder = vscode.Uri.file(vscode.workspace.getWorkspaceFolder(item).uri.fsPath).fsPath;
        let tempDir = tempCallerUri.replace(tempWSFolder, '');
        let nameWithEx = item.fsPath.match(fileNameRex)?.toString();
        let nameNoEx = nameWithEx?.replace(fileExNameRex, '');
        this.rootFolderUri = vscode.workspace.getWorkspaceFolder(item).uri;
        this.rootFolderName = vscode.workspace.getWorkspaceFolder(item).name;
        this.callerUri = vscode.Uri.file(item.fsPath);
        this.callerNameWithEx = item.fsPath.match(fileNameRex)?.toString();
        this.callerNameNoEx = nameNoEx;
        this.callerDir = tempDir;
    }
}
exports.ItemInfo = ItemInfo;
//# sourceMappingURL=extension.js.map