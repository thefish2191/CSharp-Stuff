import * as vscode from 'vscode';
import * as callerInfo from './callerInfoGatherer';
import { rename } from 'fs';

const dirsRegex = /[\/\\]/g;
const endOfLine = /.$/;

/**
 * Generate a namespace directly from the caller uri
 * @param caller 
 * @returns 
 */
export function generateRawNamespace(caller: vscode.Uri): string {
    let info = callerInfo.getCallerInfo(caller);
    let preName = info.rootFolderName + info.callerDir;
    preName = preName.replace(dirsRegex, '.');
    preName = preName.replace(' ', '');
    preName = preName.replace(endOfLine, '');
    return preName;
}
