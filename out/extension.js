"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const namespaceGenerator = require("./namespaceGenerator");
async function activate(context) {
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (caller) => {
        try {
            console.log(namespaceGenerator.getNamespace(caller));
        }
        catch (error) {
            console.log(error);
        }
    });
    let getFileLocalPath = vscode.commands.registerCommand(`dotnet-helper.fileLocationSpotter`, async (prayer) => {
    });
}
exports.activate = activate;
// This method is called when the extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map