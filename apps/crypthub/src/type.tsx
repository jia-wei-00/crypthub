import { Dispatch, SetStateAction } from "react";

export type SectionT = {
  title?: string;
  subtitle?: string;
  desc?: string;
  link_btn?: {
    title: string;
    link: string;
  };
  type?: string;
  scrol_text: {
    main: string;
    sub: string;
  };
};

export type ModalStateT = {
  crypthub_trader_modal: boolean;
  p2p_trader_modal: boolean;
};

export type ActionT = {
  type: string;
};

export type ModalPropsT = {
  modal: ModalStateT;
  dispatch: Dispatch<ActionT>;
};

export type ImageData = {
  image: string;
  details: string;
};

export type ImageDataSetT = {
  data: ImageData[];
};

export type BooleanStateT = {
  state: boolean;
  setState: Dispatch<SetStateAction<boolean>>;
};
