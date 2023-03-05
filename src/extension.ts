import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { Namespacer } from './headquarters/Namespacer';
import { Worker } from './headquarters/Worker';
import { PoliceOfficer } from './headquarters/PoliceOfficer';

// Extension related, to avoid manual changes
export const extensionName = 'csharp-stuff';

// Command names
const createClass = `${extensionName}.createClass`;

export async function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: Uri) => {
        let newFileName = await PoliceOfficer.askUserForAName(ItemType.classItem);
        // New actual filename
        let namespace = await Namespacer.generateNamespace(invoker);
        // new file target
        let targetPath = Worker.createNewFileUri(invoker, newFileName);
        let fileExist = await Worker.checkIfFileExist(targetPath);
        if (!fileExist) {
            Worker.createNewItem(targetPath, namespace);
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
