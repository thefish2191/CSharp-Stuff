import * as vscode from 'vscode';
import { generateRawNamespace } from './namespaceGenerator';
import * as projectFinder from './projectFinder';
import { getCallerInfo } from './callerInfoGatherer';
import * as os from 'os';
import { findCsproj } from './projectFinder';

const osSeparator = os.platform() === "win32" ? "/" : "\\";

export async function activate(context: vscode.ExtensionContext) {
	let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (caller) => {
		try {
			let tempt = findCsproj(caller);
			console.log(tempt?.fsPath);
		} catch (error) {
			console.log(error);
		}

	});
	let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
	});
}

// This method is called when the extension is deactivated
export function deactivate() { }
