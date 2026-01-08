import React from "react";
import { useSelector } from "react-redux";
import AnalysisResult from "./AnalysisResult";

const AnalysisPanel = () => {
  const { ticket, isLoading } = useSelector((state) => state.ai);
  console.log(ticket);
  
  
  return (
    /* 1. Added min-h-[580px] to match the average height of the form.
       2. Used flex-col and flex-1 to push the empty state content to fill the space.
    */
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200/60 min-h-[590px] flex flex-col">
      
      {/* Header - Spacing matches the TicketForm exactly */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800">AI Analysis</h2>
        <p className="text-sm text-slate-500">Real-time classification results.</p>
      </div>

      {/* This container expands to fill the rest of the card's height */}
      <div className="flex-1 flex flex-col">
        
        {/* Initial Blank State - Now uses flex-1 to take up all available vertical space */}
        {!ticket && !isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/30 px-6">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
              <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-slate-800 font-semibold mb-2">Awaiting Ticket</h3>
            <p className="text-slate-500 text-sm leading-relaxed max-w-[220px]">
              Once you submit the form, our AI will categorize and prioritize the request here.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-12 h-12 mb-4">
              <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
            <p className="text-indigo-600 font-semibold animate-pulse">
              Running AI Analysis...
            </p>
          </div>
        )}

        {/* Result Container */}
        {ticket && !isLoading && (
          <div className="flex-1 animate-in fade-in zoom-in-95 duration-500">
            <AnalysisResult ticket={ticket} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisPanel;