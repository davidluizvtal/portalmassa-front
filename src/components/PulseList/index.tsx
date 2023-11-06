import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { VariantProps, tv } from "tailwind-variants";

const styles = tv({
  base: "bg-gray-500 p-2 rounded-md my-2 animate-pulse",
});

export interface PulseProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof styles> {
  items: Array<number>;
}
PulseComponent.defaultProps = {
  items: [1, 2, 3, 4, 5],
};
export function PulseComponent({ items, ...props }: PulseProps) {
  return (
    <div>
      {items.map((item) => (
        <div key={item} className={twMerge(styles(), props.className)}>
          {/* <div className="flex justify-between gap-x-6"></div> */}
        </div>
      ))}
    </div>
  );
}
