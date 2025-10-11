import Image from "next/image";
import { useRouter } from "next/navigation";
import ProgressBar from "./ProgressBar";

export default function PageHeader({ title, steper,children }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-between items-center mb-8 lg:hidden">
        <Image
          width={24}
          height={24}
          className="cursor-pointer"
          src="/img/arrow-right-6.svg"
          alt=""
          onClick={() => router.back()}
        />
        <p className="font-semibold text-xl leading-6 text-neutral-gray-13">
         {title}
        </p>
       
        <div>{children}</div>
      </div>
      <div className="xl:px-40.5">
        <ProgressBar progress={steper} />
      </div>
    </div>
  );
}
