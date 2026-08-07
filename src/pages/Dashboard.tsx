import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Calendar, 
  Users, 
  Phone as PhoneIcon, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  Bot, 
  Clock, 
  PhoneCall, 
  FileText, 
  BarChart3, 
  CheckCircle2, 
  ShieldCheck, 
  Activity 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserAppointments, useUserProfile } from "@/services/userDataService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AIAgentSuite, { AgentTabType } from "@/components/agents/AIAgentSuite";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { appointments, loading: appointmentsLoading } = useUserAppointments();
  const { profile } = useUserProfile();
  const [selectedAgentTab, setSelectedAgentTab] = useState<AgentTabType>("overview");

  const userName = profile?.first_name || 
                   user?.user_metadata?.name || 
                   user?.email?.split('@')[0] || 
                   "User";

  const userInitials = profile?.first_name && profile?.last_name 
    ? `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    : userName[0]?.toUpperCase() || 'U';

  const appointmentCount = appointments ? appointments.length : 24;

  return (
    <div className="space-y-8">
      {/* Executive AI Platform Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-white/40 shadow-xl ring-4 ring-white/10">
              <AvatarImage src={profile?.avatar_url || ""} alt="Profile" />
              <AvatarFallback className="bg-white/20 text-white text-xl font-bold backdrop-blur-md">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-cyan-300 animate-pulse" />
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  Welcome back, {userName}
                </h1>
              </div>
              <p className="text-blue-100 text-xs md:text-sm font-medium max-w-xl">
                Curezy AI Healthcare Platform — 8 Autonomous AI Agents Operational
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <Button 
              onClick={() => setSelectedAgentTab('appointment')}
              className="bg-white text-blue-900 hover:bg-slate-100 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg"
            >
              <Plus className="h-4 w-4 text-blue-700" />
              Book Appointment
            </Button>
            <Button 
              onClick={() => navigate('/emergency')}
              className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-lg"
            >
              <PhoneIcon className="h-4 w-4" />
              Emergency SOS
            </Button>
          </div>
        </div>
      </div>

      {/* 4 Operational Healthcare & AI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Doctor Appointments</span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mt-3">{appointmentCount}</p>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span className="text-emerald-600 font-medium">18 Confirmed Today</span>
              <span>4 Pending</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 2 */}
        <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">AI Call Telemetry</span>
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <PhoneCall className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mt-3">1,240 Mins</p>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span className="text-purple-600 font-medium">1m 45s Avg Call</span>
              <span>100% Transcribed</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 3 */}
        <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Leads & Inquiries</span>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mt-3">182 Leads</p>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span className="text-blue-600 font-medium">78% Qualified Rate</span>
              <span>WhatsApp & Voice</span>
            </div>
          </CardContent>
        </Card>

        {/* Metric 4 */}
        <Card className="bg-white border-slate-200/90 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Autonomous AI Agents</span>
              <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-600">
                <Bot className="w-5 h-5" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 mt-3">8 / 8 Active</p>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
              <span className="text-cyan-600 font-medium">100% Operational</span>
              <span>Real-time Synced</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Control Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 whitespace-nowrap pr-2">
            <Activity className="w-4 h-4 text-cyan-600" />
            <span>Quick Agent Shortcuts:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAgentTab('appointment')}
              className="gap-2 rounded-xl text-xs border-slate-200 hover:bg-emerald-50 text-emerald-700 whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment & View Schedule</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAgentTab('appointment')}
              className="gap-2 rounded-xl text-xs border-slate-200 hover:bg-purple-50 text-purple-700 whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Call Transcriptions & Audio Recordings</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAgentTab('outbound')}
              className="gap-2 rounded-xl text-xs border-slate-200 hover:bg-blue-50 text-blue-700 whitespace-nowrap"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Outbound Patient Outreach</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAgentTab('analytics')}
              className="gap-2 rounded-xl text-xs border-slate-200 hover:bg-indigo-50 text-indigo-700 whitespace-nowrap"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Revenue Attribution Analytics</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Eight Autonomous AI Agents Platform Workspace */}
      <div className="pt-2">
        <AIAgentSuite defaultTab={selectedAgentTab} />
      </div>
    </div>
  );
};

export default Dashboard;
