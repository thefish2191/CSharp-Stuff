import * as vscode from 'vscode';
import { rename } from 'fs';
import { ItemInfo } from './extension';

const dirsRegex = /[\/\\]/g;

function parseDirToNamespace(dir: string): string {
    let namespace = dir;
    namespace = namespace.replace(dirsRegex, '.');
    namespace = namespace.replace(' ', '');
    return namespace;
}

/**
 * Generate a namespace directly from the caller uri
 * @param caller 
 * @returns 
 */
function generateRawNamespace(caller: ItemInfo): string {
    let preName = caller.rootFolderName + caller.callerDir;
    return parseDirToNamespace(preName);
}
function generateFancyNamespace(caller: ItemInfo, proj: ItemInfo): string {

    let newNamespace = ``;
    newNamespace = proj.callerNameNoEx + caller.callerDir;
    console.log(`New namespace is: ${newNamespace}`);


    newNamespace = parseDirToNamespace(newNamespace);
    return newNamespace;
}
export function getNamespace(caller: ItemInfo): string {
    /*
    try {
        let project = projectFinder.findCsproj(caller);
        try {
            let fancyNamespace = generateFancyNamespace(caller, project);
            vscode.window.showInformationMessage(fancyNamespace);
            return fancyNamespace;
        } catch (error) {
            console.log(`We found a .csproj ar ${project.callerUri.fsPath} but we got stuck somewhere from there!`);
            console.log(`Error generating fancy name 🥲`);
            console.log(error);
        }
    } catch (error) {
        console.log(`No .cjproj found!`);
    }
    */
    console.log(`Creating a raw namespace...`);
    return generateRawNamespace(caller);
};