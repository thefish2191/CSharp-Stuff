import { ItemType } from './../extension';
import * as vscode from 'vscode';
export class SharpSnippet {
    static createSnippet(itemType: ItemType, namesp: string) {
        let rawBody = [
            "namespace [NAMESPACE];\r\r",
            "public [ITEM] $TM_FILENAME_BASE\r",
            "{\r",
            "    $0\r",
            "}\r"
        ];
        let fancyBody: string = '';
        rawBody.forEach(element => {
            let temp = element;
            temp = temp.replace('[NAMESPACE]', namesp);
            temp = temp.replace('[ITEM]', itemType.toLowerCase());
            fancyBody = fancyBody + temp;
        });
        return new vscode.SnippetString(fancyBody);
    }
}