import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { ProjectGatherer } from './headquarters/NamespaceGatherer';
import { Constructor } from './headquarters/Constructor';
import { PoliceOfficer } from './headquarters/PoliceOfficer';
import { GlobalStorageMgr } from './headquarters/GlobalStorageMgr';
import * as path from 'path';


// Extension related, to avoid manual changes
export const extensionName = 'csharp-stuff';

// Command names for basic types
const createClass = `${extensionName}.createClass`;
const createStruct = `${extensionName}.createStruct`;
const createEnum = `${extensionName}.createEnum`;
const createInterface = `${extensionName}.createInterface`;

// Command names for unity snippets
const createUnityScript = `${extensionName}.createUnityScript`;

// Command names for data types
const createXML = `${extensionName}.createXML`;
const createJSON = `${extensionName}.createJSON`;

// Command used to create custom items
const createCustomItem = `${extensionName}.createCustomItem`;
const openCustomItemTemplates = `${extensionName}.openCustomItemTemplates`;
const rewriteCustomItemTemplates = `${extensionName}.rewriteCustomItemTemplates`;


export async function activate(extensionContext: vscode.ExtensionContext) {
    console.log(`${extensionName} is now running!`);


    // Global storage
    const localPath = Uri.file(extensionContext.extensionPath);
    const extensionStorage = extensionContext.globalStorageUri;

    // User Snippet stuff
    const snippetUri = Uri.file(localPath.fsPath + path.sep + 'src/headquarters/UserSnippets.json');
    const actualUserSnippetsPath = Uri.file(extensionStorage.fsPath + path.sep + 'UserSnippets.json');

    //#region Methods called when the extension is just starting
    GlobalStorageMgr.ensureGlobalStorage(extensionStorage);
    GlobalStorageMgr.placeUserSnippetsTemplate(snippetUri, actualUserSnippetsPath);
    //#endregion


    // Used to create files
    let filename: string;
    let filenamePath: Uri;
    let namespace: string;
    async function createItem(clicker: Uri, itemType: ItemType) {
        try {
            filename = await PoliceOfficer.askUserForAName(itemType);
            filenamePath = Constructor.createNewFileUri(clicker, filename);
            namespace = await ProjectGatherer.generateNamespace(filenamePath, filename);
            if (!await Constructor.checkIfFileExist(filenamePath)) {
                Constructor.createNewItem(filenamePath, namespace, itemType, actualUserSnippetsPath);
            }
        } catch (error) {

        }
    }

    //#region create items commands:
    let classCreator = vscode.commands.registerCommand(createClass, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.classItem);
    });
    let structCreator = vscode.commands.registerCommand(createStruct, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.structItem);
    });
    let enumCreator = vscode.commands.registerCommand(createEnum, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.enumItem);
    });
    let interfaceCreator = vscode.commands.registerCommand(createInterface, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.interfaceItem);
    });
    let unitySnippetCreator = vscode.commands.registerCommand(createUnityScript, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.unityScript);
    });
    let xmlCreator = vscode.commands.registerCommand(createXML, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.xmlItem);
    });
    let jsonCreator = vscode.commands.registerCommand(createJSON, async (clicker: Uri) => {
        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.jsonItem);
    });
    //#endregion

    let customItemCreator = vscode.commands.registerCommand(createCustomItem, async (clicker: Uri) => {

        if (clicker === undefined) {
            PoliceOfficer.commandExecutedFromTheCommandPalette();
            return;
        }
        createItem(clicker, ItemType.customItem);
    });
    let openCustomItemTempl = vscode.commands.registerCommand(openCustomItemTemplates, async (clicker: Uri) => {
        vscode.commands.executeCommand('vscode.open', actualUserSnippetsPath);
    });
    let rewriteCustomItemTempl = vscode.commands.registerCommand(rewriteCustomItemTemplates, async (clicker: Uri) => {
        GlobalStorageMgr.placeUserSnippetsTemplate(snippetUri, actualUserSnippetsPath, true);
    });

    extensionContext.subscriptions.push(classCreator, structCreator, enumCreator, interfaceCreator, xmlCreator, jsonCreator, unitySnippetCreator, customItemCreator, openCustomItemTempl, rewriteCustomItemTempl);
}

export enum ItemType {
    classItem = 'Class',
    enumItem = 'Enum',
    interfaceItem = 'Interface',
    structItem = 'Struct',
    unityScript = 'UnityScript',
    xmlItem = 'xml',
    jsonItem = 'json',
    customItem = 'CustomItem'
}
