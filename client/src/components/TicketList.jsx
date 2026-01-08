import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnalysisResult from "./AnalysisResult";
import { fetchTicketHistory } from "../store/AiResponse";

const priorityStyles = {
  Critical: "bg-rose-50 text-rose-700 border-rose-100",
  High: "bg-orange-50 text-orange-700 border-orange-100",
  Medium: "bg-amber-50 text-amber-700 border-amber-100",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-100"
};

const TicketList = () => {
  const dispatch = useDispatch();
  const [selectedTicket, setSelectedTicket] = useState(null);
  
  // 1. Pull tickets directly from Redux history
  const { history, ticket: lastAnalyzedTicket, isLoading } = useSelector((state) => state.ai);

  // 2. Fetch logic using the Thunk
  useEffect(() => {
    dispatch(fetchTicketHistory());
  }, [dispatch, lastAnalyzedTicket]); // Refetch when component mounts or a new ticket is analyzed

  return (
    <div className="bg-white rounded-2xl p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Processing History</h2>
          <p className="text-sm text-slate-500">Overview of all AI-classified support requests.</p>
        </div>
        <div className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-500 uppercase tracking-tighter">
          {history?.length || 0} Total
        </div>
      </div>

      {/* Loading & Empty States */}
      {isLoading && history?.length === 0 ? (
        <div className="py-20 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-slate-200 border-t-indigo-600 mb-4"></div>
          <p className="text-slate-500 font-medium">Fetching history...</p>
        </div>
      ) : !history || history.length === 0 ? (
        <div className="py-20 text-center border-2 border-dashed border-slate-100 rounded-2xl">
          <p className="text-slate-400 font-medium">No tickets have been processed yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((t) => {
            const isOpen = selectedTicket?.id === t.id; 
            
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(isOpen ? null : t)}
                className={`group border rounded-xl transition-all duration-200 cursor-pointer ${
                  isOpen 
                    ? "border-indigo-200 bg-indigo-50/30 ring-1 ring-indigo-100" 
                    : "border-slate-100 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                {/* Row Summary */}
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${priorityStyles[t.analysis?.priority] || "bg-slate-50 text-slate-600"}`}>
                      {t.analysis?.priority}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{t.email}</div>
                      <div className="text-[11px] text-slate-400 font-medium">
                        {new Date(t.timestamp).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="hidden md:inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                      {t.analysis?.category}
                    </span>
                    <svg className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Expanded Detailed View */}
                {isOpen && (
                  <div className="px-4 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-indigo-100/50">
                      <div className="bg-white p-5 rounded-xl border border-indigo-100 shadow-sm">
                        <AnalysisResult ticket={t} />
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-indigo-900/40 uppercase tracking-widest">Original Message</h4>
                        <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-600 leading-relaxed border border-slate-100 whitespace-pre-line">
                          {t.description}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TicketList;