namespace Math {
    export function clamp(value: number, minimum: number, maximum: number) {
        return global.Math.min(global.Math.max(minimum, value), maximum);
    }
}

export default Math;
