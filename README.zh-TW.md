# Truffle React boilerplate

Truffle + React + Babel + Webpack

## Getting Started

安裝 npm 和 [truffle](https://github.com/trufflesuite/truffle) `npm install -g truffle`

```
git clone https://github.com/wayne5540/truffle-react-boilerplate.git my-project
cd my-project
npm install
```

### 開啟 Client:

* 安裝本地 test 用的 blockchain

[testrpc](https://github.com/ethereumjs/testrpc) `npm install -g ethereumjs-testrpc`

* 安裝瀏覽器錢包：

[metamask](https://metamask.io/)(Chrome) 或是 [mist](https://github.com/ethereum/mist/releases)

* 錢包安裝完後把錢包 Server 換成 local 的 server，通常是 8545 port

* 然後運行：

```
testrpc
truffle compile
truffle migrate
yarn start
```

瀏覽器會自動打開 `localhost:8080` 就可以看到 Client 了


### 在 Truffle console 內操作 Contract 

Example

**Get owner address**

```
SimpleStorage.deployed().then(function(instance) { instance.owner().then((address) => console.log(address)) } )
```

**Set value**

```
SimpleStorage.deployed().then(function(instance) { instance.setValue(10) } )
```

### Test

```
truffle test
```

## Trouble Shooting

### 錢包沒錢怎麼辦？

**在 testrpc 情況下 (local node)**

進 console 操作錢包打錢到瀏覽器的錢包（Metamask or Mist）

```
truffle console

web3.eth.sendTransaction({from: web3.eth.accounts[2], to: 'YOUR_ETH_ADDRESS', value: web3.toWei(2, "ether")})
```

**在 ropsten testnet 的情況下**

到 http://faucet.ropsten.be:3001/ 要一點錢就行了


## Deployment

* Client: 任何可以 serve static file 的地方都可以 depoly client
* Contract: 任何有 sync 全節點的地方

### Deploy to testnet (or Main chain)

You need to sync testnet node first before you deploy, the easiest way to do this is by using [geth](https://github.com/ethereum/go-ethereum/wiki/geth) or [parity](https://github.com/paritytech/parity) to sync node, example here are using `geth`

**create account under testnet**

https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

**deploy**

In first console
```
geth --testnet --rpc --datadir /usr/local/var/ethereum-testnet-data console 2>> /usr/local/var/log/geth.testnet.log

personal.unlockAccount(eth.accounts[0], "YOUR_ACCOUNT_PASSWORD", 36000)
```

In another console
```
truffle migrate --network ropsten
```

All done.

## Bugs

- [] Can't find web3 after page refreshed
  - `Uncaught (in promise) TypeError: Cannot read property 'apply' of undefined`