import React from "react";

const AnalysisResult = ({ ticket }) => {
  // Map priority to specific styling
  const priorityStyles = {
    Critical: "bg-rose-50 text-rose-700 border-rose-100 shadow-sm shadow-rose-100",
    High: "bg-orange-50 text-orange-700 border-orange-100",
    Medium: "bg-amber-50 text-amber-700 border-amber-100",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  // Extract analysis for cleaner code
  const analysis = ticket?.analysis || {};

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Priority Level
          </p>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${priorityStyles[analysis.priority] || "bg-slate-100"}`}>
            {analysis.priority || "N/A"}
          </span>
        </div>
        
        <div className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Category
          </p>
          <p className="text-sm font-bold text-slate-700">
            {analysis.category || "Unclassified"}
          </p>
        </div>
      </div>

      {/* Sentiment & Department Section */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Tone / Sentiment
          </p>
          <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
            {analysis.sentiment || "Neutral"}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            Assigned Dept.
          </p>
          <p className="text-sm font-semibold text-slate-600">
            {analysis.department || "General Support"}
          </p>
        </div>
      </div>

      {/* Key Issues (Mapped from keyIssues array) */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">
          Key Issues Identified
        </p>
        <div className="flex flex-wrap gap-2">
          {analysis.keyIssues?.map((issue, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-medium shadow-sm flex items-center gap-2"
            >
              <span className="text-indigo-500">•</span> {issue}
            </span>
          )) || <span className="text-slate-400 text-xs italic">No issues extracted</span>}
        </div>
      </div>

      {/* Status Footer */}
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Last Processed
          </p>
          <p className="text-[11px] text-slate-500">
            {ticket.timestamp ? new Date(ticket.timestamp).toLocaleTimeString() : "Just now"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-emerald-600">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-tight">AI Confirmed</span>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;