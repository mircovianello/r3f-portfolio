import React, { useRef, useState } from "react";
import { Skeleton } from "@chakra-ui/react";

export function Website() {
  const [isMounted, setIsMounted] = useState(false);
  const iframeRef = useRef(null);

  return (
    <Skeleton
      fitContent={true}
      borderRadius="5px"
      fadeDuration={1}
      isLoaded={isMounted}
    >
      <iframe
        ref={iframeRef}
        className="iframe"
        src="https://vscode-portfolio.vercel.app/"
        onLoad={() => setIsMounted(true)}
      />
    </Skeleton>
  );
}
