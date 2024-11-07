import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

export default function WalletWrapper() {
return (
  <header className="pt-4 pr-4">
    <div className="flex justify-end">
        <div className="wallet-container flex space-x-2">
          <Wallet>
            <ConnectWallet className='btn group'>
              <Avatar className="h-6 w-6" />
              <Name className="text-white" />
            </ConnectWallet>
            <WalletDropdown className=''>
              <Identity className="px-4 bg-gradient-conic shadow-lg cursor-pointer py-3 text-sm" hasCopyAddressOnClick={true}>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
                className='text-sm pl-6 cursor-pointer'
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect className='text-sm pl-6 cursor-pointer'/>
            </WalletDropdown>
          </Wallet>
        </div>
      </div>
  </header>
);
}