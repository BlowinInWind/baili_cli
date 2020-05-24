import which from 'which';
import { spawn } from 'child_process';

function runCmd({ cmd, cwd, success, params }) {
    params = params || [];
    const runner = spawn(cmd, params, {
        cwd,
        stdio: 'inherit'
    });
    runner.on('close', function(code) {
        success && success(code);
    });
}

function findNpm() {
    const npms =
        process.platform === 'win32'
            ? ['yarn.cmd', 'tnpm.cmd', 'cnpm.cmd', 'npm.cmd']
            : ['yarn', 'tnpm', 'cnpm', 'npm'];
    for (var i = 0; i < npms.length; i++) {
        try {
            which.sync(npms[i]);
            console.log('use npm: ' + npms[i]);
            return npms[i];
        } catch (e) {}
    }
    throw new Error('please install npm');
}

export default ({ success, cwd }) => {
    const npm = findNpm();
    runCmd({
        cmd: which.sync(npm),
        params: ['install'],
        success,
        cwd
    });
};
