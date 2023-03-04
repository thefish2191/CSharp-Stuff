import { updateProjects } from '../extension';
import { FileSpotter } from './FileSpotter';
import * as vscode from 'vscode';

/*
* Tries to find a parent to the new item
*/

export class Orphanage {
    static async findParents(possibleParents: string[], child: string): Promise<string[]> {
        let parentProjects: string[] = FileSpotter.searchParentProjects(possibleParents, child);
        return parentProjects;
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