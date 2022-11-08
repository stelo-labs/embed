import {
  SteloEmbedProvider,
  SteloEmbedComponent,
} from "@stelolabs/embed/dist/react";

function App() {
  return (
    <div className="App">
      <SteloEmbedProvider apiKey="YOUR_API_KEY">
        <SteloEmbedComponent
          style={{ width: "440px", height: "100vh" }}
          data={{
            url: "https://stelolabs.com",
            request: {
              method: "eth_signTypedData_v4",
              params: [
                "0x5da723b2472399d2d2f3bbc2c3674263aada977b",
                '{"types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"OrderComponents":[{"name":"offerer","type":"address"},{"name":"zone","type":"address"},{"name":"offer","type":"OfferItem[]"},{"name":"consideration","type":"ConsiderationItem[]"},{"name":"orderType","type":"uint8"},{"name":"startTime","type":"uint256"},{"name":"endTime","type":"uint256"},{"name":"zoneHash","type":"bytes32"},{"name":"salt","type":"uint256"},{"name":"conduitKey","type":"bytes32"},{"name":"counter","type":"uint256"}],"OfferItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"}],"ConsiderationItem":[{"name":"itemType","type":"uint8"},{"name":"token","type":"address"},{"name":"identifierOrCriteria","type":"uint256"},{"name":"startAmount","type":"uint256"},{"name":"endAmount","type":"uint256"},{"name":"recipient","type":"address"}]},"primaryType":"OrderComponents","domain":{"name":"Seaport","version":"1.1","chainId":"1","verifyingContract":"0x00000000006c3852cbEf3e08E8dF289169EdE581"},"message":{"offerer":"0x5DA723b2472399D2D2f3Bbc2C3674263aaDa977b","offer":[{"itemType":"1","token":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","identifierOrCriteria":"0","startAmount":"10000000000000000","endAmount":"10000000000000000"}],"consideration":[{"itemType":"2","token":"0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D","identifierOrCriteria":"608","startAmount":"1","endAmount":"1","recipient":"0x5DA723b2472399D2D2f3Bbc2C3674263aaDa977b"},{"itemType":"1","token":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","identifierOrCriteria":"0","startAmount":"250000000000000","endAmount":"250000000000000","recipient":"0x0000a26b00c1F0DF003000390027140000fAa719"},{"itemType":"1","token":"0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2","identifierOrCriteria":"0","startAmount":"250000000000000","endAmount":"250000000000000","recipient":"0xA858DDc0445d8131daC4d1DE01f834ffcbA52Ef1"}],"startTime":"1667406222","endTime":"1667665415","orderType":"2","zone":"0x004C00500000aD104D7DBd00e3ae0A5C00560C00","zoneHash":"0x0000000000000000000000000000000000000000000000000000000000000000","salt":"24446860302761739304752683030156737591518664810215442929818136109356453281079","conduitKey":"0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000","totalOriginalConsiderationItems":"3","counter":"0"}}',
              ],
            },
          }}
        ></SteloEmbedComponent>
      </SteloEmbedProvider>
    </div>
  );
}

export default App;
