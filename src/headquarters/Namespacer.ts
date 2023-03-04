import * as vscode from 'vscode';

const separatorsRegex = /[\/\\]/gm;

// TODO: Rebuild the namespace generator using the new file spotter class
export class Namespacer {
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