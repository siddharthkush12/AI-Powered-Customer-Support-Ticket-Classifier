import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { analyzeTicket } from "../store/AiResponse";

const TicketForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((s) => s.ai);

  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    description: "",
  });

  const submit = (e) => {
    e.preventDefault();
    dispatch(analyzeTicket(formData));
  };

  // Shared Tailwind classes for a consistent, clean look
  const inputClasses = `
    w-full px-4 py-3 rounded-xl border border-slate-200 
    bg-slate-50/50 text-slate-900 placeholder:text-slate-400
    focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500
    transition-all duration-200 ease-in-out
  `;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-slate-800">Create New Ticket</h2>
        <p className="text-sm text-slate-500">Fill in the details below for AI analysis.</p>
      </div>

      <form onSubmit={submit} className="space-y-6">
        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
          <input 
            type="email"
            placeholder="support@company.com" 
            required
            className={inputClasses}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
        </div>

        {/* Subject Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
          <input 
            type="text"
            placeholder="Brief summary of the issue" 
            required
            className={inputClasses}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })} 
          />
        </div>

        {/* Description Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Issue Description</label>
          <textarea 
            rows="5"
            placeholder="Describe the problem in detail..." 
            required
            className={`${inputClasses} resize-none`}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
          />
        </div>

        {/* Submit Button */}
        <button 
          disabled={isLoading}
          className={`
            w-full py-3 px-6 rounded-xl font-bold text-white
            transition-all duration-200 
            ${isLoading 
              ? "bg-slate-300 cursor-not-allowed" 
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-200"}
          `}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing Request...
            </span>
          ) : "Analyze & Submit"}
        </button>
      </form>
    </div>
  );
};

export default TicketForm;