import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { ProjectGatherer } from './headquarters/NamespaceGatherer';
import { Constructor } from './headquarters/Constructor';
import { PoliceOfficer } from './headquarters/PoliceOfficer';

// Extension related, to avoid manual changes
export const extensionName = 'csharp-stuff';

// Command names for basic types
const createClass = `${extensionName}.createClass`;
const createStruct = `${extensionName}.createStruct`;
const createEnum = `${extensionName}.createEnum`;
const createInterface = `${extensionName}.createInterface`;

// Command names for data types
const createXML = `${extensionName}.createXML`;
const createJSON = `${extensionName}.createJSON`;

export async function activate(context: vscode.ExtensionContext) {
    let filename: string;
    let filenamePath: Uri;
    let namespace: string;
    async function createItem(clicker: Uri, itemType: ItemType) {
        filename = await PoliceOfficer.askUserForAName(itemType);
        filenamePath = Constructor.createNewFileUri(clicker, filename);
        namespace = await ProjectGatherer.generateNamespace(clicker);
        if (!await Constructor.checkIfFileExist(filenamePath)) {
            Constructor.createNewItem(filenamePath, namespace, itemType);
        }
    }
    let classCreator = vscode.commands.registerCommand(createClass, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.classItem);
    });
    let structCreator = vscode.commands.registerCommand(createStruct, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.structItem);
    });
    let enumCreator = vscode.commands.registerCommand(createEnum, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.enumItem);
    });
    let interfaceCreator = vscode.commands.registerCommand(createInterface, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.interfaceItem);
    });
    let xmlCreator = vscode.commands.registerCommand(createXML, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.xmlItem);
    });
    let jsonCreator = vscode.commands.registerCommand(createJSON, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        await createItem(clicker, ItemType.jsonItem);
    });
    let testCommand = vscode.commands.registerCommand('testCommand', async (clicker: Uri) => {
        if (clicker === undefined) {
        }
    });
    context.subscriptions.push(classCreator, structCreator, enumCreator, interfaceCreator, xmlCreator, jsonCreator, testCommand);
}

export enum ItemType {
    classItem = 'Class',
    enumItem = 'Enum',
    interfaceItem = 'Interface',
    structItem = 'Struct',
    xmlItem = 'xml',
    jsonItem = 'json',
}
