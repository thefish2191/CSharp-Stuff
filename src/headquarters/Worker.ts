import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { PoliceOfficer } from './PoliceOfficer';
import * as path from 'path';

export class Worker {
    static async checkIfFileExist(file: Uri): Promise<boolean> {
        let fileExist = true;
        try {
            await vscode.workspace.fs.readFile(file);
            PoliceOfficer.reportFileExit();
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'EntryNotFound (FileSystemError)') {
                    fileExist = false;
                }
            }
        }
        return fileExist;
    }
    static createNewFileUri(invoker: Uri, filename: string): Uri {
        return Uri.file(invoker.fsPath + path.sep + filename);
    }
    static async createNewItem(file: Uri, namespace: string) {
        if (await this.checkIfFileExist(file) === false) {
            console.log(`The new snippet is: ${this.createSnippet()}`);

            try {
                console.log(`Creating new file!`);
                await vscode.workspace.fs.writeFile(file, new Uint8Array());
                vscode.commands.executeCommand('vscode.open', file);
                vscode.window.activeTextEditor?.insertSnippet(new vscode.SnippetString());
            } catch (error) {
                console.log(error);
            }
        }
    }
    static createSnippet() {
    }
}