import * as vscode from 'vscode';
import * as callerInfo from './callerInfoGatherer';
import { rename } from 'fs';
import { getCallerInfo } from './callerInfoGatherer';
import * as projectFinder from './projectFinder';

const dirsRegex = /[\/\\]/g;
const endOfLine = /.$/;
const startOfLine = /^\\/;



function parseDirToNamespace(dir: string): string {
    let namespace = dir;
    namespace = namespace.replace(endOfLine, '');
    namespace = namespace.replace(startOfLine, '');
    namespace = namespace.replace(' ', '');
    namespace = namespace.replace(dirsRegex, '.');
    return namespace;
}

/**
 * Generate a namespace directly from the caller uri
 * @param caller 
 * @returns 
 */
function generateRawNamespace(caller: vscode.Uri): string {
    let info = callerInfo.getCallerInfo(caller);
    let preName = info.rootFolderName + info.callerDir;
    return parseDirToNamespace(preName);
}
function generateFancyNamespace(caller: vscode.Uri, proj: vscode.Uri): string {

    let newNamespace = ``;
    let callerInfo = getCallerInfo(caller);
    newNamespace = callerInfo.callerDir;
    console.log(`New namespace is: ${newNamespace}`);


    newNamespace = parseDirToNamespace(newNamespace);
    return newNamespace;
}
export function getNamespace(caller: vscode.Uri): string {
    let project: vscode.Uri;
    try {
        project = projectFinder.findCsproj(caller);
        try {
            let fancyNamespace = generateFancyNamespace(caller, project);
            vscode.window.showInformationMessage(fancyNamespace);
            return fancyNamespace;
        } catch (error) {
            console.log(`We found a .csproj ar ${project.fsPath} but we got stuck somewhere from there!`);
            console.log(`Error generating fancy name 🥲`);
            console.log(error);
        }
    } catch (error) {
        console.log(`No .cjproj found!`);
    }

    console.log(`Creating a raw namespace...`);
    return generateRawNamespace(caller);
};