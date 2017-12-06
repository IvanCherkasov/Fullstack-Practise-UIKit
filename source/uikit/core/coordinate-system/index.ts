class CoordinateSystem {
    constructor(private dom: JQuery) {
    }

    public get xMin(): number {
        return this.dom.offset().left;
    }

    public get yMin(): number {
        return this.dom.offset().top;
    }

    public get xMax(): number {
        return this.dom.offset().left + this.dom.width();
    }

    public get yMax(): number {
        return this.dom.offset().top + this.dom.height();
    }

    public get width(): number {
        return this.dom.width();
    }

    public get height(): number {
        return this.dom.height();
    }
}

export default CoordinateSystem;
