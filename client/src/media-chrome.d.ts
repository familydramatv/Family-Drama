import type { DetailedHTMLProps, HTMLAttributes } from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "media-controller": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "media-control-bar": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "media-play-button": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "media-time-range": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "media-mute-button": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "media-fullscreen-button": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
      "mux-video": DetailedHTMLProps<
        HTMLAttributes<HTMLElement> & {
          "playback-id"?: string;
          slot?: string;
          streamType?: string;
          preload?: string;
          muted?: boolean;
          autoPlay?: boolean;
          autoplay?: boolean;
          class?: string;
          controls?: boolean;
          loop?: boolean;
        },
        HTMLElement
      >;
    }
  }
}

export {};
