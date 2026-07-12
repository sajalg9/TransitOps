// src/components/fuel-expenses/ExpenseTable.tsx
import { formatDate, formatCurrency } from "@/lib/formatters";
import type { Expense } from "@/types/database";

export function ExpenseTable({ expenses }: { expenses: Expense[] }) {
  if (expenses.length === 0) return <p className="text-sm text-muted-foreground py-6 text-center">No expenses yet.</p>;
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Vehicle</th>
            <th className="text-left px-4 py-3 font-medium">Toll</th>
            <th className="text-left px-4 py-3 font-medium">Misc</th>
            <th className="text-left px-4 py-3 font-medium">Agent Exp.</th>
            <th className="text-left px-4 py-3 font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{e.vehicle?.registration_no ?? "—"}</td>
              <td className="px-4 py-3">{formatCurrency(e.toll)}</td>
              <td className="px-4 py-3">{formatCurrency(e.misc)}</td>
              <td className="px-4 py-3">{formatCurrency(e.agent_expense)}</td>
              <td className="px-4 py-3 font-medium">{formatCurrency(e.toll + e.misc + e.agent_expense)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}