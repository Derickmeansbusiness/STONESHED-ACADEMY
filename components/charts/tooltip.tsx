"use client";

type Fmt = (value: number, key: string) => string;

/** Shared custom tooltip renderer for Recharts, typed loosely to survive library upgrades. */
export function makeTooltip(opts: { format: Fmt; labelFormat?: (label: string | number) => string; names?: Record<string, string> }) {
  type P = { active?: boolean; payload?: ReadonlyArray<{ dataKey?: unknown; name?: unknown; value?: unknown; color?: string }>; label?: unknown };
  function ChartTooltip(props: P) {
    const { active, payload, label } = props;
    if (!active || !payload || !payload.length) return null;
    return (
      <div className="rounded-xl border border-mist bg-white px-3 py-2 text-xs shadow-[var(--shadow-soft)]">
        {label !== undefined && <p className="mb-1 font-semibold text-ink">{opts.labelFormat ? opts.labelFormat(label as string | number) : String(label)}</p>}
        {payload.map((p, i) => {
          const key = String(p.dataKey ?? p.name ?? i);
          return (
            <p key={key + i} className="flex items-center gap-2 text-slate">
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: (p.color as string) ?? "#1265C8" }} />
              <span>{opts.names?.[key] ?? key}</span>
              <span className="num ml-auto pl-3 font-semibold text-ink">{opts.format(Number(p.value ?? 0), key)}</span>
            </p>
          );
        })}
      </div>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return ChartTooltip as any;
}
