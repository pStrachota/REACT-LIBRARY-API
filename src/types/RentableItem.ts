export interface IRentableItem {
    rentableItemId: number
    author: string
    title: string
    serialNumber: string
    available?: boolean
}

export interface Book extends IRentableItem{
    publishingHouse: string
}

export interface Article extends IRentableItem{
    parentOrganisation: string
}
