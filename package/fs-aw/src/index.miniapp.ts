import { asserAbsolutePath } from "./utils";
import { getCurrentFactory } from "./utils/miniapp-factory";
import {
    EncodingStringType, FileContent, FileSystemManager, MiniAppFileSystemManagerFactory, Stat,
} from './utils/type';


let [factory, BASE_URL] = getCurrentFactory();

export const initFactory = (f: MiniAppFileSystemManagerFactory, baseUrl: string) => {
    factory = f;
    BASE_URL = baseUrl;
};

const getFileSystemManager = () => {
    if (!factory?.getFileSystemManager) {
        throw new Error('Not support miniapp platform, please use initFactory to init.');
    }
    return factory.getFileSystemManager();
}

const getFullName = (fileName: string) => {
    return `${BASE_URL}${fileName.startsWith('/') ? fileName : `/${fileName}`}`;
}

const readFile = async (fileName: string, encoding?: EncodingStringType): Promise<FileContent> => {
    asserAbsolutePath(fileName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve, fail) => {
        fsMgr.readFile({
            filePath: getFullName(fileName),
            encoding,
            success: (res) => {
                resolve(res.data as FileContent);
            },
            fail,
        });
    });
}

const writeFile = async (fileName: string, data: any): Promise<boolean> => {
    asserAbsolutePath(fileName);
    const fsMgr = getFileSystemManager();
    if (!(data instanceof ArrayBuffer)) {
        data = String(data);
    }
    return new Promise((resolve, fail) => {
        fsMgr.writeFile({
            filePath: getFullName(fileName),
            data,
            success: () => {
                resolve(true);
            },
            fail,
        });
    });
}

const removeFile = async (fileName: string): Promise<boolean> => {
    asserAbsolutePath(fileName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve, fail) => {
        fsMgr.unlink({
            filePath: getFullName(fileName),
            success: () => {
                resolve(true);
            },
            fail,
        });
    });
}

declare interface readdir {
    (dirName: string, options: { withFileTypes: true }): Promise<{ isDirectory(): boolean; isFile(): boolean } []>;
    (dirName: string): Promise<string []>; 
}
const readdir = async (dirName: string, options?: { withFileTypes: boolean }): Promise<Stat[] | string[]> => {
    asserAbsolutePath(dirName);
    const fsMgr = getFileSystemManager();
    if (options?.withFileTypes) {
        return new Promise((resolve, fail) => {
            fsMgr.stat({
                path: getFullName(dirName),
                recursive: true,
                success: res => {
                    const fileList = Object.keys(res.stats)
                    // filter self
                    .filter((itemPath) => itemPath !== '/')
                    .map((itemPath) => {
                        const item = res.stats[itemPath];
                        return {
                            path: itemPath,
                            isDirectory: item?.isDirectory.bind(item),
                            isFile: item?.isFile.bind(item),
                        }
                    });
                    resolve(fileList);
                },
                fail,
            })
        })
    }

    return new Promise((resolve, fail) => {
        fsMgr.readdir({
            dirPath: getFullName(dirName),
            success: async (res) => {
                resolve(res.files);
            },
            fail,
        });
    });
}

const mkdir = async (dirName: string): Promise<boolean> => {
    asserAbsolutePath(dirName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve, fail) => {
        fsMgr.mkdir({
            dirPath: getFullName(dirName),
            // default recursive
            recursive: true,
            success: () => {
                resolve(true);
            },
            fail,
        });
    });
}

const rmdir = async (dirName: string): Promise<boolean> => {
    asserAbsolutePath(dirName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve, fail) => {
        fsMgr.rmdir({
            dirPath: getFullName(dirName),
            recursive: true,
            success: () => {
                resolve(true);
            },
            fail,
        });
    });
}

const exists = async (fileName: string): Promise<boolean> => {
    asserAbsolutePath(fileName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve) => {
        fsMgr.access({
            path: getFullName(fileName),
            success: () => {
                resolve(true);
            },
            fail: () => {
                resolve(false);
            },
        });
    });
}

const stat = async (fileName: string): Promise<Stat> => {
    asserAbsolutePath(fileName);
    const fsMgr = getFileSystemManager();
    return new Promise((resolve, fail) => {
        fsMgr.stat({
            path: getFullName(fileName),
            success: (res) => {
                resolve(res);
            },
            fail,
        });
    });
}

export {
    readFile,
    writeFile,
    removeFile,
    readdir,
    mkdir,
    rmdir,
    exists,
    stat,
};

export const fsaw: FileSystemManager = {
    readFile,
    writeFile,
    removeFile,
    readdir,
    mkdir,
    rmdir,
    exists,
    stat,
};
export default fsaw;