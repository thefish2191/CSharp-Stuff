import * as vscode from 'vscode';
import { Uri } from 'vscode';
import * as path from 'path';

const filenameRegex = /([^\\|\/]+[\w\d\s]+)$/;
const multiSlashes = /(\/{2,}|\\{2,})/gm;


export async function createItem(clicker: Uri, itemType: ItemType) {
    // ! An open workspace can lead to errors: If the workspace points to a folder than doesn't exist, this extension will create it. This may be undesired
    // TODO: verify if folder exist before creating anything:
    let selectedRootFolder = await determinateRootFolder(clicker); 
    let localPath = ''; // used to give a user a clue on the destination to create their files. automatically added to the filename at the end.

    if (clicker !== undefined) {
        localPath =  determinateLocalPath(selectedRootFolder,clicker);
    }
    let fileExt = decideExt(itemType);
    let filename = await askForItemName(localPath, itemType.toString(), fileExt);

    let fileAsUri = Uri.file(selectedRootFolder + filename);
    let fileExist = await checkIfFileExist(fileAsUri);
    if (!fileExist) {
        vscode.workspace.fs.writeFile(fileAsUri, new Uint8Array());
    }
    else{
        vscode.window.showErrorMessage(`There is already an item with that name! Please try again with another filename`);
    }
}
async function askForItemName(localPath:string, clue:string, extension:string) {
    let itemName: string | undefined;
    let fullLength = localPath.length + clue.length;
    itemName = await vscode.window.showInputBox({
        "ignoreFocusOut":false,
        "placeHolder": "Make sure you give it a name",
        "prompt":"Give it a fancy name",
        "title": "Adding a new item",
        "value":localPath + clue + extension,
        valueSelection: [localPath.length, fullLength]
    });
    if (itemName === undefined || itemName === '') {
        throw new Error(`User didn't provided a name`);
    }
    itemName = itemName.replace(multiSlashes, path.sep);
    if (itemName.startsWith('/') || itemName.startsWith('\\')) {
        itemName.substring(1);
    }
    if (!itemName.endsWith(extension)) {
        itemName = itemName + extension;
    }
    return itemName;
}

function determinateLocalPath(rootFolder:string, clicker: Uri) {
    let tempClicker = clicker.fsPath + path.sep;
    console.log(clicker);
    console.log(clicker);
    
    let localPath = tempClicker.replace(rootFolder, '');
    console.log(`The local path is: ${localPath}`);
    return localPath;
}

async function determinateRootFolder(clicker: Uri): Promise<string> {
    if (clicker === undefined) {
        return await selectARootFolder();
    }
    else {
        return await assignRootFolder(clicker);
    }
}
async function selectARootFolder(): Promise<string> {
    let folders = vscode.workspace.workspaceFolders;
    let foldersArray: string[] = [];
    let selectedRootFolder: string;
    if (folders === undefined) {
        vscode.window.showErrorMessage(`No open Folder!`);
        throw new Error(`No open Folder!`);
    }
    else if (folders.length === 1) {
        selectedRootFolder = folders[0].uri.fsPath + path.sep;
    }
    else {
        folders.forEach(element => {
            foldersArray.push(element.uri.fsPath);
        });
        let userOption = await vscode.window.showQuickPick(foldersArray);
        if (userOption !== undefined) {
            selectedRootFolder = userOption;
        }
    }
    return selectedRootFolder!;
}
async function assignRootFolder(clicker: Uri) {
    let temClicker = clicker.fsPath+  path.sep;
    let folders = vscode.workspace.workspaceFolders;
    let foldersArray: string[] = [];
    let matchFolder: string[] = [];
    let assignedRootFolder: string;
    if (folders === undefined) {
        vscode.window.showErrorMessage(`No open Folder!`);
        throw new Error(`No open Folder!`);
    }
    else {
        folders.forEach(element => {
            foldersArray.push(element.uri.fsPath + path.sep);
        });
    }
    foldersArray.forEach(element => {
        if (temClicker.startsWith(element)) {
            matchFolder.push(element);
        }
    });
    assignedRootFolder = matchFolder[0];
    return assignedRootFolder;
    
}
function decideExt(itemType: ItemType): string {
    switch (itemType) {
        case ItemType.empty:
           return '.txt';
        case ItemType.xmlItem:
            return '.xml';
        case ItemType.jsonItem:
            return '.json';
        default:
            return '.cs';
    }
}

async function checkIfFileExist(file: Uri): Promise < boolean > {
    let fileExist = true;
    try {
        await vscode.workspace.fs.readFile(file);
    } catch(error) {
        if (error instanceof Error) {
            if (error.name === 'EntryNotFound (FileSystemError)') {
                fileExist = false;
            }
        }
    }
    return fileExist;
}

export enum ItemType {
    empty = 'Empty',
    classItem = 'Class',
    enumItem = 'Enum',
    interfaceItem = 'Interface',
    structItem = 'Struct',
    unityScript = 'UnityScript',
    xmlItem = 'Xml',
    jsonItem = 'Json'
}
    
    // async function selectParentAutomatically(clicker: Uri) {
    //     let projects = await vscode.workspace.findFiles(`**/*.csproj`);
    //     let projectsArray: string[] = [];
    //     let userSelection: string;
    //     let rootFolderName = vscode.workspace.getWorkspaceFolder(clicker)?.name!;
    // }
    
    // async function allowUserToSelectParent(path: string): Promise<string> {
    
    //     let projects = await vscode.workspace.findFiles(`**/*.csproj`);
    //     let projectsArray: string[] = [];
    //     let userSelection: string;
    
    //     if (projects !== undefined) {
    //         projects.forEach(element => {
    //             projectsArray.push(element.fsPath);
    //         });
    //     }
    
    //     // Checks if there is no folder open
    //     if (projectsArray.length === 0) {
    //         vscode.window.showErrorMessage(`No csproj file was found!`);
    //         userSelection = await selectARootFolder();
    //     }
    //     // If there is only one open folder, there is no need to ask user the destination
    //     else if (projectsArray.length === 1) {
    //         userSelection = projectsArray[0];
    //     }
    //     else {
    //         let userSelectionPre = await vscode.window.showQuickPick(projectsArray, {
    //             "canPickMany": false,
    //             "ignoreFocusOut": false,
    //             "title": "Select a parent project"
    //         });
    //         if (userSelectionPre === undefined) {
    //             throw new Error(`User didn't selected a folder!`);
    //         }
    //         else {
    //             userSelection = userSelectionPre;
    //         }
    //     }
    //     userSelection = userSelection.replace(filenameRegex, '');
    //     return userSelection;
    // }