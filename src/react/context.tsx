import * as React from "react";
import { SteloEmbedContextProps, SteloEmbedPayload } from "../types";

const SteloContext = React.createContext<SteloEmbedContextProps | null>(null);

type SteloEmbedProviderProps = {
  apiKey: string;
  embedUrl?: string;
  children: React.ReactNode;
};

export const SteloEmbedProvider = ({
  apiKey,
  embedUrl = "https://app.stelolabs.com/embed",
  children,
}: SteloEmbedProviderProps) => {
  return (
    <SteloContext.Provider value={{ apiKey, embedUrl }}>
      {children}
    </SteloContext.Provider>
  );
};
const isBrowser = typeof window !== "undefined";

//define this outside of react land no re-renders occur when value changes
let counter = 0;
const STATES = ["DEFAULT", "WAITING_ON_IFRAME", "IFRAME_READY"] as const;
type State = typeof STATES[number];

const sendData = (
  iframeRef: React.RefObject<HTMLIFrameElement>,
  state: State,
  data: SteloEmbedPayload
) => {
  if (state !== "IFRAME_READY") throw new Error("Iframe is not ready");
  if (isBrowser) {
    iframeRef?.current?.contentWindow?.postMessage(
      { ...data, type: "stelo_request" },
      "*"
    );
  }
};

const iframeStateTrackingHandler =
  (setState: (state: State) => void) => (event: any) => {
    // TODO: check event.data.id == id
    if (event.data.type == "STELO_IFRAME_READY") {
      setState("IFRAME_READY");
    }
  };

export const useSteloEmbed = () => {
  const context = React.useContext(SteloContext);
  if (context == undefined) {
    throw new Error("useSteloEmbed must be used within a SteloEmbedProvider");
  }
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null);

  const [state, setState] = React.useState<State>("DEFAULT");
  const getUrl = React.useCallback(() => {
    counter++;
    return context.embedUrl + "?apiKey=" + context.apiKey + "&id=" + counter;
  }, [context.embedUrl, context.apiKey]);

  const url = React.useMemo(getUrl, []);

  React.useEffect(() => {
    isBrowser &&
      window.addEventListener(
        "message",
        iframeStateTrackingHandler(setState),
        false
      );
  }, []);
  const sendDataIfReady = (data: SteloEmbedPayload) =>
    sendData(iframeRef, state, data);

  return { iframeRef, url, state, sendDataIfReady };
};
