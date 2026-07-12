// src/components/settings/RbacTable.tsx
import { RBAC_MATRIX, RBAC_MODULES, RBAC_MODULE_LABELS, ROLE_LABELS, ROLES } from "@/lib/constants";
import { Check, Eye, Minus } from "lucide-react";

function AccessIcon({ level }: { level: "full" | "view" | "none" }) {
  if (level === "full") return <Check size={16} className="text-success" />;
  if (level === "view") return <Eye size={16} className="text-blue-400" />;
  return <Minus size={16} className="text-muted-foreground" />;
}

export function RbacTable() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-secondary/50 text-muted-foreground">
          <tr>
            <th className="text-left px-4 py-3 font-medium">Role</th>
            {RBAC_MODULES.map((m) => (
              <th key={m} className="text-left px-4 py-3 font-medium">{RBAC_MODULE_LABELS[m]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((role) => (
            <tr key={role} className="border-t border-border">
              <td className="px-4 py-3 font-medium">{ROLE_LABELS[role]}</td>
              {RBAC_MODULES.map((m) => (
                <td key={m} className="px-4 py-3"><AccessIcon level={RBAC_MATRIX[role][m]} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}   