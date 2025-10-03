import Loading from "@/app/loading";
import dynamic from "next/dynamic";


export const dynamicWithLoading = (importFunc) =>
  dynamic(importFunc, { loading: () => <Loading /> });
