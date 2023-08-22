
const incrementVersion = (version) => {
    const parts = version.split(".");
    const major = parseInt(parts[0]);
    const minor = parseInt(parts[1]);
    const patch = parseInt(parts[2]);

    const newPatch = patch + 1;

    return `${major}.${minor}.${newPatch}`;
};

module.exports = {
    incrementVersion,
};
