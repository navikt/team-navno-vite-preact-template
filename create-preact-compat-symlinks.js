import fs from 'fs';
import path from 'path';

const reactPath = path.resolve(process.cwd(), 'node_modules', 'react');
const reactDomPath = path.resolve(process.cwd(), 'node_modules', 'react-dom');
const preactCompatPath = path.resolve(
    process.cwd(),
    'node_modules',
    'preact',
    'compat'
);

const createPreactCompatSymLink = (path) => {
    try {
        if (fs.existsSync(path)) {
            const lstat = fs.lstatSync(path, { throwIfNoEntry: false });
            if (lstat?.isSymbolicLink()) {
                console.log(`${path} is already a symlink, skipping`);
                return;
            }

            const stat = fs.statSync(path, { throwIfNoEntry: false });
            if (stat) {
                console.log(`${path} exists as directory, deleting`);
                fs.rmSync(path, { recursive: true });
            }
        }

        fs.symlinkSync(preactCompatPath, path, 'dir');
    } catch (e) {
        console.error(`Failed to create symlink from ${path} - ${e}`);
    }
};

createPreactCompatSymLink(reactPath);
createPreactCompatSymLink(reactDomPath);
