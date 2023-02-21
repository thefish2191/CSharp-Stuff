import * as vscode from 'vscode';
import * as os from 'os';
import path = require('path');
import { url } from 'inspector';
import { stringify } from 'querystring';
import { promises } from 'fs';
import { time } from 'console';


let rootDir: string;

// const fileNameRex = /(([/\\][\w\d\s\-\_\(\)\,\=\;]+)\.*([\w\d])*)$/gm; // testing a new one
const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const separatorsRegex = /[\/\\]/gm;
const folderName = /^(.*)([\/\\])/gm;

export async function activate(context: vscode.ExtensionContext) {
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (invoker: vscode.Uri) => {
        let start = Date.now();
        console.log(await doAllTheStuff(invoker));
        let finish = Date.now();
        console.log(`It took ${finish - start} ms`);

    }
    );

}
async function doAllTheStuff(invoker: vscode.Uri): Promise<string> {
    let allProjects = updateProjectList();
    let allTargets = getMatches(await (allProjects), invoker);
    var namespace = await findThePerfectNamespace((await allTargets), invoker);
    return namespace!;

}


// This method is called when the extension is deactivated
export function deactivate() { }

async function updateProjectList() {
    let allProjectsDirs: string[] = [];
    let projects = await vscode.workspace.findFiles('**/*.csproj');
    projects.forEach(element => {
        allProjectsDirs.push(element.fsPath);
    });
    return allProjectsDirs;
}

async function getMatches(allProjects: string[], invoker: vscode.Uri) {
    let possibleTarget: string[] = [];
    allProjects.forEach(element => {
        let temp = element.replace(fileNameRex, '');
        if (invoker.fsPath.startsWith(temp)) {
            possibleTarget.push(temp);
        }
    });
    return possibleTarget;
}

async function findThePerfectNamespace(allTargets: string[], invoker: vscode.Uri) {
    let len = (await allTargets).length;
    if (len <= 0) {
        console.log(`No csproj found, we're creating an raw namespace lol`);
        let workspaceFolder = vscode.workspace.getWorkspaceFolder(invoker)?.uri.fsPath;
        let invokerPath = invoker.fsPath;
        return getNamespace(workspaceFolder!, invokerPath);
    }
    if (len === 1) {

        let bestMatch = await (await allTargets).pop();
        let invokerPath = invoker.fsPath;
        return getNamespace(bestMatch!, invokerPath);
    }
    else if (len >= 2) {
        vscode.window.showErrorMessage('Nested projects are causing some issues, please resolve');
        throw Error('Nested namespaces detected!');
    }
}

async function getNamespace(target: string, invokerPath: string): Promise<string> {
    let test = await vscode.workspace.findFiles(target + path.sep + '*.csproj');
    let dirName = target.replace(folderName, '');
    let almostNamespace = invokerPath.replace(target, '');
    let perfectNamespace = dirName + almostNamespace.replace(separatorsRegex, '.');
    return perfectNamespace;
}

