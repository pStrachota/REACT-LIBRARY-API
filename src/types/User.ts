export interface IClient {
    id: number
    name: string
    surname: string
}

export interface Admin {
    id: number
    name: string
    surname: string
    login: string
    password: string

    privileges: string

    position: string
}

export interface Client {
    id: number
    name: string
    surname: string
    login: string
    password: string
    address: Address
}

export interface Manager {
    id: number
    name: string
    surname: string
    password: string
    login: string
    position: string
}

export interface Address {
    id: number
    street: string
    city: string
    number: string
}

