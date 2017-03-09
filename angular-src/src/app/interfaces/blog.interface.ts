export interface Blog {
    name: string;
    bodytext: string;
    tags?: Array<string>;
    creationDate?: Number;
    author?: string;
}