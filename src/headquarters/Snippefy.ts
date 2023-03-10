import { isNativeError } from 'util/types';
import { ItemType } from './../extension';
import * as vscode from 'vscode';


export class SharpSnippet {
    static createSnippet(itemType: ItemType, namesp: string): vscode.SnippetString {
        switch (itemType) {
            case 'Class':
            case 'Enum':
            case 'Interface':
            case 'Struct':
                return basicCSSnippet(itemType, namesp);
            case 'Xml':
                return xmlSnippet();
            case 'JSON':
                return jsonSnippet();
        }
        return new vscode.SnippetString(); function basicCSSnippet(itemType: ItemType, namesp: string): vscode.SnippetString {
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
            return new vscode.SnippetString(fancyBody!);
        }
        function xmlSnippet(): vscode.SnippetString {
            let rawBody = [
                "\r",
                "<$TM_FILENAME_BASE>\r",
                "\t$0\r",
                "</$TM_FILENAME_BASE>\r"];
            let declaration = `<?xml version="1.0" encoding="UTF-8"?>`;
            let bodySnippet: string = '';
            rawBody.forEach(element => {
                bodySnippet = bodySnippet + element;
            });
            return new vscode.SnippetString(declaration + bodySnippet);
        }
        function jsonSnippet(): vscode.SnippetString {
            return new vscode.SnippetString('{\r\t$0\r}');
        }
    }
}
