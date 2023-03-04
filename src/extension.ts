import * as vscode from 'vscode';
import path = require('path');
import { Uri } from 'vscode';
import { FileSpotter } from './headquarters/FileSpotter';



// A pattern is used to find files that matches it
// This pattern matches all files, in the root folder and inside subfolders,
// files with the extension .csproj
const csprojPattern = '**/*.csproj';

// Extension related, to avoid manual changes
const extensionName = 'csharp-stuff';
// Commands names
const createClass = `${extensionName}.createClass`;



// update the project list in the very start of the extension
let allProjectsPaths: string[];
async function updateProjects() {
    allProjectsPaths = await FileSpotter.findFilesThanMatchPattern(csprojPattern);

}
export async function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);

    updateProjects();
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: Uri) => {
        if (allProjectsPaths.length < 1) {
            updateProjects;
        }
        else if (allProjectsPaths.length >= 1) {
            let parentProjects = await FileSpotter.searchParentProjects(allProjectsPaths, invoker.fsPath);
            if (parentProjects.length <= 0) {
                vscode.window.showErrorMessage(`No parent project found!`);
            }
            else if (parentProjects.length > 1) {
                vscode.window.showErrorMessage(`Nested project structure detected!`);
            }
            else if (parentProjects.length === 1) {
                // TODO: do the good stuff here
                console.log(FileSpotter.getFileInfo(parentProjects[0]));
            }
        }
        /*
        try {
            // Finds all the projects dirs that exist in the allProjects[], than matches the path to the destiny of the new file, in other words, the parent project of the new file.
            let newFileName: string | undefined
                = await vscode.window.showInputBox({
                    title: 'Creating a new item',
                    ignoreFocusOut: false,
                    placeHolder: 'Give it a name',
                    prompt: 'Great class names uses letters only!',
                    value: 'MyClass.cs',
                    valueSelection: [0, 7]
                });

            if (newFileName === undefined) {
                newFileName = 'NewItem';
            }
            console.log(newFileName);

            let namespace = 'Hello'; // await findThePerfectNamespace(, invoker);


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
        */
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
