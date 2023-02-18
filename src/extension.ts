import * as vscode from 'vscode';
import * as fs from 'fs';
import { isStringObject } from 'util/types';


export async function activate(context: vscode.ExtensionContext) {
	let test = vscode.commands.registerCommand(`dotnet-helper.tester`, async (caller: vscode.Uri) => {
	});
	let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (target) => {
	});
	let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
	});
}

// This method is called when the extension is deactivated
export function deactivate() { }

const dirsRegex = /[\/\\]/g;

async function generateNamespace(caller: vscode.Uri) {
	try {

		// Get the whole path, with system specific separator, 
		let rootFolderUri = vscode.workspace.getWorkspaceFolder(caller)?.uri.fsPath!;
		// Get the location, folder or file, from where the command was executed, with system specific separator
		let fullFolderName = caller.fsPath;
		// get the root folder name
		let rootFolderName = vscode.workspace.getWorkspaceFolder(caller)!.name;
		// get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
		let localPath = fullFolderName.replace(rootFolderUri, '');
		// Creates a possible namespace
		let newNamespace: string = localPath.replace(dirsRegex, '.');
		newNamespace = rootFolderName + newNamespace;
		return newNamespace.toString();
	} catch (error) {
	}
}

enum ResourceType {
	null = `null`,
	file = `file`,
	folder = `folder`
}


const fileNameRex = /(([\w\d\s\-\_\(\)\,\=\;]+)\.*)+([\w\d])+$/gm;

async function getCallerInfo(caller: vscode.Uri) {
	let incomingType = ResourceType.null;
	if (fs.lstatSync(caller.fsPath).isFile()) {
		incomingType = ResourceType.file;
	}
	else if (fs.lstatSync(caller.fsPath).isDirectory()) {
		incomingType = ResourceType.folder;
	}
	let callerInfo = {
		rootFolderUri: vscode.workspace.getWorkspaceFolder(caller)?.uri,
		rootFolderName: vscode.workspace.getWorkspaceFolder(caller)!.name,

		callerName: caller.fsPath.match(fileNameRex),
		callerUri: vscode.Uri.file(caller.fsPath),
		callerType: incomingType
	};
	return callerInfo;
}