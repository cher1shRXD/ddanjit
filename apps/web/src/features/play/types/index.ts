export type ComponentProps = Record<
  string,
  number | number[] | string | string[] | boolean | undefined
>;

export type InputValue = number | number[] | string | string[] | boolean | undefined;

export interface StepComponent  {
  name: string;
  props: ComponentProps;
};

export interface ContentData {
  data: StepComponent[][];
  context: {
    endTitle: string;
    endSubTitle: string;
  };
};
