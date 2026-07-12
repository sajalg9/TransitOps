// src/components/fuel-expenses/ExpenseForm.tsx
import { useState } from "react";
import { useTrips } from "@/hooks/useTrips";
import { useCreateExpense } from "@/hooks/useExpenses";
import { Receipt } from "lucide-react";

export function ExpenseForm({ onDone }: { onDone: () => void }) {
  const { data: trips = [] } = useTrips();
  const createMutation = useCreateExpense();
  const [tripId, setTripId] = useState("");
  const [date, setDate] = useState("");
  const [toll, setToll] = useState("");
  const [misc, setMisc] = useState("");
  const [agent, setAgent] = useState("");

  async function handleSubmit() {
    if (!date) return;
    const trip = trips.find((t) => t.id === tripId);
    await createMutation.mutateAsync({
      trip_id: tripId || null, vehicle_id: trip?.vehicle_id ?? null,
      toll: Number(toll) || 0, misc: Number(misc) || 0, agent_expense: Number(agent) || 0, date,
    });
    onDone();
  }

  return (
    <div className="space-y-3 border border-border rounded-lg p-4">
      <h4 className="font-medium flex items-center gap-2"><Receipt size={16} /> Add Expense</h4>
      <select value={tripId} onChange={(e) => setTripId(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
        <option value="">Select trip (optional)</option>
        {trips.map((t) => <option key={t.id} value={t.id}>{t.trip_code} — {t.source} → {t.destination}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input type="number" placeholder="Toll" value={toll} onChange={(e) => setToll(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input type="number" placeholder="Misc" value={misc} onChange={(e) => setMisc(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
        <input type="number" placeholder="Agent Exp." value={agent} onChange={(e) => setAgent(e.target.value)} className="rounded-md border border-input bg-background px-3 py-2 text-sm" />
      </div>
      <button onClick={handleSubmit} className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium hover:opacity-90">
        Save Expense
      </button>
    </div>
  );
}