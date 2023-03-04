import * as vscode from 'vscode';
import { ItemType } from '../extension';
import { strict } from 'assert';
import { stringify } from 'querystring';

const validItemName = /(\w+_?)/;

export class PoliceOfficer {
    static async askUserForAName(type: ItemType): Promise<string> {
        let itemName: string | undefined;
        itemName = await vscode.window.showInputBox({
            title: `Creating a new ${type}`,
            ignoreFocusOut: false,
            placeHolder: 'Give it a name',
            prompt: `Great ${type} names uses letters and underscores (_) only!`,
            value: `My${type}.cs`,
            valueSelection: [0, 99]
        });
        if ((itemName === undefined) || (itemName === '')) {
            itemName = type;
        }
        if (!itemName.match(validItemName)) {
            itemName = type;
        }
        return itemName;
    }
}