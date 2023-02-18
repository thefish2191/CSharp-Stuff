import * as vscode from 'vscode';
import * as namespaceGenerator from './namespaceGenerator';
import * as os from 'os';

// A reference to all csproj in the root
let result: string[];


export async function activate(context: vscode.ExtensionContext) {
    updateProjectList();
    vscode.window.onDidChangeActiveTerminal(() => updateProjectList());
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (invoker: vscode.Uri) => {
        result.forEach(element => {
            console.log(element);
        });
    });
    let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
    });
}
// This method is called when the extension is deactivated
export function deactivate() { }



function updateProjectList() {
    console.log(`Updating project list`);

    try {
        vscode.workspace.findFiles('**/*.csproj')
            .then((dir: vscode.Uri[]) => {
                result = new Array();
                dir.forEach(element => {
                    let path = element.fsPath;
                    result.push(path);
                });
            });
    } catch (error) {
        console.log(error);
    }
}

export class ItemInfo {
    static fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;
    static fileExNameRex = /\.+([\w\d])+$/gm;
    static osSeparator = os.platform() === "win32" ? "\\" : "/";

    rootFolderUri: vscode.Uri;
    rootFolderName: string;

    callerUri: vscode.Uri;
    callerNameWithEx: string;
    callerNameNoEx: string;
    callerDir: string;

    constructor(item: vscode.Uri) {
        let tempCallerUri = vscode.Uri.file(item.fsPath)!.fsPath;
        let tempWSFolder = vscode.Uri.file(vscode.workspace.getWorkspaceFolder(item)!.uri.fsPath).fsPath;
        let tempDir = tempCallerUri.replace(tempWSFolder, '');

        let nameWithEx = item.fsPath.match(ItemInfo.fileNameRex)?.toString();
        let nameNoEx = nameWithEx?.replace(ItemInfo.fileExNameRex, '');

        this.rootFolderUri = vscode.workspace.getWorkspaceFolder(item)!.uri;
        this.rootFolderName = vscode.workspace.getWorkspaceFolder(item)!.name;


        this.callerUri = vscode.Uri.file(item.fsPath);
        this.callerNameWithEx = item.fsPath.match(ItemInfo.fileNameRex)?.toString()!;
        this.callerNameNoEx = nameNoEx!;
        this.callerDir = tempDir;

    }
}