import * as vscode from 'vscode';
import { Uri } from 'vscode';

export class GlobalStorageMgr {
    static async ensureGlobalStorage(extensionStorage: Uri) {
        try {
            vscode.workspace.fs.createDirectory(extensionStorage);
        } catch (error) {
        }
    }
    static async placeUserSnippetsTemplate(snippetUri: Uri, destination: Uri) {
        try {
            vscode.workspace.fs.copy(snippetUri, destination);
        } catch (error) {
        }
    }
    static async readUserSnippets(snippetUri: Uri) {
        let rawSnippets = await vscode.workspace.fs.readFile(snippetUri);
        console.log(rawSnippets.toString());
        let actualSnippets = JSON.parse(rawSnippets.toString());
        console.log(actualSnippets);

    }
}