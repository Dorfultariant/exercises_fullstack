function randInt() {
    return Math.floor(Math.random() * 100) + 1;
}

function cToF(celcius) {
    return (celcius * 9) / 5 + 32;
}

module.export = {
    randInt,
    cToF
};

