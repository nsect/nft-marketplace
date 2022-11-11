import Header from '../components/Header';
import { useAddress, useContract } from '@thirdweb-dev/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

type Props = {};
function addItem({}: Props) {
  const address = useAddress();
  const router = useRouter();
  const [preview, setPreview] = useState<string>();
  const [image, setimage] = useState<File>();
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_COLLECTION_CONTRACT,
    'nft-collection'
  );

  const mintNft = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contract || !address) return;
    
    if (!image) {
        alert('Please select an image');
        return;
    }

    const target = e.target as typeof e.target & {
        name: { value: string };
        description: { value: string };
    }

    const metadata = {
        name: target.name.value,
        description: target.description.value,
        image: image, //image url or file
    }

    try {
        const tx = await contract.mintTo(address, metadata);

        const receipt = tx.receipt; // transaction receipt
        const tokenId = tx.id; //the id of the NFT minted
        const nft = await tx.data(); // (optional) fetch details of minted NFT

        router.push('/');

    } catch (error) {
        console.log(error);
    }
  };
    


  return (
    <div>
      <Header />

      <main className="max-w-6xl mx-auto p-10 border">
        <h1 className="text-4xl font-bold">Add an Item to the Marketplace</h1>
        <h2 className="text-xl font-semibold pt-5">Item Details</h2>
        <p className="pb-5">
          By adding an item to the marketplace, you're essentially Minting an
          NFT of the item into your wallet, which we can then list for sale!
        </p>

        <div className="flex flex-col justify-center items-center md:flex-row md:space-x-5 pt-5">
          <img
            className="border h-80 w-80 object-contain"
            src={preview || "https://links.papareact.com/ucj"}
            alt="add item image"
          />

          <form onSubmit={mintNft} className="flex flex-col flex-1 p-2 space-y-2">
            <label className="font-light">Name of Item</label>
            <input
              className="formField"
              type="text"
              placeholder="Name of Item..."
              name="name"
              id="name"
            />
            <label className="font-light">Description</label>
            <input
              className="formField"
              type="text"
              placeholder="Enter description..."
              name='description'
              id='description'
            />
            <label className="font-light">Image of the Item</label>
            <input
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setPreview(URL.createObjectURL(e.target.files[0]));
                  setimage(e.target.files[0])
                }
              }}
              type="file"
              className="pb-5"
            />

            <button type='submit' className="bg-blue-600 font-bold text-white rounded-md py-4 px10 w-56 md:mt-auto mx-auto sm:mt-5 md:ml-auto ">
              Add/Mint Item
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
export default addItem;
