import { ItemType } from '../extension';
import * as vscode from 'vscode';
import { Uri } from 'vscode';
import { PoliceOfficer } from './PoliceOfficer';
import * as path from 'path';
import { SnippetParser } from './SnippetParser';

export class Constructor {
    static async checkIfFileExist(file: Uri): Promise<boolean> {
        let fileExist = true;
        try {
            await vscode.workspace.fs.readFile(file);
            PoliceOfficer.reportFileExist();
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
    static async createNewItem(file: Uri, namesp: string, itemType: ItemType, actualUserSnippetsPath: Uri) {
        if (await this.checkIfFileExist(file) === false) {
            try {
                await vscode.workspace.fs.writeFile(file, new Uint8Array());
                vscode.commands.executeCommand('vscode.open', file).then(async () => {
                    await vscode.window.activeTextEditor?.insertSnippet(await SnippetParser.createSnippet(itemType, namesp, actualUserSnippetsPath));
                }
                );
            } catch (error) {
                console.log(error);
            }
        }
    }
}
