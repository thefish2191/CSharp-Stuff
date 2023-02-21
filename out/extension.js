"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const path = require("path");
let rootDir;
// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;
async function activate(context) {
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (invoker) => {
        let start = Date.now();
        console.log(await doAllTheStuff(invoker));
        let finish = Date.now();
        console.log(`It took ${finish - start} ms`);
    });
}
exports.activate = activate;
async function doAllTheStuff(invoker) {
    let allProjects = updateProjectList();
    let allTargets = getMatches(await (allProjects), invoker);
    var namespace = await findThePerfectNamespace((await allTargets), invoker);
    return namespace;
}
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
    let len = (await allTargets).length;
    if (len <= 0) {
        console.log(`No csproj found, we're creating an raw namespace lol`);
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
        let invokerPath = invoker.fsPath;
        return getNamespace(workspaceFolder, invokerPath);
    }
    if (len === 1) {
        let bestMatch = await (await allTargets).pop();
        let invokerPath = invoker.fsPath;
        return getNamespace(bestMatch, invokerPath);
    }
    else if (len >= 2) {
        vscode.window.showErrorMessage('Nested projects are causing some issues, please resolve');
        throw Error('Nested namespaces detected!');
    }
}
async function getNamespace(target, invokerPath) {
    let test = await vscode.workspace.findFiles(target + path.sep + '*.csproj');
    let dirName = target.replace(folderName, '');
    let almostNamespace = invokerPath.replace(target, '');
    let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
    return perfectNamespace;
}
//# sourceMappingURL=extension.js.map