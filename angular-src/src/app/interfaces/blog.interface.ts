export interface Blog {
    name: string;
    bodytext: string;
    bodyhtml: string;
    tags?: Array<string>;
    createDate?: Number;
    author?: string;
}