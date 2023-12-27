import { OSObjectType } from './type';
import * as path from './path';

export default class DirectoryEntry {
    public path: string;
    public name: string;
    public dir: string;
    public type: OSObjectType;

    constructor(fullPath: string, type: OSObjectType) {
        this.path = fullPath;
        this.name = path.basename(fullPath);
        this.dir = path.dirname(fullPath);
        this.type = type;
    }

    isFile() {
        return this.type === OSObjectType.file;
    }

    isDirectory() {
        return this.type === OSObjectType.directory;
    }
}
 