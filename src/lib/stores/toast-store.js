import { writable } from "svelte/store";

const defaults = {
    duration: 4000,
    initial: 1,
    next: 0,
    type: 'error',
}

function createToast() {
    const { subscribe, update } = writable([]);
    const options = {}
    let count = 0

    function init(target = 'default', opts = {}) {
        options[target] = opts
        return options
    }


    function push(msg, opts) {

        const param = {
            target: 'default',
            msg,
            ...opts
        }
        const conf = options[param.target] || {}

        const entry = {
            ...defaults,
            ...conf,
            ...param,
            id: ++count
        }

        update(n => [entry, ...n])
        return count;
    }

    function pop(id) {
        update((n) => {
            if (!n.length || id === 0) return [];

            const found = id || Math.max(...n.map((i) => i.id));
            return n.filter((i) => i.id !== found);
        })
    }

    return { subscribe, push, pop, init }

}

export const toast = createToast();