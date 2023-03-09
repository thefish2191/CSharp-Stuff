import { fileNameRex } from './FileSpotter';
import * as path from 'path';

/*
* Tries to find a parent to the new item
*/

export class Orphanage {
    static findParents(possibleParents: string[], child: string): string[] {
        child = child + path.sep;
        let matchProjects: string[] = [];
        possibleParents.forEach(item => {
            let tempDir = item.replace(fileNameRex, '');
            if (child.startsWith(tempDir + path.sep)) {
                matchProjects.push(item);
            }
        });
        return matchProjects;
    }
    static hasNoParent(parents: string[]): boolean {
        return true ? parents.length === 0 : false;
    }
    static hasOnlyOneParent(parents: string[]): boolean {
        return true ? parents.length === 1 : false;
    }
    static hasMultipleParents(parents: string[]): boolean {
        return true ? parents.length >= 1 : false;
    }
}