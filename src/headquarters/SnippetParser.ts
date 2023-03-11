import { ItemType } from './../extension';
import Snippets from './Snippets.json';
import { SnippetString } from 'vscode';

export class SnippetParser {
    static getSnippet(itemType: ItemType, ...vars: string[]): SnippetString {
        let snippetString = this.readSnippets(itemType);
        for (let index = 0; index < vars.length; index++) {
            let indexString = '[VAR' + index.toString() + ']';
            snippetString = snippetString.replace(indexString, vars[index]);
        }
        return new SnippetString(snippetString);
    }

    private static readSnippets(type: ItemType): string {
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
            case ItemType.xmlItem:
                rawSnippet = Snippets.xml.body;
                break;
            case ItemType.jsonItem:
                rawSnippet = Snippets.json.body;
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