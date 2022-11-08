import { SteloEmbedPayload } from "./types";

type InternalPayload = SteloEmbedPayload & { id: number };

const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

const postMessage = (iframe: HTMLIFrameElement, data: InternalPayload) => {
  iframe.contentWindow &&
    iframe.contentWindow.postMessage({ ...data, type: "stelo_request" }, "*");
};

const iframeReadyListener =
  (iframe: HTMLIFrameElement, data: InternalPayload) => (event: any) => {
    if (
      event.data.type === "STELO_IFRAME_READY" &&
      event.data.id === data.id.toString()
    ) {
      postMessage(iframe, data);
    }
  };

type IframeOverrides = {
  className?: string;
  width?: string;
  height?: string;
  frameBorder?: string;
};

class SteloEmbedManager {
  counter = 0;
  apikey = "";
  embedURL = "";
  init(apiKey: string, embedURL = "https://app.stelolabs.com/embed") {
    if (!apiKey)
      throw new Error("first argument is required. please pass in an apikey.");
    this.apikey = apiKey;
    this.embedURL = embedURL;
  }
  embed(
    selector: string,
    data: SteloEmbedPayload,
    { className, width, height, frameBorder }: IframeOverrides = {
      width: "440px",
      height: "800px",
      frameBorder: "0",
    }
  ) {
    if (this.apikey === "")
      throw new Error(
        "apikey not set, please first call init() with an apikey."
      );
    if (this.embedURL === "" || !isValidUrl(this.embedURL))
      throw new Error(
        "embedURL is not set, please pass in a valid URL as the second argument to init()."
      );
    if (!selector)
      throw new Error(
        "first argument is required. please pass in a document selector."
      );
    if (!data)
      throw new Error(
        "second argument is required. please pass an object with both url and request fields."
      );
    if (!data.url) throw new Error("second argument requires a url field.");
    if (!data.request && !data.txnHash)
      throw new Error(
        "second argument requires either a request or txnHash field."
      );

    const element = document.querySelector(selector);
    if (!element)
      throw new Error(
        `query selector ${selector} did not match any elements in the DOM.`
      );
    this.counter++;
    const iframe = document.createElement("iframe");
    iframe.src =
      this.embedURL + "?apiKey=" + this.apikey + "&id=" + this.counter;

    if (className) iframe.className = className;
    if (width) iframe.width = width;
    if (height) iframe.height = height;
    if (frameBorder) iframe.frameBorder = frameBorder;

    element.appendChild(iframe);
    window.addEventListener(
      "message",
      iframeReadyListener(iframe, { id: this.counter, ...data }),
      false
    );
  }
}

const Stelo = new SteloEmbedManager();
export default Stelo;
