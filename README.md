# HEX App by Staker

This code is a secondary frontend for the [HEX smart contract](https://etherscan.io/address/0x2b591e99afe9f32eaa6214f7b7629768c40eeb39#code). It is meant to be an alternative to the primary [Staker](https://staker.app/) frontend for HEX users with [Safe](https://gnosis-safe.io/) wallets (formerly known as *Gnosis Safe* wallets). You have a Safe wallet if you have created a *Smart Wallet* via the Staker app.

## Running

HEX App is a 3rd party app for [Safe](https://app.safe.global/). You can use it in the same way you use any Safe app. Read more about [connecting](https://help.gnosis-safe.io/en/articles/4689442-why-do-i-need-to-connect-a-signer-wallet) your signer wallet and using apps on the [Safe Help](https://help.gnosis-safe.io/en/) page.

As always, use caution when connecting your wallet to any dApp, or when using your recovery phrase for anything. Note that it is not necessary to type your recovery phrase into any keyboard to use this app. Most users will already have a Staker wallet on a mobile device and a recovery phrase that was generated when setting up Staker. To use this app, that wallet will need some way to connect. A common setup for interacting with Safe apps is to use a hardware wallet connected to [MetaMask](https://metamask.io/). There are other ways, but you are responsible for the security of your funds, so make good choices.

### Running Locally

To run locally from source, install the dependencies and start a local dev server. The current state of dependencies requires using the `--legacy-peer-deps` flag.

```
npm install --legacy-peer-deps
npm start
```

Open the Safe interface, click on Apps -> Add custom App, then enter the local url that `npm start` produced, usually `http://localhost:3000`

## Contributing

Feel free to submit issues on github or open a PR. There is no guarantee we will make or approve any updates. Since the code is open source, you can always fork it and create another Safe app with new features. We will establish further guidelines if there is sufficient demand for contributing.