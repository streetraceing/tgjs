import { AxiosRequestConfig } from 'axios';
import { TelegramMethodMap } from '@/types/methods';

export type ArgsOf<M> = M extends { args: infer A } ? A : {};

export type ReturnOf<M> = M extends { return: infer R } ? R : never;

export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type SmartArgsWithoutConfig<M extends keyof TelegramMethodMap> =
    RequiredKeys<ArgsOf<TelegramMethodMap[M]>> extends never
        ? [payload?: ArgsOf<TelegramMethodMap[M]>]
        : [payload: ArgsOf<TelegramMethodMap[M]>];

export type SmartArgs<M extends keyof TelegramMethodMap> =
    RequiredKeys<ArgsOf<TelegramMethodMap[M]>> extends never
        ? [
              payload?: ArgsOf<TelegramMethodMap[M]> & {
                  config?: AxiosRequestConfig;
              },
          ]
        : [
              payload: ArgsOf<TelegramMethodMap[M]> & {
                  config?: AxiosRequestConfig;
              },
          ];

export type SmartArgsUniversal<M extends keyof TelegramMethodMap> =
    | SmartArgs<M>
    | SmartArgsWithoutConfig<M>;

export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
        ? T[K] extends Function
            ? T[K]
            : DeepPartial<T[K]>
        : T[K];
};
