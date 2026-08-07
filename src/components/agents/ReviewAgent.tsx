import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, Send, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export const REVIEWS_STREAM = [
  {
    id: "rev-1",
    patientName: "Deepika Sharma",
    rating: 5,
    doctor: "Dr. Pradeep Patidar",
    feedback: "Doctor explained everything very clearly. Voice agent booked slot in 30 seconds!",
    action: "Google Review Invite Sent",
    status: "Posted on Google (5⭐)"
  },
  {
    id: "rev-2",
    patientName: "Tarun Gill",
    rating: 5,
    doctor: "Dr. Sarah Johnson",
    feedback: "Prompt service and smooth WhatsApp confirmation receipt.",
    action: "Google Review Invite Sent",
    status: "Posted on Google (5⭐)"
  },
  {
    id: "rev-3",
    patientName: "Nitin Bhasin",
    rating: 3,
    doctor: "Dr. Ananya Roy",
    feedback: "Wait time was slightly long at the clinic.",
    action: "Internal Review Logged",
    status: "Feedback Escalated to Clinic Manager"
  }
];

const ReviewAgent: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-3xl p-6 md:p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-md">
              <Star className="w-3.5 h-3.5 fill-current text-yellow-200" />
              <span>Review & Reputation Agent</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold mt-2">Automate Feedback & Scale Reputation</h2>
            <p className="text-yellow-100 text-xs md:text-sm mt-1 max-w-xl">
              Collects post-consultation NPS ratings via WhatsApp. Automatically routes 5-star patients to post Google Reviews while capturing internal feedback for quality assurance.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-center">
            <div className="text-3xl font-black">4.9 ⭐</div>
            <div className="text-xs text-yellow-100 font-medium">128 Google Reviews</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-200 bg-yellow-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-yellow-700">NPS Response Rate</p>
            <p className="text-2xl font-bold text-slate-900">82.5%</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-emerald-700">5-Star Conversion Rate</p>
            <p className="text-2xl font-bold text-slate-900">91% to Google</p>
          </CardContent>
        </Card>

        <Card className="border-indigo-200 bg-indigo-50/40">
          <CardContent className="p-4">
            <p className="text-xs font-semibold text-indigo-700">Reputation Growth</p>
            <p className="text-2xl font-bold text-slate-900">+45 Reviews/mo</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Post-Visit NPS & Google Review Stream</CardTitle>
          <CardDescription>Automated feedback collection and online reputation management</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {REVIEWS_STREAM.map((r) => (
            <div key={r.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-slate-900">{r.patientName}</h4>
                  <div className="flex items-center text-amber-500">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200 text-[10px]">
                  {r.status}
                </Badge>
              </div>
              <p className="text-xs text-slate-700">💬 "{r.feedback}"</p>
              <p className="text-[11px] text-slate-500">Doctor: <b>{r.doctor}</b> &bull; Action: {r.action}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewAgent;
