import * as vscode from 'vscode';
import { GlobPattern } from "vscode";

const removeFileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;


export class FileSpotter {
    static async findFiles(pattern: GlobPattern) {
        let matchesDirs: string[] = [];
        let rawDirs = await vscode.workspace.findFiles(pattern);
        rawDirs.forEach(element => {
            matchesDirs.push(element.fsPath);
        });
        return matchesDirs;
    }
    static async compareAndReturn(dirsToCompare: string[], compareWith: string) {
        let dirsThatMatch: string[] = [];
        dirsToCompare.forEach(item => {
            let tempDir = item.replace(removeFileNameRex, '');
            if (compareWith.startsWith(tempDir)) {
                dirsThatMatch.push(tempDir);
            }
        });
        return dirsThatMatch;
    }
}
