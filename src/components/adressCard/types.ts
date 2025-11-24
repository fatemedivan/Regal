export type AdressCardProps = {
  selectedAddressId: number;
  setSelectedAddressId: (id: number) => void;
  fullAddress: string;
  id: number;
  getAddresses: () => void | Promise<void>;
};
