import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { ItemType, createItem } from './ItemCreator';

// Avoid manual Changes
const extensionName = 'dotnet-helper';
// All commands names
const addClassCommand = `${extensionName}.addEmpty`;

export function activate(context: vscode.ExtensionContext) {

    console.log(`${extensionName} is now active!`);
    //#region All commands are places right here:
    let addEmpty = vscode.commands.registerCommand(addClassCommand, (clicker: Uri) => { createItem(clicker, ItemType.empty); });
    //#endregion 
    context.subscriptions.push(addEmpty);
}
