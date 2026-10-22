"use client";
import { Button } from "@/components/ui/button";
export function PrintButton({ label, icon }: { label: string; icon?: React.ReactNode }) {
  return <Button variant="outline" size="sm" onClick={() => window.print()}>{icon}{label}</Button>;
}
