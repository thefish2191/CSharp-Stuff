"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRawNamespace = void 0;
const callerInfo = require("./callerInfoGatherer");
const dirsRegex = /[\/\\]/g;
const endOfLine = /.$/;
/**
 * Generate a namespace directly from the caller uri
 * @param caller
 * @returns
 */
function generateRawNamespace(caller) {
    let info = callerInfo.getCallerInfo(caller);
    let preName = info.rootFolderName + info.callerDir;
    preName = preName.replace(dirsRegex, '.');
    preName = preName.replace(' ', '');
    preName = preName.replace(endOfLine, '');
    return preName;
}
exports.generateRawNamespace = generateRawNamespace;
//# sourceMappingURL=namespaceGenerator.js.map