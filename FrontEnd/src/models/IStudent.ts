export interface IStudent{
    readonly idStudente?: number
    readonly email: string
    readonly idCorso: number
    readonly nome: string
    readonly cognome: string
    readonly annoFrequentazione: number
    readonly cf: string
    readonly password?: string
    readonly dataNascita: string
    readonly codice?: string
    readonly ritirato?: boolean
    readonly dataRitiro?: string
    readonly giornate?: number
    readonly frequenza?: number
    readonly promosso?: boolean
}