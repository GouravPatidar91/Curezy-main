import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  PhoneIncoming, 
  PhoneOutgoing, 
  CalendarCheck, 
  Clock, 
  Headphones, 
  UserCheck, 
  Star, 
  BarChart3, 
  Sparkles, 
  Activity,
  Layers,
  Search,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import InboundSalesAgent from './InboundSalesAgent';
import OutboundSalesAgent from './OutboundSalesAgent';
import AppointmentAgent from './AppointmentAgent';
import PatientFollowupAgent from './PatientFollowupAgent';
import PatientSupportAgent from './PatientSupportAgent';
import FrontDeskAgent from './FrontDeskAgent';
import ReviewAgent from './ReviewAgent';
import AnalyticsAgent from './AnalyticsAgent';

export type AgentTabType = 
  | 'overview' 
  | 'inbound' 
  | 'outbound' 
  | 'appointment' 
  | 'followup' 
  | 'support' 
  | 'frontdesk' 
  | 'review' 
  | 'analytics';

interface AIAgentSuiteProps {
  defaultTab?: AgentTabType;
  doctorId?: string;
}

export const AGENT_CONFIGS = [
  {
    id: 'inbound' as AgentTabType,
    name: 'Inbound Sales Agent',
    tagline: 'Qualifies & converts inquiries instantly via WhatsApp & voice',
    icon: PhoneIncoming,
    color: 'from-blue-500 to-cyan-500',
    badgeColor: 'bg-blue-500/10 text-blue-600 border-blue-200',
    metrics: { count: '142 Today', status: 'Active' }
  },
  {
    id: 'outbound' as AgentTabType,
    name: 'Outbound Sales Agent',
    tagline: 'Reactivates dormant patients with personalised outreach',
    icon: PhoneOutgoing,
    color: 'from-purple-500 to-indigo-500',
    badgeColor: 'bg-purple-500/10 text-purple-600 border-purple-200',
    metrics: { count: '89 Re-engaged', status: 'Running' }
  },
  {
    id: 'appointment' as AgentTabType,
    name: 'Appointment Agent',
    tagline: 'End-to-end booking, reminders & schedule management',
    icon: CalendarCheck,
    color: 'from-emerald-500 to-teal-500',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
    metrics: { count: '24 Bookings', status: 'Synced' }
  },
  {
    id: 'followup' as AgentTabType,
    name: 'Patient Follow-up Agent',
    tagline: 'Automated check-ins & medicine adherence tracking',
    icon: Clock,
    color: 'from-amber-500 to-orange-500',
    badgeColor: 'bg-amber-500/10 text-amber-600 border-amber-200',
    metrics: { count: '94% Adherence', status: 'Active' }
  },
  {
    id: 'support' as AgentTabType,
    name: 'Patient Support Agent',
    tagline: '24/7 FAQs & triage — no wait times, no missed queries',
    icon: Headphones,
    color: 'from-rose-500 to-pink-500',
    badgeColor: 'bg-rose-500/10 text-rose-600 border-rose-200',
    metrics: { count: '< 2s Response', status: '24/7 Live' }
  },
  {
    id: 'frontdesk' as AgentTabType,
    name: 'Front Desk Agent',
    tagline: 'Registration, triage & intelligent patient routing',
    icon: UserCheck,
    color: 'from-sky-500 to-blue-600',
    badgeColor: 'bg-sky-500/10 text-sky-600 border-sky-200',
    metrics: { count: '38 Routing/hr', status: 'Online' }
  },
  {
    id: 'review' as AgentTabType,
    name: 'Review Agent',
    tagline: 'Automates feedback collection & scales online reputation',
    icon: Star,
    color: 'from-yellow-500 to-amber-500',
    badgeColor: 'bg-yellow-500/10 text-yellow-700 border-yellow-200',
    metrics: { count: '4.9 ⭐ (128 Reviews)', status: 'Auto' }
  },
  {
    id: 'analytics' as AgentTabType,
    name: 'Analytics Agent',
    tagline: 'Real-time revenue, retention & engagement insights',
    icon: BarChart3,
    color: 'from-indigo-500 to-blue-600',
    badgeColor: 'bg-indigo-500/10 text-indigo-600 border-indigo-200',
    metrics: { count: '+34% Growth', status: 'Live Data' }
  }
];

const AIAgentSuite: React.FC<AIAgentSuiteProps> = ({ defaultTab = 'overview', doctorId }) => {
  const [activeTab, setActiveTab] = useState<AgentTabType>(defaultTab);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 md:p-8 text-white shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Eight Autonomous AI Agents Platform</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              Curezy Autonomous AI Agent Suite
            </h1>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl">
              One platform powering inbound sales, patient scheduling, call transcriptions, post-visit follow-ups, 24/7 triage, and real-time revenue analytics.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-800/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700/60">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </div>
              <span className="text-xs font-semibold text-slate-200">8/8 Agents Operational</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher Grid */}
        <div className="mt-8 pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'overview'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/25'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Overview</span>
            </button>

            {AGENT_CONFIGS.map((agent) => {
              const Icon = agent.icon;
              const isSelected = activeTab === agent.id;
              return (
                <button
                  key={agent.id}
                  onClick={() => setActiveTab(agent.id)}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-gradient-to-r ' + agent.color + ' text-white font-semibold shadow-lg'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{agent.name.replace(' Agent', '')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Agent Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {AGENT_CONFIGS.map((agent, i) => {
                  const Icon = agent.icon;
                  return (
                    <Card 
                      key={agent.id}
                      onClick={() => setActiveTab(agent.id)}
                      className="group cursor-pointer hover:shadow-xl transition-all duration-300 border-slate-200/80 hover:border-cyan-400/60 bg-white relative overflow-hidden"
                    >
                      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${agent.color}`} />
                      <CardHeader className="p-5 pb-3">
                        <div className="flex items-center justify-between">
                          <div className={`p-2.5 rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-md group-hover:scale-105 transition-transform`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <Badge variant="outline" className={`${agent.badgeColor} font-mono text-[11px]`}>
                            {agent.metrics.status}
                          </Badge>
                        </div>
                        <CardTitle className="text-base font-bold mt-3 text-slate-900 group-hover:text-cyan-600 transition-colors">
                          {agent.name}
                        </CardTitle>
                        <CardDescription className="text-xs text-slate-500 line-clamp-2 mt-1">
                          {agent.tagline}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="px-5 pb-4 pt-0">
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-600">
                          <span className="font-medium text-slate-700">{agent.metrics.count}</span>
                          <span className="text-cyan-600 font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                            Launch &rarr;
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Directly Render Appointment & Call Recordings Agent inside Overview for quick access */}
              <div className="mt-8">
                <AppointmentAgent doctorId={doctorId} />
              </div>
            </div>
          )}

          {activeTab === 'inbound' && <InboundSalesAgent />}
          {activeTab === 'outbound' && <OutboundSalesAgent />}
          {activeTab === 'appointment' && <AppointmentAgent doctorId={doctorId} />}
          {activeTab === 'followup' && <PatientFollowupAgent />}
          {activeTab === 'support' && <PatientSupportAgent />}
          {activeTab === 'frontdesk' && <FrontDeskAgent />}
          {activeTab === 'review' && <ReviewAgent />}
          {activeTab === 'analytics' && <AnalyticsAgent />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AIAgentSuite;
