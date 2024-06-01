const {initializeApp} = require("firebase/app")
const { getFirestore, collection, addDoc, getDocs, query, where, getDoc, deleteDoc, doc, updateDoc, } = require("firebase/firestore")
const config = require("../config")


class FB{

    constructor(){
        const app = initializeApp(config.firebase)
        this.db = getFirestore(app)
    }
/**
 * 
 * @param {string } collectionName 
 * @param { object } data 
 * @returns { any }
 */
    async createOne(id, data){
        const emergencies = doc(this.db, `emergencies/${id}`)
        return addDoc(collection(emergencies, "chats"), data)
    }

    /**
     * 
     * @param {*} collectionName 
     * @returns { any }
     */

    async getAll(collectionName, condition ={}){
        const cond = Object.entries(condition)[0]
        const meta = cond? where(cond[0], "==", cond[1]): undefined
        const q = query(collection(this.db, collectionName), meta)
        return getDocs(q)
    }

    /**
     * 
     * @param {string} collectionName 
     * @param {string} id 
     * @returns 
     */

    getById(emergency, id){
        return getDoc(doc(this.db,`emergencies/${emergency}/chats/${id}`))
    }

    // /**
    //  * 
    //  * @param {string} collectionName 
    //  * @param { string } id 
    //  * @param { (object)=>Promise<any>} func 
    //  */
    // async updateOne(collectionName, id, func){
    //     const target = await this.getById(collectionName, id)
    //     if(!target)return;
    //     const docRef = doc(this.db, `/${collectionName}/${id}`)
    //     const update = await func({...target.data(), id: target.id})
    //     return updateDoc(docRef, update)
    // }

    // deleteOne(collectionName, id){
    //     return deleteDoc(collection(this.db,`${collectionName}/${id}`))
    // }

}

const fb = new FB()

module.exports = Object.freeze(fb)