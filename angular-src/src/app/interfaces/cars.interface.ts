export interface Car {
    name: string;
    make: string;
    model: string;
    year: number;
    currentCar: Boolean;
    creationDate?: Number;
    images?: [String];
    mods?: [String];
}