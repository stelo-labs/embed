import { useSteloEmbed } from "./context";
import * as React from "react";
import { SteloEmbedComponentProps } from "../types";

export const SteloEmbedComponent = ({
  data,
  ...rest
}: SteloEmbedComponentProps) => {
  const { state, iframeRef, url, sendDataIfReady } = useSteloEmbed();

  React.useEffect(() => {
    if (state === "IFRAME_READY") {
      sendDataIfReady(data);
    }
  }, [state, data]);
  return (
    <iframe
      ref={iframeRef}
      frameBorder="0"
      width="440px"
      height="800px"
      src={url}
      {...rest}
    ></iframe>
  );
};
