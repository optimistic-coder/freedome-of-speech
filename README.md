# React Truffle Box

This box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

## Installation

First ensure you are in an empty directory.



```sh
# Install Truffle globally and run `truffle unbox`
$ npm install -g truffle
$ inside project run npm install
$ inside client folder npm install
$ make sure ganache-cli is running and with local private key(which provided by ganache-cli) set up metmask with fake 100ETH(before that set up in metamsak for local network and import account)
$ inside truffle folder run truffle compile
$ truffle migrate --reset
$ cd client && npm start
```

```sh


  The Truffle project is set to deploy to Ganache by default. If you'd like to change this, it's as easy as modifying the Truffle config file! Check out [our documentation on adding network configurations](https://trufflesuite.com/docs/truffle/reference/configuration/#networks). From there, you can run `truffle migrate` pointed to another network, restart the React dev server, and see the change take place.

- __Where can I find more resources?__

  This Box is a sweet combo of [Truffle](https://trufflesuite.com) and [Webpack](https://webpack.js.org). Either one would be a great place to start!
