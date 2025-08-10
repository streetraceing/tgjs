import { TelegramMethodMap } from "@/types/telegram/methods"

export type ArgsOf<M> =
    M extends { args: infer A } ? A : any

export type ReturnOf<M> =
    M extends { return: infer R } ? R : never

export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type SmartArgs<M extends keyof TelegramMethodMap> =
    ArgsOf<TelegramMethodMap[M]> extends undefined | Record<string, never>
    ? []
    : RequiredKeys<ArgsOf<TelegramMethodMap[M]>> extends never
    ? [payload?: ArgsOf<TelegramMethodMap[M]>]
    : [payload: ArgsOf<TelegramMethodMap[M]>]

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object
    ? T[K] extends Function
      ? T[K]
      : DeepPartial<T[K]>
    : T[K]
}