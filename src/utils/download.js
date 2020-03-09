import download from 'download-git-repo';

export default (templateName, projeceName) => {
    let url = `direct:https://github.com/jiangtong/${templateName}.git`;
    return new Promise((resolve, reject) => {
        download(url, projeceName, { clone: true }, err => {
            if (err) {
                reject(err);
            }
            resolve();
        });
    });
};
