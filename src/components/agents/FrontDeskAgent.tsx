import React, { useState } from 'react';
import { UserCheck, GitBranch, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const FRONT_DESK_QUEUE = [
  {
    id: "fd-1",
    patientName: "Manoj Tripathi",
    symptoms: "Chest Discomfort & Breathlessness",
    routedDoctor: "Dr. Sarah Johnson (Cardiology)",
    priority: "High Priority",
    token: "A-12",
    status: "In Clinic Queue"
  },
  {
    id: "fd-2",
    patientName: "Swati Jain",
    symptoms: "Seasonal Allergies & Mild Fever",
    routedDoctor: "Dr. Pradeep Patidar (General Physician)",
    priority: "Normal",
    token: "A-13",
    status: "Checked In"
  },
  {
    id: "fd-3",
    patientName: "Rajesh Kulkarni",
    symptoms: "Back Pain & Joint Stiffness",
    routedDoctor: "Dr. Ananya Roy (Orthopedic)",
    priority: "Normal",
    token: "A-14",
    status: "Token Issued"
  }
];

const FrontDeskAgent: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Front Desk Agent Operational</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Registration, Triage & Intelligent Routing</h2>
            <p className="text-sky-100 text-xs md:text-sm mt-1 max-w-xl">
              Automates patient registration, generates digital queue tokens, and intelligently routes walk-ins to the right specialist doctor based on symptoms.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-3xl font-black">38 / hr</div>
            <div className="text-xs text-sky-100 font-medium">Patient Intake Capacity</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-sky-200 bg-sky-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-sky-700">Digital Registrations Today</p>
            <p className="text-2xl font-bold text-slate-900">184 Patients</p>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-blue-700">Specialty Auto-Routings</p>
            <p className="text-2xl font-bold text-slate-900">100% Accuracy</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-emerald-700">Avg Front Desk Wait Time</p>
            <p className="text-2xl font-bold text-slate-900">3.2 Minutes</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Front Desk Live Intake & Routing Queue</CardTitle>
          <CardDescription>Automated specialty routing and digital queue tokens</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {FRONT_DESK_QUEUE.map((q) => (
            <div key={q.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/70 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge className="bg-sky-600 text-white font-mono text-xs">{q.token}</Badge>
                  <h4 className="font-bold text-slate-900">{q.patientName}</h4>
                  <Badge className={q.priority === "High Priority" ? "bg-rose-500 text-white" : "bg-slate-200 text-slate-700"}>
                    {q.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">Symptoms: <b>{q.symptoms}</b></p>
                <p className="text-xs text-sky-700 font-medium">Routed To: <b>{q.routedDoctor}</b></p>
              </div>

              <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-xs px-3 py-1 self-start md:self-center">
                {q.status}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default FrontDeskAgent;
