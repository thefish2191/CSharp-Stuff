"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFileEx = exports.findAllCsproj = exports.dirNameRex = void 0;
const fs = require("fs");
const path = require("path");
exports.dirNameRex = /[\\/]([\w\d\s\-\_\(\)\,\=\;\.])+[\\/]*$/gm;
function findAllCsproj(caller) {
}
exports.findAllCsproj = findAllCsproj;
function searchFileEx(dir) {
    let filesArray;
    let foldersArray;
    let files = fs.readdirSync(dir);
    files.forEach(element => {
        let temp = dir + path.sep + element;
        if (fs.statSync(element).isFile()) {
            console.log(`📄${element}`);
            filesArray.push(element);
        }
        if (fs.statSync(element).isDirectory()) {
            console.log(`📁 ${element}`);
            foldersArray.push(element);
        }
    });
}
exports.searchFileEx = searchFileEx;
//# sourceMappingURL=fileFinder.js.map