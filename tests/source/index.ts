class TSlider {
    public static readonly HORIZONTAL = 'horizontal';
    public static readonly VERTICAL = 'vertical';
}

console.log(TSlider);
console.log(TSlider.HORIZONTAL);
console.log(TSlider.VERTICAL);
console.log(TSlider['VERTICAL']);
console.log(TSlider['HORIZONTAL']);
console.log('по индексу ', TSlider[0]);
console.log(Object.keys(TSlider));
console.log(Object.keys(TSlider).length);

export class List<T> {

    private items: T[];
    constructor() {
        this.items = [];
    }

    add(item: T) {
        this.items.push(item);
    }

    get (index: number) {
        return this.items[index];
    }
}

let comp: List<string> = new List<string>();
comp.add('hello');
comp.add('world');
console.log(comp);
console.log(comp.get(0));

enum Types {
    ORIENTATION_HORIZONTAL = 2,
    ORIENTATION_VERTICAL,
    DIRECTION_LEFT,
    DIRECTION_RIGHT,
    DIRECTION_UP,
    DIRECTION_DOWN,
}

const t1 = Types.DIRECTION_DOWN | Types.ORIENTATION_HORIZONTAL;
const t2 = Types.ORIENTATION_HORIZONTAL;
const t3 = Types.ORIENTATION_HORIZONTAL | Types.DIRECTION_RIGHT;

// console.log(t1 & Types.DIRECTION_DOWN);
// console.log(t1 & Types.ORIENTATION_HORIZONTAL);
if (t2 & Types.DIRECTION_LEFT) {
    console.log(t2 & Types.DIRECTION_LEFT, true);
} else {
    console.log(t2 & Types.DIRECTION_LEFT, false);
}

if (t1 & Types.DIRECTION_LEFT) {
    console.log(t1 & Types.DIRECTION_LEFT, true);
} else {
    console.log(t1 & Types.DIRECTION_LEFT, false);
}
// console.log(t3 & t2);
