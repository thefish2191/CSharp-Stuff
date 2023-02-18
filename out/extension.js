"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const os = require("os");
const projectFinder_1 = require("./projectFinder");
const osSeparator = os.platform() === "win32" ? "/" : "\\";
async function activate(context) {
    let itemGenerator = vscode.commands.registerCommand(`dotnet-helper.itemGenerator`, async (caller) => {
        try {
            let tempt = (0, projectFinder_1.findCsproj)(caller);
            console.log(tempt?.fsPath);
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