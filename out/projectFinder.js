"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCsproj = exports.dirNameRex = void 0;
const vscode = require("vscode");
const fs = require("fs");
const callerInfoGatherer = require("./callerInfoGatherer");
exports.dirNameRex = /([\w\d\s\-\_\(\)\,\=\;\.])+[\\/]*$/gm;
function findCsproj(caller) {
    let csprojDir;
    let callerInfo = callerInfoGatherer.getCallerInfo(caller);
    let currentFolder = callerInfo.callerUri.fsPath;
    let newPath = "";
    let projectFound = false;
    do {
        let files = fs.readdirSync(currentFolder);
        files.forEach(element => {
            if (element.endsWith('.csproj')) {
                projectFound = true;
                newPath = currentFolder + element;
            }
        });
        if (projectFound) {
            break;
        }
        if (currentFolder === callerInfo.rootFolderUri?.fsPath) {
            break;
        }
        currentFolder = currentFolder.replace(exports.dirNameRex, '');
    } while (!projectFound);
    if (newPath !== '') {
        csprojDir = vscode.Uri.file(newPath);
    }
    return csprojDir;
}
exports.findCsproj = findCsproj;
//# sourceMappingURL=projectFinder.js.map