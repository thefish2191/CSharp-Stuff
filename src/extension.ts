import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { Namespacer } from './headquarters/Namespacer';
import { Worker } from './headquarters/Worker';
import { PoliceOfficer } from './headquarters/PoliceOfficer';

// Extension related, to avoid manual changes
export const extensionName = 'csharp-stuff';

// Command names
const createClass = `${extensionName}.createClass`;
const createStruct = `${extensionName}.createStruct`;
const createEnum = `${extensionName}.createEnum`;
const createInterface = `${extensionName}.createInterface`;

export async function activate() {
    let filename: string;
    let filenamePath: Uri;
    let namespace: string;

    async function doTheStuff(clicker: Uri, itemType: ItemType) {
        filename = await PoliceOfficer.askUserForAName(itemType);
        filenamePath = Worker.createNewFileUri(clicker, filename);
        namespace = await Namespacer.generateNamespace(clicker);
        if (!await Worker.checkIfFileExist(filenamePath)) {
            Worker.createNewItem(filenamePath, namespace, itemType);
        }
    }
    let classCreator = vscode.commands.registerCommand(createClass, async (clicker: Uri) => {
        await doTheStuff(clicker, ItemType.classItem);
    });
    let structCreator = vscode.commands.registerCommand(createStruct, async (clicker: Uri) => {
        await doTheStuff(clicker, ItemType.structItem);
    });
    let enumCreator = vscode.commands.registerCommand(createEnum, async (clicker: Uri) => {
        await doTheStuff(clicker, ItemType.enumItem);
    });
    let interfaceCreator = vscode.commands.registerCommand(createInterface, async (clicker: Uri) => {
        await doTheStuff(clicker, ItemType.interfaceItem);
    });

    // context.subscriptions.push();
}

export enum ItemType {
    classItem = 'Class',
    enumItem = 'Enum',
    interfaceItem = 'Interface',
    structItem = 'Struct'
}
