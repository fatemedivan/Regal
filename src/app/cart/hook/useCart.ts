"use client";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const useCartActions = (
  onUpdate: (itemId: string, newQuantity: number) => Promise<boolean>,
  onDelete: (itemId: string) => Promise<boolean>
) => {
  const [loading, setLoading] = useState({
    increase: false,
    decrease: false,
    delete: false,
  });

  const handleIncrease = useCallback(
    async (item) => {
      try {
        setLoading((prev) => ({ ...prev, increase: true }));
        await onUpdate(item.id, item.quantity + 1);
      } catch {
        toast.error("خطایی در افزایش تعداد رخ داد.");
      } finally {
        setLoading((prev) => ({ ...prev, increase: false }));
      }
    },
    [onUpdate]
  );

  const handleDecrease = useCallback(
    async (item) => {
      try {
        setLoading((prev) => ({ ...prev, decrease: true }));
        if (item.quantity === 1) await onDelete(item.id);
        else await onUpdate(item.id, item.quantity - 1);
      } catch {
        toast.error("خطایی در کاهش تعداد رخ داد.");
      } finally {
        setLoading((prev) => ({ ...prev, decrease: false }));
      }
    },
    [onDelete, onUpdate]
  );

  const handleDelete = useCallback(
    async (item) => {
      try {
        setLoading((prev) => ({ ...prev, delete: true }));
        await onDelete(item.id);
      } catch {
        toast.error("خطایی در حذف محصول رخ داد.");
      } finally {
        setLoading((prev) => ({ ...prev, delete: false }));
      }
    },
    [onDelete]
  );

  return { handleIncrease, handleDecrease, handleDelete, loading };
};
