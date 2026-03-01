import type { ComponentProps } from "react";
import { useSafeArea } from "./useSafeArea";

const Screen = (props: ComponentProps<"div">) => {
  const { top, bottom } = useSafeArea();

  return (
    <div
      {...props}
      style={{
        paddingTop: top,
        paddingBottom: bottom,
        width: "100%",
        height: "100%",
        paddingLeft: 16,
        paddingRight: 16,
      }}>
      {props.children}
    </div>
  );
};

export default Screen;
