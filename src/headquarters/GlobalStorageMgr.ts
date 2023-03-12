import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { SnippetParser } from './SnippetParser';

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
    static async getUserSnippetsNames(userSnippets: Uri) {
        let rawSnippets = await vscode.workspace.fs.readFile(userSnippets);
        let snippetsArray = [];

        let rawSnippetFile = JSON.parse(rawSnippets.toString());
        for (let i in rawSnippetFile) {
            snippetsArray.push(i);
        }
        return snippetsArray;
    }
    static async getUserSnippet(snippetName: string, userSnippets: Uri) {
        let rawSnippets = await vscode.workspace.fs.readFile(userSnippets);
        let rawSnippetFile = JSON.parse(rawSnippets.toString());
        let desiredSnippet = rawSnippetFile[snippetName]['body'];
        return desiredSnippet;
    }
}
