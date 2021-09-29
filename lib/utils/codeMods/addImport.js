module.exports = (context, { specifier, source }) => {
    let localBinding = '';
    if (specifier.type === 'named') {
        localBinding = specifier.local || specifier.imported;
    } else {
        localBinding = specifier.local;
    }
};
