export const enum InitOSType {
    READONLY = 'readonly',
    READWRITE = 'readwrite',
}

export const enum OSObjectType {
    file = 'file',
    directory = 'directory',
}

export const enum EncodingType {
    utf8 = 'utf8',
    'utf-8' = 'utf-8',
    base64 = 'base64',
}

export type EncodingStringType = 'utf8' | 'utf-8' | 'base64';

export interface OSObject<T = any> {
    type: OSObjectType;
    name: string;
    path: string;
    data: T;
}

export interface Stat {
    isFile (): boolean;

    isDirectory (): boolean;
}
export interface MiniAppFileSystemManagerFactory {
    getFileSystemManager(): MiniAppFileSystemManager;
}
interface MiniAppFileSystemManager {
    access(options: any): void;
    appendFile(options: any): void;
    copyFile(options: any): void;
    getFileInfo(options: any): void;
    getSavedFileList(options: any): void;
    getSavedFileInfo(options: any): void;
    mkdir(options: any): void;
    readdir(options: any): void;
    readFile(options: any): void;
    rename(options: any): void;
    writeFile(options: any): void;
    rmdir(options: any): void;
    saveFile(options: any): void;
    stat(options: any): void;
    unlink(options: any): void;
}
export type FileContent = string | ArrayBuffer;
export interface FileSystemManager {
    readFile (fileName: string, encoding?: EncodingStringType): Promise<FileContent>;

    writeFile (fileName: string, data: FileContent): Promise<boolean>;

    removeFile (fileName: string): Promise<boolean>;

    readdir (directoryName: string, options?: { withFileTypes?: boolean }): Promise<Stat[] | string[]>;

    mkdir (fullPath: string): Promise<boolean>;

    rmdir (fullPath: string): Promise<boolean>;

    exists (filePath: string): Promise<boolean>;

    stat (filePath: string): Promise<Stat | null>;
}