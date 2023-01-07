//creating NFT compontent with nft as props
export const NFTCard = ({nft}) => {
    return (
        <div className="w-3/4 md:w-1/4 flex flex-col rounded-lg">
            <div>
                <img src={nft.media[0].gateway} className="object-cover h-128 w-full rounded-t-lg"></img>
            </div>
            <div className="flex flex-col y-gap-2 px-2 py-3 bg-slate-100 rounded-b-lg h-110">
                <div>
                    <h2 className="text-gray-800 font-bold">{nft.title}</h2>
                    <p className="text-gray-600">{nft.id.tokenId.substr(nft.id.tokenId.length -4)}</p>
                    <p className="text-gray-600">{`${nft.contract.address.substr(0,5)}...${nft.contract.address.substr(nft.contract.address.length - 4)}`} </p>
                    <div className="flex justify-center mb-1">
                        <a href={`https://etherscan.io/token/${nft.contract.address}`} target={"_blank"} className="py-2 px-4 bg-blue-500 w-3/5 md:w-5/5 text-center rounded-lg text-white cursor-pointer mt-3">See on Etherscan</a>
                    </div>
                </div>
            </div>
           
        </div>
    )
}