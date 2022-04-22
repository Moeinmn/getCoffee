import { useState } from 'react'
import '../styles/globals.css'
import store from '../store/store';
import { useEffect } from 'react';
import { useRouter } from 'next/router';




function MyApp({ Component, pageProps }) {
  let router = useRouter();
//  useEffect(()=>{
//    ;(async()=>{
//      try{
//       let asyncData = await fetch('https://api.db-ip.com/v2/free/self');
//         let userLocData= await asyncData.json();
//         if(userLocData.countryCode === "IR"){
//           router.push('/banned');
//           router.events.on('routeChangeStart', ()=>{return})
//           return
//         }
//      }catch(err){
//        alert(err.message)
//      }
//     }
//    )();
//  })  
  
 
 return (
   
  <Component {...pageProps} store={store} />
  
  )
}

export default MyApp
