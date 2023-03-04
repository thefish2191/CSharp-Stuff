import * as vscode from 'vscode';
import * as path from 'path';

const separatorsRegex = /[\/\\]/gm;

// TODO: Rebuild the namespace generator using the new file spotter class
export class Namespacer {
    static dirToNamespace(dir: string): string {
        let temp = dir;
        if (temp.startsWith(path.sep)) {
            temp = temp.substring(1);
        }
        return temp.replace(separatorsRegex, '.');
    }
    static extractDir(parent: string, child: string): string {
        let temp = child.replace(parent, '');
        return temp;
    }
    static extractNamespace(parent: string, child: string): string {
        let temp = child.replace(parent, '');
        return temp;
    }
    /*
    async function findThePerfectNamespace(allTargets: string[], invoker: vscode.Uri) {
        let len = (allTargets).length;
        if (len <= 0) {
            console.log(`No csproj found, we're creating an raw namespace lol`);
            let workspaceFolder = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
            let invokerPath = invoker.fsPath;
            return createNamespace(workspaceFolder!, invokerPath);
        }
        if (len === 1) {
    
            let bestMatch = (allTargets).pop();
            let invokerPath = invoker.fsPath;
            return createNamespace(bestMatch!, invokerPath);
        }
        else if (len >= 2) {
            vscode.window.showErrorMessage('Nested projects are causing some issues, please resolve');
            throw Error(`Nested namespaces detected! Staring at ${allTargets[0]}.`);
        }
    }
    
    async function createNamespace(target: string, invokerPath: string): Promise<string> {
        let dirName = target.replace(folderNameRex, '');
        let almostNamespace = invokerPath.replace(target, '');
        let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
        return perfectNamespace;
    }
    */
}