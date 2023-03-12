import Snippets from './Snippets.json';
import { ItemType } from './../extension';
import { SnippetString } from 'vscode';

export class SnippetParser {
    static getDefaultSnippet(itemType: ItemType, namesp: string): SnippetString {
        let snippetString = this.getSnippets(itemType);
        snippetString = snippetString.replace('[namespace]', namesp);
        return new SnippetString(snippetString);
    }
    static convertSnippet(snippet: string[], namesp: string) {
        let snippetString: string = '';
        snippet.forEach(element => {
            snippetString += element + '\r';
        });
        snippetString = snippetString.replace('[namespace]', namesp);
        return new SnippetString(snippetString);
    }
    private static getSnippets(type: ItemType): string {
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
