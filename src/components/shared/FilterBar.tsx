// src/components/shared/FilterBar.tsx
interface Option { label: string; value: string; }
interface Props {
  filters: { label: string; value: string; options: Option[]; onChange: (v: string) => void }[];
}


export function FilterBar({ filters }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((f) => (
        <select
          key={f.label}
          value={f.value}
          onChange={(e) => f.onChange(e.target.value)}
          className="rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          {f.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
    </div>
  );
}