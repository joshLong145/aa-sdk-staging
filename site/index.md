---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
# HTML Metadata
title: account-kit
titleTemplate: :title · TypeScript Interface for ERC-4337
description: Everything you need to build 4337 accounts for your users
# you can also add HTML or Markdown components below the --- line to add custom HTML or Markdown content (eg: https://github.com/wagmi-dev/viem/blob/main/site/index.md?plain=1)
---

<div class="Global">
  <div class="Main">
    <div class="Hero">
      <div class="Hero Info">
        <div class="Hero Info LogoTitle">
          <img src="/kit-logo.svg" alt="Account Kit Logo" />
          <span>Account Kit</span>
        </div>
        <div class="Hero Info Title">
          Account Abstraction Legos
        </div>
        <div class="Hero Info SubTitle">
          Everything you need to build 4337 accounts.
        </div>
        <div class="Hero Info ButtonGroup">
          <a rel="noopener noreferrer" href="./getting-started.html">
            <button class="ExploreTheDocsButton">Explore the docs</button>
          </a>
          <a rel="noopener noreferrer" href="./packages/overview.html">
            <button class="WhyAccountKitButton">Why Account Kit?</button>
          </a>
        </div>
      </div>
<!-- needs to be formatted differently to work in markdown -->
<div class="vp-doc">

::: code-group

```typescript [getStarted.ts]
const provider = new AlchemyProvider({
  ...providerConfig,
}).connect(
  (rpcClient) =>
    new LightSmartContractAccount({
      ...accountConfig,
      rpcClient,
    })
);

const { hash } = await provider.sendUserOperation(uo);
```

:::

</div>
    </div>
  </div>
  <div class="LinkCardGroup">
    <div class="LinkCard Intro">
      <div class="LinkCardContent">
        <div class="LinkCardHeading">Introduction</div>
        <div class="LinkCardSubHeading">
          What can you do with the Alchemy Account Kit?
        </div>
      </div>
      <div class="LinkCardCTA">
        <a rel="noopener noreferrer" href="./introduction.html">
          <img src="/arrow-right.svg" alt="Click Here" />
        </a>
      </div>
    </div>
    <div class="LinkCard GetStarted">
      <div class="LinkCardContent">
        <div class="LinkCardHeading">Getting Started</div>
        <div class="LinkCardSubHeading">
          This guide will help you get started with Account Kit.
        </div>
      </div>
      <div class="LinkCardCTA">
        <a rel="noopener noreferrer" href="./getting-started.html">
          <img src="/arrow-right.svg" alt="Click Here" />
        </a>
      </div>
    </div>
    <div class="LinkCard Overview">
      <div class="LinkCardContent">
        <div class="LinkCardHeading">Packages overview</div>
        <div class="LinkCardSubHeading">
          The Alchemy Account Kit SDK is comprised of a number of smaller
          packages.
        </div>
      </div>
      <div class="LinkCardCTA">
        <a rel="noopener noreferrer" href="./packages/overview.html">
          <img src="/arrow-right.svg" alt="Click Here" />
        </a>
      </div>
    </div>
  </div>
  <div class="Footer">
    <div class="FooterContent">
      <div class="FooterLeftContent">
        <img src="/alchemy.svg" alt="Alchemy Logo" />
        <text>The web3 development platform</text>
      </div>
      <div class="FooterSocialLinkGroup">
        <a target="_blank" href="https://www.facebook.com/alchemyplatform/">
          <img src="/fb.svg" alt="Facebook Logo" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/company/alchemyinc/">
          <img src="/linkedin.svg" alt="LinkedIn Logo" />
        </a>
        <a target="_blank" href="https://twitter.com/AlchemyPlatform/">
          <img src="/twitter.svg" alt="Twitter Logo" />
        </a>
      </div>
    </div>
    <div class="FooterDivider"></div>
    <div class="FooterCopyRight">
      <text>2023 Alchemy Insights, Inc. · Terms of Service</text>
      <a target="_blank" href="https://www.alchemy.com">
        <button class="FooterCopyRightButton">Powered by Alchemy</button>
      </a>
    </div>
  </div>
</div>
