import { ReactNode } from "react";
import { ProgressType } from "../progressBar/types";

export interface PageHeaderProps {
  title: string;
  steper: ProgressType;
  children?: ReactNode;
}
