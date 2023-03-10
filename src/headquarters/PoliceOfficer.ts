import { extensionName } from './../extension';
import * as vscode from 'vscode';
import { ItemType } from '../extension';

const validItemName = /(\w+_?)/;

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
            valueSelection: [0, tempItemName.length - fExt.length]
        });
        if ((itemName === undefined) || (itemName === '')) {
            itemName = type;
        }
        if (!itemName.match(validItemName)) {
            itemName = type;
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
    static reportFileExit() {
        vscode.window.showErrorMessage(`There is already an item with that name! Please try again with another filename`);
    }
    static decideExt(itemType: ItemType): string {
        switch (itemType) {
            case 'Xml':
                return '.xml';
            case 'JSON':
                return '.Json';
            default:
                return '.cs';
        }
    }
}
