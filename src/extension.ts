import * as vscode from 'vscode';
import path = require('path');
import * as fs from 'fs';
import { SnippetString } from 'vscode';


// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;

export function activate(context: vscode.ExtensionContext) {

    const enableExtension = 'dotnet-helper.enableExtension';
    const createClass = 'dotnet-helper.createClass';
    const createEum = 'dotnet-helper.createEnum';
    const createInterface = 'dotnet-helper.createInterface';

    let enableMyExtension = vscode.commands.registerCommand(enableExtension, () => {
        console.log('Extension enabled!');
    });

    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: vscode.Uri) => {
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
        } catch (error) {
            console.log(error);
        }
    }
    );
    // context.subscriptions.push(enableMyExtension);
}

enum ItemType {
    classItem = 'class',
    enumItem = 'enum',
    interfaceItem = 'interface'
}

// This method is called when the extension is deactivated
export function deactivate() { }

async function updateProjectList() {
    let allProjectsDirs: string[] = [];
    let projects = await vscode.workspace.findFiles('**/*.csproj');
    projects.forEach(element => {
        allProjectsDirs.push(element.fsPath);
    });
    return allProjectsDirs;
}

async function getMatches(allProjects: string[], invoker: vscode.Uri) {
    let possibleTarget: string[] = [];
    allProjects.forEach(element => {
        let temp = element.replace(fileNameRex, '');
        if (invoker.fsPath.startsWith(temp)) {
            possibleTarget.push(temp);
        }
    });
    return possibleTarget;
}

async function findThePerfectNamespace(allTargets: string[], invoker: vscode.Uri) {
    let len = (allTargets).length;
    if (len <= 0) {
        console.log(`No csproj found, we're creating an raw namespace lol`);
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
        let invokerPath = invoker.fsPath;
        return createNamespace(workspaceFolder!, invokerPath);
    }
    if (len === 1) {

        let bestMatch = (allTargets).pop();
        let invokerPath = invoker.fsPath;
        return createNamespace(bestMatch!, invokerPath);
    }
    else if (len >= 2) {
        vscode.window.showErrorMessage('Nested projects are causing some issues, please resolve');
        throw Error(`Nested namespaces detected! Staring at ${allTargets[0]}.`);
    }
}

async function createNamespace(target: string, invokerPath: string): Promise<string> {
    let dirName = target.replace(folderName, '');
    let almostNamespace = invokerPath.replace(target, '');
    let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
    return perfectNamespace;
}

