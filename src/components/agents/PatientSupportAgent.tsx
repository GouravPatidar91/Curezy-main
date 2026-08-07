import React, { useState } from 'react';
import { Headphones, Zap, ShieldAlert, CheckCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const SUPPORT_TICKETS = [
  {
    id: "sup-1",
    patientName: "Anil Kumar",
    category: "Prescription Query",
    query: "Can I take Paracetamol after food?",
    aiResponse: "Yes, take 1 tablet after meals twice daily as prescribed by Dr. Pradeep.",
    status: "Auto-Resolved",
    time: "3 mins ago"
  },
  {
    id: "sup-2",
    patientName: "Pooja Hegde",
    category: "Clinic Location / Timing",
    query: "Is Dr. Sarah available at Vijay Nagar clinic on Saturday?",
    aiResponse: "Yes, Saturday timings are 10:00 AM to 2:00 PM.",
    status: "Auto-Resolved",
    time: "18 mins ago"
  },
  {
    id: "sup-3",
    patientName: "Sanjay Gupta",
    category: "Emergency Triage",
    query: "Experiencing sudden chest tightness and shortness of breath.",
    aiResponse: "HIGH RISK FLAG: Advised emergency room visit + routed to doctor immediately.",
    status: "Critical Escalation",
    time: "Just now"
  }
];

const PatientSupportAgent: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Headphones className="w-3.5 h-3.5" />
              <span>Patient Support Agent 24/7</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Zero Wait Time FAQs & Automated Triage</h2>
            <p className="text-rose-100 text-xs md:text-sm mt-1 max-w-xl">
              Instant multi-lingual AI support for prescription doubts, clinic directions, appointment changes, and high-urgency symptom triage.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-3xl font-black">1.8s</div>
            <div className="text-xs text-rose-100 font-medium">Avg Resolution Time</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-rose-200 bg-rose-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-rose-700">Total Queries Solved Today</p>
            <p className="text-2xl font-bold text-slate-900">328 Queries</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-emerald-700">Auto-Resolved Rate</p>
            <p className="text-2xl font-bold text-slate-900">98.4%</p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-amber-700">Escalated Triage Flags</p>
            <p className="text-2xl font-bold text-slate-900">2 Flags</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">24/7 Patient Support & Triage Stream</CardTitle>
          <CardDescription>Live feed of automated AI resolutions and symptom safety flags</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {SUPPORT_TICKETS.map((t) => (
            <div key={t.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{t.patientName}</h4>
                  <Badge variant="outline" className="text-[10px] bg-white">{t.category}</Badge>
                </div>
                <Badge className={t.status === "Critical Escalation" ? "bg-rose-500 text-white animate-pulse" : "bg-emerald-500/10 text-emerald-700 border-emerald-200 text-[10px]"}>
                  {t.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-700"><b>Q:</b> "{t.query}"</p>
              <p className="text-xs text-emerald-800 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200">
                🤖 <b>AI Agent:</b> {t.aiResponse}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientSupportAgent;
