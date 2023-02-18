"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNamespace = void 0;
const vscode = require("vscode");
const callerInfo = require("./callerInfoGatherer");
const callerInfoGatherer_1 = require("./callerInfoGatherer");
const projectFinder = require("./projectFinder");
const dirsRegex = /[\/\\]/g;
const endOfLine = /.$/;
const startOfLine = /^\\/;
function parseDirToNamespace(dir) {
    let namespace = dir;
    namespace = namespace.replace(endOfLine, '');
    namespace = namespace.replace(startOfLine, '');
    namespace = namespace.replace(' ', '');
    namespace = namespace.replace(dirsRegex, '.');
    return namespace;
}
/**
 * Generate a namespace directly from the caller uri
 * @param caller
 * @returns
 */
function generateRawNamespace(caller) {
    let info = callerInfo.getCallerInfo(caller);
    let preName = info.rootFolderName + info.callerDir;
    return parseDirToNamespace(preName);
}
function generateFancyNamespace(caller, proj) {
    let newNamespace = ``;
    let callerInfo = (0, callerInfoGatherer_1.getCallerInfo)(caller);
    newNamespace = callerInfo.callerDir;
    console.log(`New namespace is: ${newNamespace}`);
    newNamespace = parseDirToNamespace(newNamespace);
    return newNamespace;
}
function getNamespace(caller) {
    let project;
    try {
        project = projectFinder.findCsproj(caller);
        try {
            let fancyNamespace = generateFancyNamespace(caller, project);
            vscode.window.showInformationMessage(fancyNamespace);
            return fancyNamespace;
        }
        catch (error) {
            console.log(`We found a .csproj ar ${project.fsPath} but we got stuck somewhere from there!`);
            console.log(`Error generating fancy name 🥲`);
            console.log(error);
        }
    }
    catch (error) {
        console.log(`No .cjproj found!`);
    }
    console.log(`Creating a raw namespace...`);
    return generateRawNamespace(caller);
}
exports.getNamespace = getNamespace;
;
//# sourceMappingURL=namespaceGenerator.js.map