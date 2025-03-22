import mongoose from "mongoose"


export function cleanObjectIds(obj: any): any {
    if (obj && typeof obj === 'object') {
        for (const key of Object.keys(obj)) {
            if (obj[key] instanceof mongoose.Types.ObjectId) {
                obj[key] = obj[key].toString();
            } else if (typeof obj[key] === 'object') {
                obj[key] = cleanObjectIds(obj[key]);
            }
        }
    }
    return obj;
}


export function cleanUndefined(obj: any): any {
    if (obj && typeof obj === 'object') {
        const clone = Array.isArray(obj) ? [...obj] : { ...obj };

        Object.keys(clone).forEach((key) => {
            if (clone[key] === undefined) {
                delete clone[key];
            } else if (typeof clone[key] === 'object') {
                clone[key] = cleanUndefined(clone[key]);
                
                if (typeof clone[key] === 'object' && Object.keys(clone[key]).length === 0) {
                    delete clone[key]; 
                }
            }
        });
        return clone;
    }

    return obj;
}

export const cleanText = function(input: string) {
    // Remove unnecessary asterisks
    let cleanedText = input.replace(/\*\*/g, '');
    cleanedText = cleanedText.replace(/^\s*\*\s*/gm, '');
    return cleanedText;
}