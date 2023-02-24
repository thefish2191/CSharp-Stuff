import * as vscode from 'vscode';
import path = require('path');
import { Uri } from 'vscode';


// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;
const extensionName = 'csharp-stuff';


export function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);


    let allProjects = updateProjectList();
    const enableExtension = 'dotnet-helper.enableExtension';
    const createClass = 'dotnet-helper.createClass';
    const createEum = 'dotnet-helper.createEnum';
    const createInterface = 'dotnet-helper.createInterface';

    let enableMyExtension = vscode.commands.registerCommand(enableExtension, () => {
        console.log('Extension enabled!');
    });

    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: vscode.Uri) => {
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
        if (!newFileName!.endsWith('.cs')) {
            newFileName += '.cs';
        }
        let newFilePath = Uri.file(invoker.fsPath + path.sep + newFileName);
        vscode.workspace.fs.writeFile(newFilePath, new Uint8Array(Buffer.from(
            `namespace ${namespace};\n\npublic class ${newFileName?.replace('.cs', '')}\n{\n    \n}\n`
        )))
            .then(() => {
                vscode.commands.executeCommand('vscode.open', newFilePath).then(() => {
                    vscode.commands.executeCommand('cursorMove', 'nextBlankLine');
                });
            });
        console.log(Date.now() - start);

    }
    );
    // context.subscriptions.push(enableMyExtension);
}

enum ItemType {
    classItem = 'class',
    enumItem = 'enum',
    interfaceItem = 'interface',
    globalUsingItem = 'globalUsingItem'
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

