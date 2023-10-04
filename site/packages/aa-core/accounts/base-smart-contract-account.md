---
outline: deep
head:
  - - meta
    - property: og:title
      content: BaseSmartContractAccount
  - - meta
    - name: description
      content: Overview of BaseSmartContractAccount class exported by aa-core accounts
  - - meta
    - property: og:description
      content: Overview of BaseSmartContractAccount class exported by aa-core accounts
---

# BaseSmartContractAccount

The `BaseSmartContractAccount` is an abstract class that implements `ISmartContractAccount` interface, which defines how you would interact with your Smart Contract Account. Any class that extends and implements `BaseSmartContractAccount` may also expose additional methods that allow its connecting [SmartAccountProvider](../provider) to provide ergonic utilities for building and submitting User Operations.

## Abstract Methods That You Must Implement

### `getAccountInitCode()`

This method should return the init code that will be used to create an account if one does not exist.

Usually this is the concatenation of the account's factory address and the abi encoded function data of the account factory's `createAccount` method.

#### Returns

- `Promise<Hex>` - The promise containing the init code for the account

---

### `getDummySignature()`

This method should return a signature that will not `revert` during validation. It does not have to pass validation, just not cause the contract to revert. This is required for gas estimation so that the gas estimate are accurate.

#### Returns

- `Hash` - A dummy signature that doesn't cause the account to revert during estimation

---

### `signMessage(msg: string | Uint8Array | Hex)`

This method should return an [ERC-191](https://eips.ethereum.org/EIPS/eip-191) compliant message and is used to sign UserOperation Hashes

#### Parameters

- `msg`: `string | Uint8Array | Hex` - The message to sign

#### Returns

- `Promise<Hex>` - The promise containing the signature of the message

---

### `encodeExecute(target: string, value: bigint, data: string)`

Returns the abi encoded function data for a call to your contract's `execute` method

#### Parameters

- `target`: `string` - The address receiving the call data. Equivalent to `to` in a normal transaction.
- `value`: `bigint` - Optionally, the amount of native token to send. Equivalent to `value` in a normal transaction.
- `data`: `string` - The call data or "0x" if empty. Equivalent to `data` in a normal transaction.

#### Returns

- `Promise<Hex>` - The promise containing the abi encoded function data for a call to your contract's `execute` method

## Optional Methods To Implement

### `signTypedData(params: SignTypedDataParams)`

If your contract supports signing and verifying typed data, you should implement this method that returns the signed typed data object as per [ERC-712](https://eips.ethereum.org/EIPS/eip-712).

#### Parameters

- `params`: `SignTypedDataParams` - The typed data to sign
  -- `domain: TypedDataDomain` - The typed data domain
  -- `types: Object` - the type definitions for the typed data
  -- `primaryType: inferred String` - the primary type to extract from types and use in value
  -- `message: inferred from types & primaryType` - the message, inferred from

#### Returns

- `Promise<Hash>` - A Promise containing the signature of the typed data.

---

### `signMessageWith6492(msg: string | Uint8Array | Hex)`

This method should wrap the result of `signMessage` as per [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492) for signing the message for deployed smart contract accounts, as well as undeployed accounts (counterfactual addresses).

#### Parameters

- `msg`: `string | Uint8Array | Hex` - The message to sign

#### Returnss

- `Promise<Hex>` - A Promise containing the signature of the message, additionally wrapped in EIP-6492 format if the account is undeployed

---

### `signTypedDataWith6492(params: SignTypedDataParams)`

Similar to the signMessageWith6492 method above, this method should wrap the result of `signTypedData` as per [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492) to support signing the typed data for deployed smart contract accounts, as well as undeployed accounts (counterfactual addresses).

#### Parameters

- `params`: `SignTypedDataParams` - The typed data to sign
  -- `domain: TypedDataDomain` -- The typed data domain
  -- `types: Object` -- the type definitions for the typed data
  -- `primaryType: inferred String` -- the primary type to extract from types and use in value
  -- `message: inferred from types & primaryType` -- the message, inferred from

#### Returns

- `Promise<Hash>` - A Promise containing the signature of the typed data, additionally wrapped in ERC-6492 format if the account is undeployed

---

### `encodeBatchExecute(txs: BatchUserOperationCallData)`

**NOTE**: Not all accounts support batching. If your contract does, this method should encode a list of transactions into the call data that will be passed to your contract's `batchExecute` method.

#### Parameters

- `txs`: `BatchUserOperationCallData` - An array of objects containing the target, value, and data for each transaction

#### Returns

- `Promise<Hex>` - The promise containing the abi encoded function data for a call to your contract's `batchExecute` method

## Other ISmartContractAccount Methods

### `getAddress()`

Returns the address of the account.

#### Returns

- `Promise<Address>` - A Promise that resolves to the address of the connected account

---

### `getNonce()`

Returns the nonce of the account.

#### Returns

- `Promise<bigint>` - A Promise that resolves to the nonce of the connected account
