let ggg: {[key: string]: any} = {
    a: 0,
    b: 1,
    c: 2,
    d: {
        1: 0,
        2: 1,
        3: 2,
        4: {
            1: 0,
            2: 13,
        },
    },
};

let hhh: {[key: string]: any} = {
    a: 10,
    e: 3,
    f: 4,
    d: {
        4: {
            3: 40,
        },
    },
};

ggg = { ...ggg, ...hhh };
console.log(ggg);
