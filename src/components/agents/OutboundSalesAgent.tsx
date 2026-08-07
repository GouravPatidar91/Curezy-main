import React, { useState } from 'react';
import { PhoneOutgoing, Users, RefreshCw, Send, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const DORMANT_PATIENTS = [
  {
    id: "dorm-1",
    name: "Sunil Saxena",
    phone: "+91 94250 88776",
    lastVisit: "68 days ago",
    treatmentHistory: "Hypertension Review",
    recommendedAgent: "AI Voice Call Outreach",
    status: "Pending Outreach"
  },
  {
    id: "dorm-2",
    name: "Meena Aggarwal",
    phone: "+91 98270 55443",
    lastVisit: "92 days ago",
    treatmentHistory: "Diabetes HbA1c Followup",
    recommendedAgent: "WhatsApp Personalised Offer",
    status: "Sent"
  },
  {
    id: "dorm-3",
    name: "Karan Singh",
    phone: "+91 91118 77665",
    lastVisit: "120 days ago",
    treatmentHistory: "Annual Cardiac Checkup",
    recommendedAgent: "AI Voice Call Outreach",
    status: "Re-booked"
  }
];

const OutboundSalesAgent: React.FC = () => {
  const { toast } = useToast();
  const [patients, setPatients] = useState(DORMANT_PATIENTS);

  const triggerOutreach = (id: string, name: string) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: "Reactivated" } : p));
    toast({
      title: "📞 AI Outbound Call Triggered!",
      description: `AI Agent is placing personalized call to ${name} for consultation checkup.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <PhoneOutgoing className="w-3.5 h-3.5" />
              <span>Outbound Sales Agent</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Reactivate Dormant Patients at Scale</h2>
            <p className="text-purple-100 text-xs md:text-sm mt-1 max-w-xl">
              AI Voice Agent automatically identifies inactive patients, initiates personalized wellness check-ins, and fills empty calendar slots.
            </p>
          </div>
          <Button 
            onClick={() => toast({ title: "🚀 Campaign Launched!", description: "Triggered reactivation calls to 45 dormant patients." })}
            className="bg-white text-purple-900 hover:bg-slate-100 font-bold rounded-xl text-xs gap-2 shadow-lg"
          >
            <Send className="w-4 h-4 text-purple-700" />
            <span>Launch Campaign (89 Inactive)</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-200 bg-purple-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-purple-700">Dormant Patients Identified</p>
            <p className="text-2xl font-bold text-slate-900">248 Patients</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-emerald-700">Reactivated Bookings</p>
            <p className="text-2xl font-bold text-slate-900">89 Consults</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-indigo-700">Recovered Revenue</p>
            <p className="text-2xl font-bold text-slate-900">₹71,200</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Dormant Patient Outreach Queue</CardTitle>
          <CardDescription>Personalized re-engagement list for patients inactive over 60 days</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {patients.map((patient) => (
            <div key={patient.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/70 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{patient.name}</h4>
                  <Badge variant="outline" className="text-[10px] bg-white">{patient.phone}</Badge>
                  <Badge className="bg-purple-500/10 text-purple-700 border-purple-200 text-[10px]">
                    Last visit: {patient.lastVisit}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">History: <b>{patient.treatmentHistory}</b></p>
              </div>

              {patient.status === "Pending Outreach" ? (
                <Button 
                  onClick={() => triggerOutreach(patient.id, patient.name)}
                  className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs gap-1.5 self-start md:self-center"
                >
                  <PhoneOutgoing className="w-3.5 h-3.5" />
                  <span>Trigger AI Voice Call</span>
                </Button>
              ) : (
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-xs px-3 py-1">
                  {patient.status}
                </Badge>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default OutboundSalesAgent;
