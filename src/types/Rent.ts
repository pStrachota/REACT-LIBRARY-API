import {Client} from './User'
import {IRentableItem} from './RentableItem'

export interface IRent {
    rentId: number
    beginTime: string
    endTime: string
    ended: boolean
    rentableItems: IRentableItem[]
    client: Client
}

export interface IRentCreate {
    rentableItemsIds: number[]
    clientId: number
}
