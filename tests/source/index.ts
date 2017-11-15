enum TSlider {
    HORIZONTAL,
    VERTICAL,
}
const type = TSlider;
console.log(type);
console.log(TSlider.HORIZONTAL);
console.log(TSlider.HORIZONTAL in type);
console.log(TSlider.HORIZONTAL in TSlider);
