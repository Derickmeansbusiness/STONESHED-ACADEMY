"use client";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useLocale } from "@/lib/i18n/client";
import { makeTooltip } from "@/components/charts/tooltip";

const COLORS = ["#0B2F73", "#1265C8", "#58B8F5", "#E0A526", "#1F9D6A", "#24334A", "#C9403B"];

export function OverviewCharts({ weeks, popular, localePref, audiences }: { weeks: { week: string; registrations: number; lessons: number; videos: number }[]; popular: { title: string; n: number }[]; localePref: { name: string; value: number }[]; audiences: { name: string; value: number }[] }) {
  const { locale } = useLocale();
  const fr = locale === "fr";
  const Tip = makeTooltip({ format: (v) => String(v) });
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-mist/70 bg-white p-5 lg:col-span-2">
        <p className="eyebrow mb-3">{fr ? "Activité hebdomadaire (12 semaines)" : "Weekly activity (12 weeks)"}</p>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={weeks}><CartesianGrid stroke="#e8eef7" vertical={false} /><XAxis dataKey="week" tick={{ fontSize: 11, fill: "#5b6b84" }} tickLine={false} axisLine={false} /><YAxis tick={{ fontSize: 11, fill: "#5b6b84" }} tickLine={false} axisLine={false} width={36} /><Tooltip content={Tip} /><Legend />
            <Area type="monotone" dataKey="lessons" name={fr ? "Leçons terminées" : "Lessons completed"} stroke="#1265C8" fill="#1265C8" fillOpacity={0.15} isAnimationActive={false} />
            <Area type="monotone" dataKey="videos" name={fr ? "Vidéos terminées" : "Videos completed"} stroke="#58B8F5" fill="#58B8F5" fillOpacity={0.2} isAnimationActive={false} />
            <Area type="monotone" dataKey="registrations" name={fr ? "Inscriptions" : "Registrations"} stroke="#E0A526" fill="#E0A526" fillOpacity={0.15} isAnimationActive={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="rounded-2xl border border-mist/70 bg-white p-5">
        <p className="eyebrow mb-3">{fr ? "Cours les plus suivis" : "Most enrolled courses"}</p>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={popular} layout="vertical" margin={{ left: 10 }}><XAxis type="number" hide /><YAxis type="category" dataKey="title" width={170} tick={{ fontSize: 10, fill: "#24334A" }} tickLine={false} axisLine={false} /><Tooltip content={Tip} /><Bar dataKey="n" fill="#0B2F73" radius={[0, 6, 6, 0]} isAnimationActive={false} /></BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="rounded-2xl border border-mist/70 bg-white p-5"><p className="eyebrow mb-3">{fr ? "Langue préférée" : "Language preference"}</p><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={localePref} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} isAnimationActive={false} label>{localePref.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip content={Tip} /></PieChart></ResponsiveContainer></div>
        <div className="rounded-2xl border border-mist/70 bg-white p-5"><p className="eyebrow mb-3">{fr ? "Profils d'apprenants" : "Learner profiles"}</p><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={audiences} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} isAnimationActive={false}>{audiences.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip content={Tip} /><Legend wrapperStyle={{ fontSize: 10 }} /></PieChart></ResponsiveContainer></div>
      </div>
    </div>
  );
}
