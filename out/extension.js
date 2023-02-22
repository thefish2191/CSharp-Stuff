"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const fs = require("fs");
// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;
function activate(context) {
    const enableExtension = 'dotnet-helper.enableExtension';
    const createClass = 'dotnet-helper.createClass';
    const createEum = 'dotnet-helper.createEnum';
    const createInterface = 'dotnet-helper.createInterface';
    let enableMyExtension = vscode.commands.registerCommand(enableExtension, () => {
        console.log('Extension enabled!');
    });
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker) => {
        let allProjects = updateProjectList();
        let matches = getMatches(await (allProjects), invoker);
        let namespace = await findThePerfectNamespace((await matches), invoker);
        let newFileName = 'Test';
        if (!newFileName.endsWith('.cs')) {
            newFileName += '.cs';
        }
        let newFilePath = invoker.fsPath + path.sep + newFileName;
        fs.writeFileSync(newFilePath, `namespace ${namespace};\n\nclass ${newFileName.replace('.cs', '')}\n{\n\t\n}`);
        vscode.commands.executeCommand('vscode.open', vscode.Uri.file(newFilePath));
        try {
        }
        catch (error) {
            console.log(error);
        }
    });
    // context.subscriptions.push(enableMyExtension);
}
exports.activate = activate;
var ItemType;
(function (ItemType) {
    ItemType["classItem"] = "class";
    ItemType["enumItem"] = "enum";
    ItemType["interfaceItem"] = "interface";
})(ItemType || (ItemType = {}));
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
async function updateProjectList() {
    let allProjectsDirs = [];
    let projects = await vscode.workspace.findFiles('**/*.csproj');
    projects.forEach(element => {
        allProjectsDirs.push(element.fsPath);
    });
    return allProjectsDirs;
}
async function getMatches(allProjects, invoker) {
    let possibleTarget = [];
    allProjects.forEach(element => {
        let temp = element.replace(fileNameRex, '');
        if (invoker.fsPath.startsWith(temp)) {
            possibleTarget.push(temp);
        }
    });
    return possibleTarget;
}
async function findThePerfectNamespace(allTargets, invoker) {
    let len = (allTargets).length;
    if (len <= 0) {
        console.log(`No csproj found, we're creating an raw namespace lol`);
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
        let invokerPath = invoker.fsPath;
        return createNamespace(workspaceFolder, invokerPath);
    }
    if (len === 1) {
        let bestMatch = (allTargets).pop();
        let invokerPath = invoker.fsPath;
        return createNamespace(bestMatch, invokerPath);
    }
    else if (len >= 2) {
        vscode.window.showErrorMessage('Nested projects are causing some issues, please resolve');
        throw Error(`Nested namespaces detected! Staring at ${allTargets[0]}.`);
    }
}
async function createNamespace(target, invokerPath) {
    let dirName = target.replace(folderName, '');
    let almostNamespace = invokerPath.replace(target, '');
    let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
    return perfectNamespace;
}
//# sourceMappingURL=extension.js.map