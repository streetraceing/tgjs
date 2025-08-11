import { TelegramMethodMap } from "@/types/telegram/methods"
import { AxiosRequestConfig } from "axios"

export type ArgsOf<M> =
    M extends { args: infer A } ? A : {}

export type ReturnOf<M> =
    M extends { return: infer R } ? R : never

export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type WithConfig<T> = T extends undefined
    ? { config?: AxiosRequestConfig }
    : T & { config?: AxiosRequestConfig }

export type SmartArgs<M extends keyof TelegramMethodMap> =
    RequiredKeys<ArgsOf<TelegramMethodMap[M]>> extends never
    ? [payload?: WithConfig<ArgsOf<TelegramMethodMap[M]>>]
    : [payload: WithConfig<ArgsOf<TelegramMethodMap[M]>>]

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
    ? T[K] extends Function
    ? T[K]
    : DeepPartial<T[K]>
    : T[K]
}