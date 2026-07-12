// src/hooks/useExpenses.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchExpenses, createExpense } from "@/services/fuelExpenseService";

export function useExpenses() {
  return useQuery({ queryKey: ["expenses"], queryFn: fetchExpenses });
}

export function useCreateExpense() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: createExpense, onSuccess: () => qc.invalidateQueries({ queryKey: ["expenses"] }) });
}