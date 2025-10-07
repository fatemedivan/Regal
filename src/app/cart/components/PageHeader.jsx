import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PageHeader({ deleteBasket}) {
      const router = useRouter();
  return (
    <div className="mt-6 flex justify-between items-center lg:hidden">
      <Image
        width={24}
        height={24}
        className="cursor-pointer"
        src="/img/arrow-right-6.svg"
        alt="Back"
        onClick={() => router.back()}
      />
      <h3 className="text-xl font-semibold leading-6 text-neutral-gray-13">
        سبد خرید
      </h3>
      <Image
        width={24}
        height={24}
        className="cursor-pointer"
        src="/img/trash-2.svg"
        alt="Clear Cart"
        onClick={deleteBasket}
      />
    </div>
  );
}
