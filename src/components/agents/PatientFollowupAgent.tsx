import React, { useState } from 'react';
import { Clock, CheckCircle2, Pill, AlertTriangle, ShieldCheck, HeartPulse } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const FOLLOWUP_SCHEDULE = [
  {
    id: "fol-1",
    patientName: "Gaurav Patidar",
    phone: "+91 91650 43258",
    doctor: "Dr. Pradeep Patidar",
    checkinDay: "Day 3 Post-Visit Check-in",
    adherence: "100% Medicine Adherence",
    symptomStatus: "Fever Subsided, Mild Cough",
    status: "Completed"
  },
  {
    id: "fol-2",
    patientName: "Neha Sharma",
    phone: "+91 98260 99887",
    doctor: "Dr. Sarah Johnson",
    checkinDay: "Day 7 Post-Op Followup",
    adherence: "80% Adherence (Missed 1 dose)",
    symptomStatus: "Normal Recovery",
    status: "Scheduled (Today 4:00 PM)"
  },
  {
    id: "fol-3",
    patientName: "Rakesh Verma",
    phone: "+91 97555 12345",
    doctor: "Dr. Ananya Roy",
    checkinDay: "Day 1 Post-Treatment",
    adherence: "Pending Call Response",
    symptomStatus: "Requires Doctor Attention",
    status: "Flagged Escalation"
  }
];

const PatientFollowupAgent: React.FC = () => {
  const { toast } = useToast();
  const [followups, setFollowups] = useState(FOLLOWUP_SCHEDULE);

  const resolveEscalation = (id: string) => {
    setFollowups(followups.map(f => f.id === id ? { ...f, status: "Escalated to Doctor" } : f));
    toast({
      title: "✅ Escalation Notified to Doctor!",
      description: "Pushed patient recovery notes directly to doctor notification center.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Clock className="w-3.5 h-3.5" />
              <span>Patient Follow-up Agent</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Automated Check-ins & Medicine Adherence</h2>
            <p className="text-amber-100 text-xs md:text-sm mt-1 max-w-xl">
              Conducts automated Day 1, 3, and 7 post-consultation check-ins via AI Voice calls & WhatsApp to track recovery and pill compliance.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-3xl font-black">94.2%</div>
            <div className="text-xs text-amber-100 font-medium">Medicine Adherence Rate</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-amber-200 bg-amber-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-amber-700">Follow-ups Conducted</p>
            <p className="text-2xl font-bold text-slate-900">412 Check-ins</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-emerald-700">Full Pill Adherence</p>
            <p className="text-2xl font-bold text-slate-900">388 Patients</p>
          </CardContent>
        </Card>

        <Card className="border-rose-200 bg-rose-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-rose-700">Flagged Escalations</p>
            <p className="text-2xl font-bold text-slate-900">4 Alerts</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Post-Visit Patient Check-in Feed</CardTitle>
          <CardDescription>Real-time updates on patient symptom recovery and medicine dosage compliance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {followups.map((f) => (
            <div key={f.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/70 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{f.patientName}</h4>
                  <Badge variant="outline" className="text-[10px] bg-white">{f.phone}</Badge>
                  <Badge className="bg-amber-500/10 text-amber-700 border-amber-200 text-[10px]">{f.checkinDay}</Badge>
                </div>
                <p className="text-xs text-slate-600">Recovery Status: <b>{f.symptomStatus}</b> &bull; Doctor: <b>{f.doctor}</b></p>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                  <Pill className="w-3.5 h-3.5" />
                  <span>{f.adherence}</span>
                </div>
              </div>

              {f.status === "Flagged Escalation" ? (
                <Button 
                  onClick={() => resolveEscalation(f.id)}
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs gap-1.5 self-start md:self-center"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Notify Doctor Immediately</span>
                </Button>
              ) : (
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-xs px-3 py-1">
                  {f.status}
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientFollowupAgent;
