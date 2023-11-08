import type { ReactNode } from "react";
import "./row.css";

type RowProps = {
  children: ReactNode;
};

export function Row({ children }: RowProps) {
  return <div className="row">{children}</div>;
}
