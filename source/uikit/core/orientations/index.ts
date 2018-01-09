class Orientations {
    private orientations: object;
    constructor(ORIENTATIONS: object) {
        this.orientations = ORIENTATIONS;
    }

    public contains(key: string): boolean {
        if (this.getValues().indexOf(key) > -1) {
            return true;
        }
        return false;
    }

    public getKeys(): string[] {
        return Object.keys(this.orientations);
    }

    public getValues(): string[] {
        const keys = Object.keys(this.orientations);
        const values: string[] = [];
        keys.map((key) => {
            values.push(this.orientations[key]);
        });
        return values;
    }

    public getAll(): [string, string][] {
        const orientations: [string, string][] = [];
        const keys: string[] = this.getKeys();
        keys.map((key) => {
            orientations.push([key, this.get(key)]);
        });
        return orientations;
    }

    public get(key: string): string {
        if (this.contains(key)) {
            return this.orientations[key];
        }
        return '';
    }
}
export default Orientations;
