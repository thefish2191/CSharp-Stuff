import { GlobPattern } from 'vscode';
import * as vscode from 'vscode';

const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
const folderNameRex = /^(.*)([\/\\])/gm;
const fileExtensionRegex = /[.]([\w\d]*)$/gm;

export class FileSpotter {
    static async findFilesThanMatchPattern(pattern: GlobPattern) {
        let matchesDirs: string[] = [];
        let rawDirsWithName = await vscode.workspace.findFiles(pattern);
        rawDirsWithName.forEach(element => {
            matchesDirs.push(element.fsPath);
        });
        return matchesDirs;
    }
    static getFileInfo(dirsToGather: string): FileInfo {
        let elementPath = dirsToGather;
        let elementName = dirsToGather.replace(folderNameRex, '');
        let elementNameNoExt = elementName.replace(fileExtensionRegex, '');
        let folderDir = dirsToGather.replace(fileNameRex, '');
        let fileInfo: FileInfo = { fileName: elementName, fileNameNoExt: elementNameNoExt, fullPath: elementPath, pathDir: folderDir };
        return fileInfo;
    }
    static searchParentProjects(knownProjects: string[], targetDestination: string) {
        let matchProjects: string[] = [];
        knownProjects.forEach(item => {
            let tempDir = item.replace(fileNameRex, '');
            if (targetDestination.startsWith(tempDir)) {
                matchProjects.push(item);
            }
        });
        return matchProjects;
    }
}

/**
 * Holds the information of a file
 * @param filename The file name, with extension.
 * @param fileNameNoExt The file name, without the extension.
 * @param fullPath The file path in disk, including name and extension.
 * @param pathDir The parent folder of the file.
 */
interface FileInfo {
    fileName: string,
    fileNameNoExt: string,
    fullPath: string,
    pathDir: string,
}