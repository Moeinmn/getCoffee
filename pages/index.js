import Head from 'next/head'
import Banner from './../components/Banner';
import GlassCard from './../components/useful/GlassCard';
import getCoffeeStores from './../sideEffects/getCoffeeStore';
import Button from './../components/useful/Button';


import {SET_STORES_DATA , DELETE_STORES_DATA} from '../store/actionsFile'

import { useState } from 'react';
import  Image  from 'next/image';



export const getStaticProps = async () => {
  let storeList = await getCoffeeStores(undefined , 6);
  return{
    props:{
      storeList
    }
  };

}



export default function Home(props) {
  
  let reduxStore = props.store;
  let [reduxStoreData ,setReduxStoreData ] = useState(reduxStore.getState() || '') ;
  let [error ,setError] = useState('');
  let [isLoading , setIsLoading] = useState(false);
  let [locName , setLocName] = useState(false);

  
  let locationList = [{name:'Paris' , ll:[48.84 , 2.35]} , {name:'Amsterdam' , ll:[52.36, 4.90]},{name:'Berlin' , ll:[52.52 , 13.36]},{name:'London' , ll:[51.50 , -0.13]},{name:'Tehran' , ll:[35.72,51.38]}]
  let getLocOnClick= async ()=>{
    async function success(position) {
      setIsLoading(true)
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
      let userLatLong = [latitude , longitude];
      let fetchedStores = await getCoffeeStores(userLatLong,  9 , 9);
      if (fetchedStores?.results?.length === 0 ){ setError('No stores found near you');return}
      reduxStore.dispatch({type:SET_STORES_DATA , payload : fetchedStores})
      setReduxStoreData(reduxStore.getState());
      setLocName('Stores Near You')
      setIsLoading(false)
    }
  
    function error() {
      alert('Unable to retrieve your location');
    } 
  if(!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
  } else {
      // status.textContent = 'Locating…';
      navigator.geolocation.getCurrentPosition(success, error);
  }
    
  }
  return (
    <div >
      <Head>
        <title>Home</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <main>
      <Banner/>
      <section>
        <br/>

      {/* code for loading indicator */}
      {isLoading && <div id='loadingIndicator' >
        <div className='loadingContainer'><Image src="/loadingCoffee.gif" alt='loading' width={64} height={64}/></div>
        </div>}
      
      {/* rendering buttons for fetching stores by latLong */}
      <div id='locationList' >
      <Button onClick={getLocOnClick}><span className="material-icons" style={{verticalAlign: "bottom",fontSize:"20px"}}>place</span>Near you</Button>
      {locationList.map((location , indx)=><Button key={indx} onClick={async ()=>
      { 
        setIsLoading(true);
        let fetchedStores = await getCoffeeStores(location.ll, 9 , indx);
        reduxStore.dispatch({type:SET_STORES_DATA , payload : fetchedStores})
        setReduxStoreData(reduxStore.getState());
        setLocName(`${location.name} Stores`)
        setIsLoading(false);
      }
      }>
      {location.name}
      </Button>)
      }
      </div>
      {error && <p>{error}</p>}
      
   
   
      {/* rendering dynamicly rendered stores  */}
      {reduxStoreData && 
        <>
        {locName && <h3 className='cityTitle'>{locName}</h3>}
        <div className='storeListContainer'>
        {
          reduxStoreData.csrStores.map((store)=>
            <GlassCard key={store.fsq_id} storeName={store.name} href={`coffeeStores/${store.fsq_id}`} imgUrl={store.imgUrl} />
 
          )
        }
      </div>
        </>
      }
      </section>
      

      {/* rendering default torento stores */}
      <section id='torento'>
      <h3 className='cityTitle'>Torento Stores</h3>
      <div className='storeListContainer'>
      {
      props.storeList.map((store)=> 
      <GlassCard key={store.fsq_id} storeName={store.name} href={`coffeeStores/${store.fsq_id}`} imgUrl={store.imgUrl} />)
      }
      </div>
      </section>
      </main>
  
      
    </div>
  )
}