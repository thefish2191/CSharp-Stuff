import { Namespacer } from './headquarters/Namespacer';
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
        let invokerDir = invoker.fsPath!;
        let relativeInvokerDir = invoker.fsPath.replace(vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath!, '');

        await updateProjects();

        let parentProjects = await Orphanage.findParents(allProjectsPaths, invokerDir);
        // let thisItemName = await PoliceOfficer.askUserForAName(ItemType.interfaceItem);

        if (Orphanage.hasNoParent(parentProjects)) {
            console.log(Namespacer.dirToNamespace(relativeInvokerDir));
            // TODO: Create a raw namespace
        }
        else if (Orphanage.hasOnlyOneParent(parentProjects)) {
            vscode.window.showInformationMessage(`Creating namespace based on: ${FileSpotter.getFileInfo(parentProjects[0]).fileNameNoExt}`);
            // TODO: Create a fancy namespace
            // parent filename + (invoker path)
            let parentInfo = FileSpotter.getFileInfo(parentProjects[0]);
            let temp = parentInfo.fileNameNoExt + invokerDir.replace(parentInfo.pathDir, '');
            temp = Namespacer.dirToNamespace(temp);
            console.log(temp);
        }
        else if (Orphanage.hasMultipleParents(parentProjects)) {
            vscode.window.showErrorMessage(`The destination directory has ${parentProjects.length} parent projects. Nesting projects are not supported by this extension, we can't decide the correct namespace`);
        }
    }
    );
    // context.subscriptions.push();
}



export enum ItemType {
    classItem = 'Class',
    enumItem = 'Enum',
    interfaceItem = 'Interface',
    globalUsingItem = 'GlobalUsing'
}
