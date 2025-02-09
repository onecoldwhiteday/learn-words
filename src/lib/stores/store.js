import { writable } from "svelte/store";
import LZString from 'lz-string';

const mainStore = (name, initialValue, toStorage = [], fromStorage = []) => {
    if (window.localStorage) {
        const storedValue = window.localStorage.getItem(name);

        if (storedValue) {
            initialValue = fromStorage.reduce((acc, fn) => fn(acc), storedValue);
        }
    }

    const { subscribe, set } = writable(initialValue);

    return {
        subscribe,
        set: (x) => {
            if (window?.localStorage) {
                window.localStorage.setItem(name, toStorage.reduce((acc, fn) => fn(acc), x))
            }
            set(x);
        }
    }
}

export const wordData = mainStore('wordData', {}, [JSON.stringify], [JSON.parse]);
export const compressedWordData = mainStore('compressedWordData', {}, [JSON.stringify, LZString.compress], [LZString.decompress, JSON.stringify]);
