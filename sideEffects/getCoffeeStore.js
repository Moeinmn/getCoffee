

let getCoffeeStores = async (ll= [43.65267326999575,-79.39545615725015] , limit ,pageNum) => {
    try {
             
            let storeReq = await fetch(`https://api.foursquare.com/v3/places/nearby?ll=${ll[0]},${ll[1]}&query=coffee&limit=${limit}`, {
                headers: {
            method:'GET',
                Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
              }
    });
    let storeData =await storeReq.json();
    let storeArray = storeData.results;
    let storePicsData = await getStorePic(pageNum);
    let picsArray = storePicsData.results;
    
    let storeWithPic = storeArray.map((store, indx) => {
        return {
            ...store,
            imgUrl: picsArray[indx]['urls']['regular']
        }
    })
    return storeWithPic
        
} catch (error) {
    console.log(error);
    return error.message
}
}

let getStorePic = async (pageNum = 1) => {
    let picsReq = await fetch(`https://api.unsplash.com//search/photos?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_API_KEY}&query=coffeeshop&per_page=25&page=${pageNum}`);
    let picsData = picsReq.json();
    return picsData;
}

//fetch data from airtable 
export async function  getAirtableData(obj){
    try {
        let requset = await fetch('/api/create-coffee-stores/' ,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body:JSON.stringify(obj)
        })
        return await requset.json();
    } catch (error) {
        return error.message
    }
} 



//=======================================================================================





//fetcher for swr
export const fetcher = (...args) => fetch(...args).then(res => res.json())

export default getCoffeeStores;
