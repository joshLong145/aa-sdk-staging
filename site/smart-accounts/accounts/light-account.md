---
outline: deep
head:
  - - meta
    - property: og:title
      content: Using Light Account
  - - meta
    - name: description
      content: Using Light Account with Account Kit
  - - meta
    - property: og:description
      content: Using Light Account with Account Kit
---

# Light Account

Light Account is a simple, secure, and cost-effective smart account implementation. It supports features such as ownership transfer, EIP-1271 message signing, and batched transactions. We recommend using Light Account for most use cases.

## Using Light Account

The code snippet below demonstrates the usage of Light Account with Account Kit. It creates a Light Account and sends a `UserOperation` from it:

<!--@include: ../../getting-started.md{56,68}-->

## Benchmarks

Here are some benchmarks for the Light Account and other smart account implementations you might consider:

| Account              | Creation | Native transfer | ERC20 transfer | Total Gas |
| -------------------- | -------- | --------------- | -------------- | --------- |
| Alchemy LightAccount | 279746   | 100844          | 90345          | 470935    |
| Kernel v2.1-lite     | 230968   | 101002          | 90321          | 422291    |
| Kernel v2.1          | 265215   | 106460          | 96038          | 467713    |
| Biconomy             | 270013   | 104408          | 93730          | 468151    |
| Etherspot            | 279219   | 103719          | 93324          | 476262    |
| Kernel v2.0          | 339882   | 110018          | 99622          | 549522    |
| SimpleAccount        | 383218   | 101319          | 90907          | 575444    |
