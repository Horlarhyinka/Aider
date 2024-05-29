
export function pick(obj: {[k: string]: any}, keys: string[]){
    const res: {[k: string]: any} = {}
    for(let i = 0; i < keys.length; i++){
        res[keys[i]] = obj[keys[i]]
    }
    return res
}

export enum Topics{ emergency="Emergency"}