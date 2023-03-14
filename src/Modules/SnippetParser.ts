import { ItemType } from './../ItemCreator';
import Snippets from './Snippets.json';
import { SnippetString, Uri } from 'vscode';
import * as vscode from 'vscode';


export class SnippetParser {
    static async getDefaultSnippet(snippetType: ItemType): Promise<string[]> {
        let rawSnippet: string[] = [];
        let snippetString: string = '';
        switch (snippetType) {
            case ItemType.empty:
                rawSnippet = Snippets.empty.body;
                break;
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
            default: {
                const xError: never = snippetType;
                throw new Error(xError);
            }
        }
        rawSnippet.forEach(element => {
            snippetString += element + '\r';
        });
        return [snippetString,];
    }
}