import Loading from "@/app/loading";
import dynamic from "next/dynamic";
import { ComponentType } from "react";

export const dynamicWithLoading = <T extends ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>
) => dynamic(importFunc, { loading: () => <Loading/> });
