import { User } from "../containers/types/others/user"

export interface Coordinate {
    lng: number
    lat: number
}

export function getDistance(l1: Coordinate, l2:Coordinate){
    const R = 6371
    const dLng = toRad(l2.lng-l1.lng)
    const dLat = toRad(l2.lat - l1.lat)
    const lat1 = toRad(l1.lat)
    const lat2 = toRad(l2.lat)
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return (Math.round(d * 100) / 100).toFixed(2);;
}

function toRad(Value: number) 
{
    return Value * Math.PI / 180;
}

export const tokenName = "AUTH_TOKEN"

export const authRequest = async(fn: Function)=>{
    try{
        return await fn()
    }catch(err: any){
        if(err.response?.status === 401){
            logout()
        }
    }
}

export const getUser = (): User | null =>{
    const raw = window.localStorage.getItem("user")
    if(!raw)return null
    return JSON.parse(raw)
}


export const getAuthToken = ()=>{
    return window.localStorage.getItem(tokenName)
}

export const logout = ()=>{
    window.localStorage.removeItem(tokenName)
    window.localStorage.removeItem("user")
    window.location.reload()
}

export const getAbout = () =>{
    const user = getUser()
    if(!user)return logout()
    if(user.about)return user.about
    if(user.category === "professional"){
        return "An experienced medical professional and a volunteer of the Aider community"
    }else if(user.category === "formal"){
        return "Formally trained medical personnel and a proud member/volunteer of the Aider communtiy"
    }else if(user.category === "informal"){
        return "Have medical training experience and a proud member of the Aider Community"
    }else{
        return "A proud member and volunteer of the Aider community"
    }
}

const rVariable = "Responding"

export const getResponding = (): string[] =>{
    const raw = localStorage.getItem(rVariable)
    if(!raw)return []
    return JSON.parse(raw)
}

export const setResponding = (remoteId: string): string[] =>{
    const prev = getResponding()
    if(prev.includes(remoteId))return prev
    const curr = [...prev, remoteId]
    localStorage.setItem(rVariable, JSON.stringify(curr))
    return curr
}

export const popResponding = (remoteId: string)=>{
    const prev = getResponding()
    if(prev){
        const curr = prev.filter(id=>id!==remoteId)
        localStorage.setItem(rVariable, JSON.stringify(curr))
    }
}