---
outline: deep
head:
  - - meta
    - property: og:title
      content: Lit Protocol
  - - meta
    - name: description
      content: Guide to use a PKP Wallet as a signer
  - - meta
    - property: og:description
      content: Guide to use a PKP Wallet as a signer
---

# Lit Protocol

[LitProtocol](https://litprotocol.com/) is a blockchain-agnostic middleware network that can be used to read and write data between blockchains, state machines, and off-chain platforms with conditional decryption and programmatic signing.

Combining Lit Protocol's [pkp wallet](https://www.npmjs.com/package/@lit-protocol/pkp-ethers) with Account Kit allows you to use your Programmable Key Pairs (PKPs) as a smart account for your users.

# Integration

### Install the pkp ethers package

::: code-group

```bash [npm]
npm i @lit-protocol/pkp-ethers
```

```bash [yarn]
yarn add @lit-protocol/pkp-ethers
```

:::

### Install the LitNodeClient

::: code-group

```bash [npm]
npm i @lit-protocol/lit-node-client
```

```bash [yarn]
  yarn add @lit-protocol/lit-node-client
```

:::

### Creating PKP

See our docs [here](https://developer.litprotocol.com/v2/pkp/intro) for creating PKPs

### Create a SmartAccountSigner

Next, setup the `LitNodeClient` and `PKPEthersWallet` to create a `SmartAccountSigner`:

<<< @/snippets/lit.ts

### Use it with LightAccount

We can link our `SmartAccountSigner` to a `LightSmartContractAccount` from `aa-acounts`:
;;; code-group

```ts [example.ts]
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { LightSmartContractAccount } from "@alchemy/aa-accounts";
import { litSigner } from "./lit";
const chain = sepolia;
const provider = new AlchemyProvider({
  apiKey: "ALCHEMY_API_KEY",
  chain,
  entryPointAddress: "0x...",
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      entryPointAddress: "0x...",
      chain: rpcClient.chain,
      owner: litSigner,
      factoryAddress: "0x...",
      rpcClient,
    })
);
```

<<< @/snippets/lit.ts
;;;
