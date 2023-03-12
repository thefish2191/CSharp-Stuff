import { extensionName } from './../extension';
import * as vscode from 'vscode';
import { ItemType } from '../extension';
import * as path from 'path';

// const validItemName = /(\w+_?)/;
const multiSlashes = /(\/{2,}|\\{2,})/gm;

export class PoliceOfficer {
    static async askUserForAName(type: ItemType): Promise<string> {
        let fExt = this.decideExt(type);
        let tempItemName = `My${type + fExt}`;
        let itemName: string | undefined;
        itemName = await vscode.window.showInputBox({
            title: `Creating a new ${type}`,
            ignoreFocusOut: false,
            placeHolder: 'Give it a name',
            prompt: `Great ${type} names uses letters and underscores (_) only!`,
            value: tempItemName,
            valueSelection: [0, tempItemName.length - fExt.length],
        });
        if ((itemName === undefined) || (itemName === '')) {
            vscode.window.showErrorMessage('Operation cancelled by user');
            throw new Error(`Operation cancelled by user`);
        }
        if (itemName.endsWith(fExt)) {
            itemName = itemName + fExt;
        }
        itemName = itemName.replace(multiSlashes, path.sep);
        if (itemName.startsWith('/') || itemName.startsWith('\\')) {
            itemName.substring(1);
        }
        return itemName;
    }
    static reportMultipleParent(parentProjects: string[]) {
        vscode.window.showErrorMessage(`The destination directory has ${parentProjects.length} parent projects.\r Nesting projects are not supported by this extension, we can't decide the correct namespace. See DEBUG CONSOLE for more information.`);
        this.logMultipleParent(parentProjects);
    }
    private static logMultipleParent(parents: string[]) {
        console.log(`${extensionName} Error creating namespaces:`);
        console.log(`The following projects were found:`);
        parents.forEach(element => {
            console.log(element);
        });
    }
    static reportFileExist() {
        vscode.window.showErrorMessage(`There is already an item with that name! Please try again with another filename`);
    }
    static commandExecutedFromTheCommandPalette() {
        vscode.window.showErrorMessage("This command is still not mean to be run from the command palette. But it will be soon");
    }
    static decideExt(itemType: ItemType): string {
        switch (itemType) {
            case 'xml':
                return '.xml';
            case 'json':
                return '.json';
            default:
                return '.cs';
        }
    }
}
