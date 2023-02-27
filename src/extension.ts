import * as vscode from 'vscode';
import path = require('path');
import { Uri } from 'vscode';
import { FileSpotter } from './headquarters/FileSpotter';



const removeFolderName = /^(.*)([\/\\])/gm;
const separatorsRegex = /[\/\\]/gm;

// A pattern is used to find files that matches it
const csprojPattern = '**/*.csproj'; // This pattern matches all files, in the root folder and inside subfolders

// Extension related, to avoid manual changes
const extensionName = 'csharp-stuff';
const enableExtension = `${extensionName}.enableExtension`;
const createClass = `${extensionName}.createClass`;
const createEum = `${extensionName}.createEnum`;
const createInterface = `${extensionName}.createInterface`;


export async function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);

    // update the project list in the very start of the extension
    let allProjects = await FileSpotter.findFiles(csprojPattern);

    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: Uri) => {
        try {

            // Finds all the projects dirs that exist in the allProjects[], than matches the path to the destiny of the new file, in other words, the parent project of the new file.
            let targetProjects = await FileSpotter.compareAndReturn(allProjects, invoker.fsPath);

            let newFileName: string = await vscode.window.showInputBox({
                title: 'Creating a new item',
                ignoreFocusOut: true,
                placeHolder: 'Give it a name',
                prompt: 'Great class names uses letters only!',
                value: 'MyClass.cs',
                valueSelection: [0, 7]
            });
            console.log(newFileName);


            switch (targetProjects.length) {
                case targetProjects.length = 0:
                    console.log('cero');
                    break;
                case targetProjects.length = 1:
                    console.log('one');
                    break;
                default:
                    console.log('None');
                    break;
            }

            let namespace = await findThePerfectNamespace(targetProjects, invoker);


            if (!newFileName!.endsWith('.cs')) {
                newFileName += '.cs';
            }

            let newFilePath = Uri.file(invoker.fsPath + path.sep + newFileName);
            vscode.workspace.fs.writeFile(newFilePath, new Uint8Array(Buffer.from(
                `namespace ${namespace};\n\npublic class ${newFileName?.replace('.cs', '')}\n{\n    \n}\n`
            )));
        } catch (error) {
            console.log(error);
        }
    }
    );
    // context.subscriptions.push();
}

enum ItemType {
    classItem = 'class',
    enumItem = 'enum',
    interfaceItem = 'interface',
    globalUsingItem = 'globalUsingItem'
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
    let dirName = target.replace(removeFolderName, '');
    let almostNamespace = invokerPath.replace(target, '');
    let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
    return perfectNamespace;
}

