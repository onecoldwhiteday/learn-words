import { writable } from "svelte/store";
import LZString from 'lz-string'; // For compression

const mainStore = (name, initialValue, toStorage = [], fromStorage = []) => {
    if (window.localStorage) {
        const storedValue = window.localStorage.getItem(name);

        if (storedValue) {
            initialValue = fromStorage.reduce((acc, fn) => fn(acc), storedValue);
        }
    }

    const { subscribe, update, set } = writable(initialValue);

    function keep(wordData) {
        update(n => ({[wordData.word]: wordData, ...n}));
    }

    function remove(word) {
        update(n => {
            let newWordList= {...n};
            delete newWordList[word.toLowerCase()];
            return newWordList;
        })
    }

    return {
        subscribe,
        keep,
        remove,
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
