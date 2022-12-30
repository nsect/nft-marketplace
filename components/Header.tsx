import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import {
  BellIcon,
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

type Props = {};
function Header({}: Props) {
  const connectWithMetamask = useMetamask();
  const disconnect = useDisconnect();
  const address = useAddress();

  return (
    <div className="max-w-6xl mx-auto p-2">
      <nav className="flex justify-between">
        <div className="flex items-center space-x-2 text-sm">
          {address ? (
            <button onClick={disconnect} className="connectWalletBtn">
              Hi, {address.slice(0, 5) + '...' + address.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWithMetamask} className="connectWalletBtn">
              Connect your wallet
            </button>
          )}

          <p className="headerLink">Help & Contact</p>
        </div>

        <div className="flex items-center space-x-4 text-sm">
          <p className="headerLink">Sell</p>
          <p className="headerLink">Watchlist</p>

          <Link className="flex items-center hover:link" href="/addItem">
            Add to inventory
            <ChevronDownIcon className="h-4" />
          </Link>

          <BellIcon className="h-6 w-6 cursor-pointer hover:text-[#0064D3]" />
          <ShoppingCartIcon className="h-6 w-6 cursor-pointer hover:text-[#0064D3]" />
        </div>
      </nav>
      <hr className="mt-2" />

      <section className="flex items-center space-x-2 py-3 md:py-5 ">
        <div className=" h-24 w-24 sm:w-28 md:w-44 cursor-pointer flex-shrink-0">
          <Link href="/">
            <Image
              className="h-full w-full object-contain"
              alt="thirdweb logo"
              src="/nftLogo.png"
              width={200}
              height={200}
            />
          </Link>
        </div>

        <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1">
          <MagnifyingGlassIcon className="w-5 text-gray-400" />
          <input
            className="flex-1 outline-none"
            type="text"
            placeholder="Search for anything"
          />
        </div>

        <button className="hidden sm:inline bg-[#0064D3] text-white px-5 md:px-10 py-2 border-2 border-[#0064D3]">
          Search
        </button>

        <Link href="/create">
          <button className="border-2 border-[#0064D3] px-5 md:px-10 py-2 text-[#0064D3] hover:bg-[#0064D3]/50 hover:text-white cursor-pointer">
            List Item
          </button>
        </Link>
      </section>
      <hr />
    </div>
  );
}
export default Header;
