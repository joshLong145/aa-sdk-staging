import { PKPEthersWallet } from "@lit-protocol/pkp-ethers";
import { LitActionResource, LitAbility } from "@lit-protocol/auth-helpers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { AuthCallbackParams } from "@lit-protocol/types";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";

export const entryPointAddress = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789";

const POLYGON_MUMBAI_RPC_URL = "https://polygon-mumbai-bor.publicnode.com";
const PKP_PUBLIC_KEY = "<YOUR PKP PUBLIC KEY>";

const litNodeClient = new LitNodeClient({
  litNetwork: "serrano",
  debug: false,
});
await litNodeClient.connect();

const resourceAbilities = [
  {
    resource: new LitActionResource("*"),
    ability: LitAbility.PKPSigning,
  },
];

/**
 * For provisioning keys and setting up authentication methods see documentation below
 * https://developer.litprotocol.com/v2/pkp/minting
 */
const authNeededCallback = async (params: AuthCallbackParams) => {
  console.log("params", params);
  const response = await litNodeClient.signSessionKey({
    sessionKey: params.sessionKeyPair,
    statement: params.statement,
    authMethods: [],
    pkpPublicKey: PKP_PUBLIC_KEY,
    expiration: params.expiration,
    resources: params.resources,
    chainId: 1,
  });
  console.log("callback response", response);
  return response.authSig;
};

const sessionSigs = await litNodeClient
  .getSessionSigs({
    chain: "ethereum",
    expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    resourceAbilityRequests: resourceAbilities,
    authNeededCallback,
  })
  .catch((err) => {
    console.log("error while attempting to access session signatures: ", err);
    throw err;
  });

const pkpWallet = new PKPEthersWallet({
  pkpPubKey: PKP_PUBLIC_KEY,
  rpc: POLYGON_MUMBAI_RPC_URL,
  controllerSessionSigs: sessionSigs,
});

// a smart account signer you can use as an owner on ISmartContractAccount
export const litSigner: SmartAccountSigner = new WalletClientSigner(
  pkpWallet.rpcProvider // JsonRpcProvider instance
);
