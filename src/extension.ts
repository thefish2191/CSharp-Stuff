import * as vscode from 'vscode';
import * as fs from 'fs';
import * as join from 'path';

const dirsRegex = /[\/\\]/g;

export function activate(context: vscode.ExtensionContext) {
	function namespaceGenerator(target: any) {
		// Get the whole path, with system specific separator, 
		var rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath!;


		// Get the location, folder or file, from where the command was executed, with system specific separator
		var fullFolderName = target.fsPath;


		// get the root folder name
		var rootFolderName = vscode.workspace.getWorkspaceFolder(target)!.name;

		// get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
		var localPath = fullFolderName.replace(rootFolderUri, '');

		// Creates a possible namespace
		var newNamespace = localPath.replace(dirsRegex, '.');
		newNamespace = rootFolderName + newNamespace;
		return newNamespace;
	}
	function findFileLocalPath(target: any) {
		// Get the whole path, with system specific separator, 
		var rootFolderUri = vscode.workspace.getWorkspaceFolder(target)?.uri.fsPath!;

		// Get the location, folder or file, from where the command was executed, with system specific separator
		var fullFolderName = target.fsPath;


		// get the root folder name
		var rootFolderName = vscode.workspace.getWorkspaceFolder(target)!.name;

		// get the folder name where the command was executed, deleting the root folder part, it's empty if was in the root folder
		var fileName = fullFolderName.replace(rootFolderUri, '');

		// Creates a possible namespace
		return fileName;
	}

	let getNamespace = vscode.commands.registerCommand(`dotnet-helper.namespaceGenerate`, (prayer) => {
		var newFileName = "test.cs";
		var newFileFullPath = join.join(prayer.fsPath, newFileName);
		fs.writeFileSync(newFileFullPath, `namespace ${namespaceGenerator(prayer)};`);
	});
	let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, (prayer) => {
	});
}

// This method is called when the extension is deactivated
export function deactivate() { }