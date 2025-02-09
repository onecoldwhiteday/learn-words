import { writable } from "svelte/store";

const defaults = {
    duration: 3000,
    initial: 1,
    next: 0,
    dismissable: true,
    type: 'error',
    reversed: false,
    intro: { x: 256 }
}

function createToast() {
    const { subscribe, update } = writable(new Array());
    const options = {}
    let count = 0

    function isObj(obj) {
        return obj instanceof Object
    }

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
            if (!n.length || id === 0) return []

            if (isObj(id))
                return n.filter((i) => i.target !== id.target)
            const found = id || Math.max(...n.map((i) => i.id))
            return n.filter((i) => i.id !== found)
        })
    }

    return { subscribe, push, pop, init }

}

export const toast = createToast();