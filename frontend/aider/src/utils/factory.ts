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
            window.localStorage.removeItem(tokenName)
            window.localStorage.removeItem("user")
        }
    }
}