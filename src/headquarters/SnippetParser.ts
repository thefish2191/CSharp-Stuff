import Snippets from './Snippets.json';
import { ItemType } from './../extension';
import { SnippetString, Uri } from 'vscode';
import { GlobalStorageMgr } from './GlobalStorageMgr';
import * as vscode from 'vscode';

export class SnippetParser {
    static async createSnippet(itemType: ItemType, namesp: string, actualUserSnippetsPath: Uri): Promise<SnippetString> {
        let snippetString = await this.getSnippets(itemType, actualUserSnippetsPath);
        snippetString = snippetString.replace('[namespace]', namesp);
        return new SnippetString(snippetString);
    }
    private static async getSnippets(type: ItemType, actualUserSnippetsPath: Uri): Promise<string> {
        let rawSnippet: string[] = [];
        switch (type) {
            case ItemType.classItem:
                rawSnippet = Snippets.class.body;
                break;
            case ItemType.enumItem:
                rawSnippet = Snippets.enum.body;
                break;
            case ItemType.interfaceItem:
                rawSnippet = Snippets.interface.body;
                break;
            case ItemType.structItem:
                rawSnippet = Snippets.struct.body;
                break;
            case ItemType.unityScript:
                rawSnippet = Snippets.unityScript.body;
                break;
            case ItemType.xmlItem:
                rawSnippet = Snippets.xml.body;
                break;
            case ItemType.jsonItem:
                rawSnippet = Snippets.json.body;
                break;
            case ItemType.customItem:
                // TODO add a method here, to get the user snippets
                let userSnippets: any;
                try {
                    userSnippets = await GlobalStorageMgr.getUserSnippetsNames(actualUserSnippetsPath);
                } catch {
                    vscode.window.showErrorMessage('No custom items where found! Please run the command: "Open Custom Item Templates" or "Rewrite Custom Item Templates" on the command palette');
                }
                let userSelection = await vscode.window.showQuickPick(userSnippets, {
                    "ignoreFocusOut": false,
                    "title": "Please select your custom item to create it"
                });
                let actualSnippet = await GlobalStorageMgr.getUserSnippet(userSelection!, actualUserSnippetsPath);
                rawSnippet = actualSnippet;
                break;
            default: {
                const xError: never = type;
                throw new Error(xError);
            }
        }
        let snippetString: string = '';
        rawSnippet.forEach(element => {
            snippetString += element + '\r';
        });
        return snippetString;
    }
}
