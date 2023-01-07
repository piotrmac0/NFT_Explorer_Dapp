import { useState } from 'react'
import {NFTCard} from './components/nftCard'
import Head from 'next/head'
import Image from 'next/image'

const Home = () => {

  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([]);
  //array for storing its collection or not
  const[fetchForCollection, setFetchForCollection] = useState(false);

  //fetch NFT function linked to button onClick
  const fetchNFTs = async() => {

      let nfts;
      // urls from alchemy api
      const apiKey = "2w9FFX8SC_ugaKEFXHRb-nEu1Dmcs82v";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
      console.log("fetching nfts");

      //if there isn't any collection we want fetch owner id nfts
      if(!collection.length) {
          //fetch from alchemy api: https://docs.alchemy.com/reference/getnfts
          var requestOptions = {
            method: 'get',
            redirect: 'follow'
          };
          // Replace with the wallet address you want to query:
          //const ownerAddr = "0xF5FFF32CF83A1A614e15F25Ce55B0c0A6b5F8F2c";
          const fetchURL = `${baseURL}?owner=${wallet}&orderBy=transferTime`;
          //fetch function and return json format
          nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      } 
      //if collection exist fetch collection only nft
      else { 
          console.log("Fetching nfts for collection owned by address");
          //fetch nfts belonging to wallet and collection both
          const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}&orderBy=transferTime`;
          nfts = await fetch(fetchURL, requestOptions).then(data => data.json());

        }
      //if nfts are there
      if(nfts) {
          console.log("nfts");
          //fetch only specific data from api returning json object
          setNFTs(nfts.ownedNfts);
      }
      
  }

  //F: fetch collection
  const fetchNFTsForCollection = async () => {
    if (collection.lenght) {
      const apiKey = "2w9FFX8SC_ugaKEFXHRb-nEu1Dmcs82v";
      const baseURL = `https://eth-mainnet.g.alchemy.com/nft/v2/${apiKey}/getNFTsForCollection/`;
      const fetchURL = `${baseURL}?contractAddress=${wallet}&withMetadata=${true}&orderBy=transferTime`;
     // const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${apiKey}/getNFTsForCollection`;
      //const url = `${baseURL}?contractAddress=${address}&withMetadata=${withMetadata}`;
      var requestOptions = {
        method: 'get',
        redirect: 'follow'
      }
      const nfts = await fetch(fetchURL, requestOptions).then(data => data.json());
      if(nfts) {
        console.log("NFTs in collection:", nfts);
        setNFTs(nfts.nfts);
      }
    }
  }


  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <h1 className="flex justify-center font-bold mb-10 mt-5 text-3xl leading-none text-slate-700">NFT Wallets Explorer</h1>
      <div className="flex flex-col w-full justify-center items-center gap-y-3">
        {/*onChange for useSate, e = event, */}
        <input disabled={fetchForCollection} className="w-4/5 md:w-3/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add the wallet address"> 
        </input>

        <input className="w-4/5 md:w-3/5 bg-slate-100 py-2 px-2 rounded-lg text-gray-800 focus:outline-blue-300 disabled:bg-slate-50 disabled:text-gray-50"
        onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address">
        </input>

        <label className="text-gray-600"><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch only collection</label>
        {/*button with fetchings its collection or not and calling proper to that state function */}
        
        <button className={"disabled:bg-slate-500 text-white bg-slate-800 px-4 py-2 mt-3 rounded-md w-2/5 md:w-1/5 mb-10"}
        onClick={() => {
            if(fetchForCollection) {
                fetchNFTsForCollection()
            } else fetchNFTs()
        }
        }>Search NFTs</button>
      </div>

      <div className="flex flex-wrap gap-y-12 mt-4 w-6/6 gap-x-5 justify-center">
        {NFTs.length && NFTs.map(nft => {
          return (
            <NFTCard nft={nft}></NFTCard>
          )
        })
        }
      </div>

    </div>
  )
}

export default Home
