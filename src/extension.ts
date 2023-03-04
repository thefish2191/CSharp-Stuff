import { PoliceOfficer } from './headquarters/PoliceOfficer';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { FileSpotter } from './headquarters/FileSpotter';
import { Orphanage } from './headquarters/Orphanage';



// A pattern is used to find files that matches it
// This pattern matches all files, in the root folder and inside subfolders,
// files with the extension .csproj
const csprojPattern = '**/*.csproj';

// Extension related, to avoid manual changes
const extensionName = 'csharp-stuff';
// Command names
const createClass = `${extensionName}.createClass`;



// update the project list in the very start of the extension
let allProjectsPaths: string[] = [];
export async function updateProjects() {
    allProjectsPaths = await FileSpotter.findFilesThanMatchPattern(csprojPattern);
}
export async function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);

    // ! Warning: This method is not mean to be called from the command pallette(yet).
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: Uri) => {
        await updateProjects();
        let parentProjects = await Orphanage.findParents(allProjectsPaths, invoker.fsPath);
        let thisItemName = await PoliceOfficer.askUserForAName(ItemType.classItem);

        console.log(`New item name:`);
        console.log(thisItemName);

        if (Orphanage.hasNoParent(parentProjects)) {
            vscode.window.showInformationMessage(`Creating a raw namespace`);
            // TODO: Create a raw namespace
        }
        else if (Orphanage.hasOnlyOneParent(parentProjects)) {
            vscode.window.showInformationMessage(`Creating namespace based on: ${FileSpotter.getFileInfo(parentProjects[0]).fileNameNoExt}`);
            // Generate fancy namespace
            // TODO: Create a fancy namespace
        }
        else if (Orphanage.hasMultipleParents(parentProjects)) {
            vscode.window.showErrorMessage(`The destination directory has ${parentProjects.length} parent projects. Nesting projects are not supported by this extension, we can't decide the correct namespace`);
        }
    }
    );
    // context.subscriptions.push();
}



export enum ItemType {
    classItem = 'class',
    enumItem = 'enum',
    interfaceItem = 'interface',
    globalUsingItem = 'globalUsingItem'
}
