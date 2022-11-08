export type RPCRequest = {
  method: string;
  params?: Array<any>;
};
export type SteloEmbedPayload = {
  url: string | undefined;
  request?: RPCRequest | undefined;
  txnHash?: string | undefined;
};

export type SteloEmbedContextProps = {
  apiKey: string;
  embedUrl: string;
};

export type SteloEmbedComponentProps = {
  data: SteloEmbedPayload;
} & Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, "src">;
