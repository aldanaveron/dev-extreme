/**
* DevExtreme (jquery_augmentation.d.ts)
* Version: 20.1.1
* Build date: Wed Mar 25 2020
*
* Copyright (c) 2012 - 2020 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
declare global {
    interface JQuery { }
    interface JQueryPromise<T> { }
    interface JQueryCallback { }
    interface JQueryEventObject {
        cancel?: boolean;
    }
    interface PromiseLike<T> { }
    interface Promise<T> {
        then<TResult1 = T, TResult2 = never>(
            onfulfilled?: ((value: T, extraParameters: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
            onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
        ): Promise<TResult1 | TResult2>;
    }
}

export const { };