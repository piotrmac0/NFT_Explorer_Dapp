import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

const Home = () => {

  const[wallet, setWalletAddress] = useState("0x");
  const [collection, setCollectionAddress] = useState("");

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div>
        {/*onChange for useSate, e = event, */}
        <input onChange={(e)=>{setWalletAddress(e.target.value)}} value={wallet} type={"text"} placeholder="Add your wallet address"></input>
        <input onChange={(e)=>{setCollectionAddress(e.target.value)}} value={collection} type={"text"} placeholder="Add the collection address"></input>
        <label><input type={"checkbox"}></input></label>
        <button>Search NFTs</button>
      </div>
    </div>
  )
}

export default Home
