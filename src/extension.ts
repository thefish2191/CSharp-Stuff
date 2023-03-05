import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { Namespacer } from './headquarters/Namespacer';

// Extension related, to avoid manual changes
export const extensionName = 'csharp-stuff';

// Command names
const createClass = `${extensionName}.createClass`;

export async function activate(context: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);
    let classCreator = vscode.commands.registerCommand(createClass, async (invoker: Uri) => {
        let nm = await Namespacer.nameSpaceIt(invoker);
        console.log(nm);
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
