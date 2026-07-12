// src/pages/fuel-expenses/FuelExpenses.tsx
import { useState } from "react";
import { useFuelLogs } from "@/hooks/useFuelLogs";
import { useExpenses } from "@/hooks/useExpenses";
import { FuelLogForm } from "@/components/fuel-expenses/FuelLogForm";
import { ExpenseForm } from "@/components/fuel-expenses/ExpenseForm";
import { FuelLogTable } from "@/components/fuel-expenses/FuelLogTable";
import { ExpenseTable } from "@/components/fuel-expenses/ExpenseTable";
import { formatCurrency } from "@/lib/formatters";
import { Fuel, Receipt } from "lucide-react";

export default function FuelExpenses() {
  const { data: fuelLogs = [] } = useFuelLogs();
  const { data: expenses = [] } = useExpenses();
  const [showFuelForm, setShowFuelForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const totalFuelCost = fuelLogs.reduce((s, l) => s + l.cost, 0);
  const totalExpenseCost = expenses.reduce((s, e) => s + e.toll + e.misc + e.agent_expense, 0);
  const totalOpCost = totalFuelCost + totalExpenseCost;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Fuel & Expense Management</h1>
        <div className="flex gap-2">
          <button onClick={() => setShowFuelForm((s) => !s)} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 text-sm">
            <Fuel size={16} /> Log Fuel
          </button>
          <button onClick={() => setShowExpenseForm((s) => !s)} className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-md font-medium hover:opacity-90 text-sm">
            <Receipt size={16} /> Add Expense
          </button>
        </div>
      </div>

      {showFuelForm && <FuelLogForm onDone={() => setShowFuelForm(false)} />}
      {showExpenseForm && <ExpenseForm onDone={() => setShowExpenseForm(false)} />}

      <div>
        <h3 className="font-semibold mb-2">Fuel Logs</h3>
        <FuelLogTable logs={fuelLogs} />
      </div>
      <div>
        <h3 className="font-semibold mb-2">Other Expenses (Toll / Misc)</h3>
        <ExpenseTable expenses={expenses} />
      </div>

      <div className="border-t border-border pt-4 flex justify-between items-center">
        <span className="font-medium">Total Operational Cost (Auto = Fuel + Maint.)</span>
        <span className="text-lg font-bold text-primary">{formatCurrency(totalOpCost)}</span>
      </div>
    </div>
  );
}