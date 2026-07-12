import { Download } from "lucide-react";
import { useCsvExport } from "@/hooks/useCsvExport";

interface Props {
  filename: string;
  rows: Record<string, any>[];
}

export function CsvExportButton({ filename, rows }: Props) {
  const { exportCsv } = useCsvExport();
  return (
    <button
      onClick={() => exportCsv(filename, rows)}
      className="flex items-center gap-2 bg-secondary px-4 py-2 rounded-md font-medium hover:opacity-90 text-sm"
    >
      <Download size={16} /> Export CSV
    </button>
  );
}