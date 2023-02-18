import * as vscode from 'vscode';
import * as namespaceGenerator from './namespaceGenerator';
import * as projectFinder from './projectFinder';
import * as os from 'os';
import { findCsproj } from './projectFinder';


export async function activate(context: vscode.ExtensionContext) {
	let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (caller: vscode.Uri) => {
		try {
			console.log(namespaceGenerator.getNamespace(caller));

		} catch (error) {
			console.log(error);

		}
	});
	let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
	});
}

// This method is called when the extension is deactivated
export function deactivate() { }
