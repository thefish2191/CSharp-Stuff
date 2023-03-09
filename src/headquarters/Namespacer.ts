import * as vscode from 'vscode';
import * as path from 'path';
import { Uri } from 'vscode';
import { Orphanage } from './Orphanage';
import { FileSpotter } from './FileSpotter';
import { PoliceOfficer } from './PoliceOfficer';



const separatorsRegex = /[\/\\]/gm;

let clickerPath: string;
let clickerPathRelative: string;
let allParentProjects: string[] = [];
let baseDir: string;
let candidate: string;

// A pattern is used to find files that matches it
// This pattern matches all files, in the root folder and inside subfolders,
// files with the extension .csproj
const csprojPattern = '**/*.csproj';


export class Namespacer {
    static async generateNamespace(clicker: Uri): Promise<string> {
        let allProjectsPaths = await FileSpotter.findFilesThanMatchPattern(csprojPattern);
        let rootFolderName = vscode.workspace.getWorkspaceFolder(clicker)?.name!;
        // full path where click was made
        clickerPath = clicker.fsPath!;
        // local dir where click was made, only for raw namespace
        clickerPathRelative = clicker.fsPath.replace(vscode.workspace.getWorkspaceFolder(clicker)?.uri.fsPath!, '');
        allParentProjects = Orphanage.findParents(allProjectsPaths, clickerPath);
        if (allParentProjects.length > 1) {
            PoliceOfficer.reportMultipleParent(allParentProjects);
            return '';
        }
        try {
            baseDir = FileSpotter.getFileInfo(allParentProjects[0]).pathDir;
            candidate = FileSpotter.getFileInfo(allParentProjects[0]).fileNameNoExt;
            candidate = candidate + clickerPath.replace(baseDir, '');
        } catch (error) {
            candidate = rootFolderName;
            if (clickerPathRelative !== '') {
                candidate = candidate + clickerPathRelative;
            }
        }
        return Namespacer.dirToNamespace(candidate);
    }
    static dirToNamespace(dir: string): string {
        let temp = dir;
        if (temp.startsWith(path.sep)) {
            temp = temp.substring(1);
        }
        return temp.replace(separatorsRegex, '.');
    }
}
