export enum SortBy {
    CREATION_DATE = 1,
    TITLE = 2
}

export default interface ISorting {
    target: SortBy,
    ascending: boolean
}