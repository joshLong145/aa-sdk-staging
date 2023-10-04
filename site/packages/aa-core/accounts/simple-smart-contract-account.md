---
outline: deep
head:
  - - meta
    - property: og:title
      content: SimpleSmartContractAccount
  - - meta
    - name: description
      content: Overview of SimpleSmartContractAccount class exported by aa-core accounts
  - - meta
    - property: og:description
      content: Overview of SimpleSmartContractAccount class exported by aa-core accounts
---

# SimpleSmartContractAccount

[SimpleSmartContractAccount](packages/core/src/account/simple.ts) a simple implementation version of `BaseSmartContractAccount`. It implements the required abstraction methods in `BaseSmartContractAccount` (indicated below), and plus, it additionally implements the optional method `encodeBatchExecute` method to support batching transactions feature for the smart account.

1. `getDummySignature` -- this method returns a signature that will not `revert` during validation. It does not have to pass validation, just not cause the contract to revert. This is required for gas estimation so that the gas estimate are accurate.
2. `encodeExecute` -- this method returns the abi encoded function data for a call to your contract's `execute` method
3. `signMessage` -- this method returns an [EIP-191](https://eips.ethereum.org/EIPS/eip-191) compliant message and is used to sign UO Hashes
4. `getAccountInitCode` -- this method returns the account init code that will be used to create an account if one does not exist. Usually this is the concatenation of the account's factory address and the abi encoded function data of the account factory's `createAccount` method.

## Usage

### via `aa-core`

```ts
import {
  SimpleSmartContractAccount,
  SmartAccountProvider,
  type SmartAccountSigner,
  LocalAccountSigner,
} from "@alchemy/aa-core";
import { mnemonicToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { toHex } from "viem";

const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

// 1. define the EOA owner of the Smart Account
// this uses a utility method for creating an account signer using mnemonic
// we also have a utility for creating an account signer from a private key
const owner: SmartAccountSigner =
  LocalAccountSigner.mnemonicToAccountSigner(MNEMONIC);

// 2. initialize the provider and connect it to the account
const provider = new SmartAccountProvider({
  // the demo key below is public and rate-limited, it's better to create a new one
  // you can get started with a free account @ https://www.alchemy.com/
  rpcProvider: "https://polygon-mumbai.g.alchemy.com/v2/demo",
  entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  chain: polygonMumbai,
}).connect(
  (rpcClient) =>
    new SimpleSmartContractAccount({
      entryPointAddress: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
      chain: polygonMumbai,
      factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
      rpcClient,
      owner,
      // optionally if you already know the account's address
      accountAddress: "0x000...000",
    })
);

// 3. send a UserOperation
const { hash } = await provider.sendUserOperation({
  target: "0xTargetAddress",
  data: "0xcallData",
  value: 0n, // value: bigint or undefined
});
```

### via `aa-alchemy`

```ts
import {
  SimpleSmartContractAccount,
  type SmartAccountSigner,
  LocalAccountSigner,
} from "@alchemy/aa-core";
import { toHex } from "viem";
import { mnemonicToAccount } from "viem/accounts";
import { polygonMumbai } from "viem/chains";
import { AlchemyProvider } from "@alchemy/aa-alchemy";

const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

// 1. define the EOA owner of the Smart Account
// this uses a utility method for creating an account signer using mnemonic
// we also have a utility for creating an account signer from a private key
const owner: SmartAccountSigner =
  LocalAccountSigner.mnemonicToAccountSigner(MNEMONIC);

// 2. initialize the provider and connect it to the account
let provider = new AlchemyProvider({
  apiKey: API_KEY,
  chain,
  entryPointAddress: ENTRYPOINT_ADDRESS,
}).connect(
  (rpcClient) =>
    new SimpleSmartContractAccount({
      entryPointAddress: ENTRYPOINT_ADDRESS,
      chain: polygonMumbai, // ether a viem Chain or chainId that supports account abstraction at Alchemy
      owner,
      factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
      rpcClient,
    })
);

// [OPTIONAL] Use Alchemy Gas Manager
provider = provider.withAlchemyGasManager({
  policyId: PAYMASTER_POLICY_ID,
  entryPoint: ENTRYPOINT_ADDRESS,
});

// 3. send a UserOperation
const { hash } = await provider.sendUserOperation({
  target: "0xTargetAddress",
  data: "0xcallData",
  value: 0n, // value: bigint or undefined
});
```

### via `aa-ethers`

```ts
import {
  alchemyPaymasterAndDataMiddleware,
  getChain,
  SimpleSmartContractAccount,
} from "@alchemy/aa-core";
import { Alchemy, Network } from "alchemy-sdk";
import { Wallet } from "@ethersproject/wallet";
import {
  EthersProviderAdapter,
  convertWalletToAccountSigner,
} from "@alchemy/aa-ethers";

const SIMPLE_ACCOUNT_FACTORY_ADDRESS =
  "0x9406Cc6185a346906296840746125a0E44976454";

// 1. connect to an RPC Provider and a Wallet
const alchemy = new Alchemy({
  apiKey: API_KEY,
  network: Network.MATIC_MUMBAI,
});
const alchemyProvider = await alchemy.config.getProvider();
const owner = Wallet.fromMnemonic(MNEMONIC);

// 2. Create the SimpleAccount signer
// signer is an ethers.js Signer
const signer = EthersProviderAdapter.fromEthersProvider(
  alchemyProvider,
  ENTRYPOINT_ADDRESS
).connectToAccount(
  (rpcClient) =>
    new SimpleSmartContractAccount({
      entryPointAddress: ENTRYPOINT_ADDRESS,
      chain: getChain(alchemyProvider.network.chainId),
      owner: convertWalletToAccountSigner(owner),
      factoryAddress: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
      rpcClient,
    })
);

// 3. send a user op
const { hash } = await signer.sendUserOperation({
  target: "0xTargetAddress",
  data: "0xcallData",
  value: 0n, // value: bigint or undefined
});
```
