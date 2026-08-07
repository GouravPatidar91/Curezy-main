import React, { useState } from 'react';
import { PhoneIncoming, MessageSquare, Flame, CheckCircle, ArrowRight, UserPlus, Sparkles, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const INBOUND_LEADS = [
  {
    id: "lead-1",
    name: "Vikram Malhotra",
    phone: "+91 98930 11223",
    source: "WhatsApp Inquiry",
    intent: "High Intent (Wants OPD Consult)",
    channel: "WhatsApp & Voice",
    status: "Qualified",
    summary: "Inquired about Dr. Pradeep Patidar consultation fee & Sunday availability.",
    time: "12 mins ago",
    score: 92
  },
  {
    id: "lead-2",
    name: "Suman Joshi",
    phone: "+91 97550 44332",
    source: "Voice Agent Call",
    intent: "Medium Intent (Price Inquiry)",
    channel: "AI Voice Agent",
    status: "New Lead",
    summary: "Asked about cardiology health checkup packages.",
    time: "45 mins ago",
    score: 74
  },
  {
    id: "lead-3",
    name: "Deepak Mehta",
    phone: "+91 91112 33445",
    source: "Website Chat Widget",
    intent: "High Intent (Urgent Headache)",
    channel: "WhatsApp Bot",
    status: "Converted",
    summary: "Converted to appointment for Today 5:00 PM.",
    time: "2 hours ago",
    score: 98
  }
];

const InboundSalesAgent: React.FC = () => {
  const { toast } = useToast();
  const [leads, setLeads] = useState(INBOUND_LEADS);

  const handleConvertLead = (leadId: string, leadName: string) => {
    setLeads(leads.map(l => l.id === leadId ? { ...l, status: "Converted" } : l));
    toast({
      title: "🚀 Lead Converted to Booking!",
      description: `${leadName} has been converted and sent appointment link via WhatsApp.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <PhoneIncoming className="w-3.5 h-3.5" />
              <span>Inbound Sales Agent Active</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Qualify & Convert Inquiries Instantly</h2>
            <p className="text-blue-100 text-xs md:text-sm mt-1 max-w-xl">
              AI Voice & WhatsApp Agent captures incoming inquiries, scores patient intent, and automatically converts callers into confirmed appointments.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-3xl font-black">78%</div>
            <div className="text-xs text-blue-100 font-medium">Inquiry Conversion Rate</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50/50 border-blue-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-blue-700">Total Inbound Calls Today</p>
              <p className="text-2xl font-bold text-slate-900">142</p>
            </div>
            <PhoneIncoming className="w-8 h-8 text-blue-500" />
          </CardContent>
        </Card>

        <Card className="bg-emerald-50/50 border-emerald-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700">Converted Bookings</p>
              <p className="text-2xl font-bold text-slate-900">111</p>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500" />
          </CardContent>
        </Card>

        <Card className="bg-purple-50/50 border-purple-200">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-purple-700">Avg Qualified Score</p>
              <p className="text-2xl font-bold text-slate-900">88/100</p>
            </div>
            <Flame className="w-8 h-8 text-purple-500" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Live Inbound Leads & Inquiry Stream</CardTitle>
          <CardDescription>Qualify leads coming from Voice Callers & WhatsApp messages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/70 gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{lead.name}</h4>
                  <Badge variant="outline" className="text-[10px] bg-white">{lead.phone}</Badge>
                  <Badge className={lead.status === "Converted" ? "bg-emerald-500/10 text-emerald-700 border-emerald-200" : "bg-blue-500/10 text-blue-700 border-blue-200"}>
                    {lead.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-600">💡 {lead.summary}</p>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                  <span>Source: <b>{lead.source}</b></span>
                  <span>&bull;</span>
                  <span>Score: <b className="text-cyan-700">{lead.score}/100</b></span>
                  <span>&bull;</span>
                  <span>{lead.time}</span>
                </div>
              </div>

              {lead.status !== "Converted" && (
                <Button 
                  onClick={() => handleConvertLead(lead.id, lead.name)}
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs gap-1.5 self-start md:self-center"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Convert to Booking</span>
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default InboundSalesAgent;
