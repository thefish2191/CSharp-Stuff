import { GlobPattern } from 'vscode';
import * as vscode from 'vscode';

export const fileNameRex = /([\\\/]){1}([^\/\\]*.)$/gm;
export const folderNameRex = /^(.*)([\/\\])/gm;
export const fileExtensionRegex = /[.]([\w\d]*)$/gm;

export class FileSpotter {
    static async findFilesThanMatchPattern(pattern: GlobPattern) {
        let matchesDirs: string[] = [];
        let rawDirsWithName = await vscode.workspace.findFiles(pattern);
        rawDirsWithName.forEach(element => {
            matchesDirs.push(element.fsPath);
        });
        return matchesDirs;
    }
    static getFileInfo(filePath: string): FileInfo {
        let elementPath = filePath;
        let elementName = filePath.replace(folderNameRex, '');
        let elementNameNoExt = elementName.replace(fileExtensionRegex, '');
        let folderDir = filePath.replace(fileNameRex, '');
        let fileInfo: FileInfo = { fileName: elementName, fileNameNoExt: elementNameNoExt, fullPath: elementPath, pathDir: folderDir };
        return fileInfo;
    }
}

/**
 * Holds the information of a file
 * @param filename The file name, with extension.
 * @param fileNameNoExt The file name, without the extension.
 * @param fullPath The file path in disk, including name and extension.
 * @param pathDir The parent folder of the file.
 */
export interface FileInfo {
    fileName: string,
    fileNameNoExt: string,
    fullPath: string,
    pathDir: string
}
