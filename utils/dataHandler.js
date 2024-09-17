import fs from 'fs';

export const readData = (file) => {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

export const saveData = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};
