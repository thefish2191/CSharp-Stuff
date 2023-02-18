"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCsproj = exports.dirNameRex = void 0;
const vscode = require("vscode");
const fs = require("fs");
const callerInfoGatherer = require("./callerInfoGatherer");
const callerInfoGatherer_1 = require("./callerInfoGatherer");
exports.dirNameRex = /[\\/]([\w\d\s\-\_\(\)\,\=\;\.])+[\\/]*$/gm;
function findCsproj(caller) {
    let csprojDir;
    let callerInfo = callerInfoGatherer.getCallerInfo(caller);
    let currentFolder = callerInfo.callerUri.fsPath;
    let newPath = "";
    let limit = callerInfo.rootFolderUri?.fsPath;
    let projectFound = false;
    let attempts = 1;
    let safe = 15;
    do {
        // Limits the amount of folders to search in
        if (attempts >= safe) {
            throw new Error(`No target file found in ${attempts} attempts`);
        }
        attempts++;
        let files = fs.readdirSync(currentFolder);
        files.forEach(element => {
            if (element.endsWith('.csproj')) {
                projectFound = true;
                newPath = currentFolder + callerInfoGatherer_1.osSeparator + element;
            }
        });
        if (projectFound) {
            break;
        }
        if (currentFolder === limit) {
            break;
        }
        currentFolder = currentFolder.replace(exports.dirNameRex, '');
    } while (!projectFound);
    if (newPath !== '') {
        csprojDir = vscode.Uri.file(newPath);
    }
    else {
        throw new Error("No .csproj file found");
    }
    return csprojDir;
}
exports.findCsproj = findCsproj;
//# sourceMappingURL=projectFinder.js.map