"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
const vscode_1 = require("vscode");
// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;
function activate(context) {
    let allProjects = updateProjectList();
    const enableExtension = 'dotnet-helper.enableExtension';
    const createClass = 'dotnet-helper.createClass';
    const createEum = 'dotnet-helper.createEnum';
    const createInterface = 'dotnet-helper.createInterface';
    let enableMyExtension = vscode.commands.registerCommand(enableExtension, () => {
        console.log('Extension enabled!');
    });
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker) => {
        let start = Date.now();
        let matches = getMatches(await (allProjects), invoker);
        let namespace = await findThePerfectNamespace((await matches), invoker);
        let newFileName = await vscode.window.showInputBox({
            title: 'Creating a new item',
            ignoreFocusOut: false,
            placeHolder: 'Give it a name',
            prompt: 'Great class names uses letters only!',
            value: 'MyClass.cs',
            valueSelection: [0, 7]
        });
        if (!newFileName.endsWith('.cs')) {
            newFileName += '.cs';
        }
        let newFilePath = vscode_1.Uri.file(invoker.fsPath + path.sep + newFileName);
        vscode.workspace.fs.writeFile(newFilePath, new Uint8Array(Buffer.from(`namespace ${namespace};\n\npublic class ${newFileName?.replace('.cs', '')}\n{\n    \n}\n`)))
            .then(() => {
            vscode.commands.executeCommand('vscode.open', newFilePath).then(() => {
                vscode.commands.executeCommand('cursorMove', 'nextBlankLine');
            });
        });
        console.log(Date.now() - start);
    });
    // context.subscriptions.push(enableMyExtension);
}
exports.activate = activate;
var ItemType;
(function (ItemType) {
    ItemType["classItem"] = "class";
    ItemType["enumItem"] = "enum";
    ItemType["interfaceItem"] = "interface";
    ItemType["globalUsingItem"] = "globalUsingItem";
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