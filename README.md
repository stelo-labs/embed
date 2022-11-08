# Quick Start

# Getting Started

In the root directory of your project run `yarn add @stelolabs/embed`. You'll need node.js 16 or later.

The Stelo embed SDK can be imported and used in 3 ways: a React component, an ES6 module or as a directly imported JS script. See the basic usage section below to use the ES6 module or see the `examples/` folder for examples of all 3 flavors.

You'll need to set your Stelo API key to use Stelo embed.

## Basic Usage

```js
import Stelo from "@stelolabs/embed";

// Initialize your SDK
Stelo.init("YOUR_API_KEY");

// Embed an iframe with-in dom element with the id #frame-container. Pass the iframe the url & request for rendering.
Stelo.embed("#frame-container", {
  url: "https://stelolabs.com",
  request: {
    method: "eth_sendTransaction",
    params: [
      {
        gas: "0x114f6",
        value: "0x0",
        from: "0x5da723b2472399d2d2f3bbc2c3674263aada977b",
        to: "0x4ecd988f2861e479f7eb2e94bbb48709b9a2cb5b",
        data: "0x42842e0e0000000000000000000000005da723b2472399d2d2f3bbc2c3674263aada977b0000000000000000000000001fa90ecb519c0b26222c10106d1082730065044600000000000000000000000000000000000000000000000000000000000024c7",
      },
    ],
  },
});
```

## In Depth

The `Stelo.embed` function is used to create and insert an iframe into a specified dom element. The SDK will pass your api key and a transaction or signature to Stelo's web app for processing and rendering.

`Stelo.embed` takes three arguments

- a CSS Selector, used to determine which element the iframe should be appended to. eg. `#req-simulation-container-0x123`
- a data payload for Stelo to process and render, this includes the dapp url that originated the request & the request itself. eg.

  ```json
  {
    "url": "https://opensea.io",
    "request": {
      "method": "eth_sendTransaction",
      "params": [
        {
          "gas": "0x114f6",
          "value": "0x0",
          "from": "0x5da723b2472399d2d2f3bbc2c3674263aada977b",
          "to": "0x4ecd988f2861e479f7eb2e94bbb48709b9a2cb5b",
          "data": "0x42842e0e0000000000000000000000005da723b2472399d2d2f3bbc2c3674263aada977b0000000000000000000000001fa90ecb519c0b26222c10106d1082730065044600000000000000000000000000000000000000000000000000000000000024c7"
        }
      ]
    }
  }
  ```

- Some optional attributes to assign to the created iframe element. eg.

```json
{ "className": "customIframeClass", "height": "800", "width": "440" }
```
