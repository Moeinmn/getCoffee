import Image from "next/image";
import Button from "../../components/useful/Button";
import styles from '../../styles/coffeeStores.module.css'
import getCoffeeStores ,{getAirtableData , fetcher}from "../../sideEffects/getCoffeeStore";


import { useEffect, useState } from "react";

import { useRouter } from "next/router";
import useSWR from "swr";
import  Head  from 'next/head';








export const getStaticProps = async (context) => {
    let storeList =await  getCoffeeStores(undefined , 6);
    let routeId = context.params.id;
    let storeInfo = storeList.filter(x => x.fsq_id === routeId );
    return{
    props:{
        storeInfo: storeInfo.length === 0 ? {} : storeInfo[0]
    }
}
}
export const getStaticPaths = async () => {
    let storeList =await  getCoffeeStores(undefined , 6);
    let paths = storeList.map((store)=>{return {params:{id:store.fsq_id}}});
    return{
        paths,
        fallback: true
    }
}


const CoffeeShops = ({storeInfo: ssgStore , store}) => {
    let [storeData , setStoreData ] = useState(ssgStore);
    let [voteCount , setVoteCount] = useState('0')
    let router = useRouter();
    let routeId = router.query.id;
    
useEffect( ()=>{
        //check if route is ssg or not
        
        if(!ssgStore?.name){
            let reduxState = store.getState();
            if(reduxState){
                let reduxData = reduxState.csrStores;
                let getStoreByRedux = reduxData.filter(x => x.fsq_id === routeId);
                setStoreData(getStoreByRedux[0]);
            }
            if(!reduxState){
                async function asyncFuncInvoke () {
                    let req = await getAirtableData({id :`${routeId}`});
                let refactoredData = {...req , location:{address: req.address , neighborhood:req.neighborhood}};
                setStoreData(refactoredData)
                return;
                }
                asyncFuncInvoke();
            }
        }
        //fixing the undefined value of storeData.name
        if (storeData?.name){
            async function asyncFuncInvoke() {
                let airtableData =  getAirtableData({id:`${storeData.fsq_id}`,
            name:`${storeData.name}`,
            vote: storeData.vote || 0 ,
            address: `${storeData?.location.address}` ,
            neighborhood:`${storeData.location.neighborhood||storeData.location.address_extended||storeData.location.region}`,
            imgUrl:`${storeData.imgUrl}`
            });
            }
        asyncFuncInvoke()
        }
        return
    },[storeData , voteCount,routeId,ssgStore?.name , store])

let {data ,err} = useSWR(`/api/get-vote-data?id=${routeId}`, fetcher);
useEffect(() => {
        if (data?.vote) {
          setVoteCount(data.vote)
        }
      },[data]);

const handleUpVote=async(e)=>{
    e.preventDefault();
    //set component state 
    setVoteCount(++voteCount)
    //then send server req to update data
    let updatedData= await fetch(`/api/set-vote?id=${routeId}`)
}
    // fallback page
    if (router.isFallback) {
        return <div style={{color:'white',margin:'20px'}}>Loading...</div>;
    }

    return ( 
        <>
        <Head>
            <title>
            Store data
            </title>
        </Head>
        {storeData?.name && (
                <>
                <div className={styles.textContainer}>
                <h3>{storeData.name}</h3>
                <Button>
                    Go Home
                </Button>
                </div>
                <div className={styles.container}>

                <div className={styles.colLeft}>
                <Image src={storeData.imgUrl} layout='fill' quality={60} alt='coffee shop pics'  />
                </div>
                <div className={`${styles.colRight} ${styles.glass}`}>
                <p><span className="material-icons">location_on</span>{storeData.location.address}</p>
                <p><span className="material-icons">navigation</span>{storeData.location.neighborhood || storeData.location.address_extended || storeData.location.region}</p>
                <p><span className="material-icons">thumb_up_alt</span>{voteCount}</p>
                <Button color='gold' onClick={(e)=>{handleUpVote(e)}} style={{marginLeft: '22px'}}>Vote Up!</Button >
                </div>
                </div>
                </>
            )
        }
        </>
        );

    }
export default CoffeeShops;