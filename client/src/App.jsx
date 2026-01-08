import TicketForm from "./components/TicketForm";
import AnalysisPanel from "./components/AnalysisPanel";
import TicketList from "./components/TicketList";

function App() {
  return (
    // Clean, neutral background with better font smoothing
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 antialiased font-sans p-6 md:p-12">
      
      {/* Refined Header Section */}
      <header className="max-w-6xl mx-auto mb-16">
        <div className="flex flex-col items-start border-l-4 border-indigo-600 pl-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Support Intelligence <span className="text-indigo-600">Hub</span>
          </h1>
          <p className="mt-2 text-slate-500 font-medium max-w-2xl">
            Streamline your customer experience with automated triage and 
            sentiment-driven prioritization.
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto space-y-12">
        {/* Top Section: Form and Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column - Priority focus on Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-1">
            <TicketForm />
          </div>

          {/* Right Column - Results */}
          <div className="lg:col-span-5 lg:sticky lg:top-8">
            <div className="bg-slate-50 rounded-2xl border border-dashed border-slate-300 p-2">
              <AnalysisPanel />
            </div>
          </div>
        </div>

        {/* Divider for Visual Break */}
        <hr className="border-slate-200" />

        {/* Bottom Section: Records */}
        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Recent Tickets</h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live Feed</span>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
            <TicketList />
          </div>
        </section>
      </main>
      
      {/* Subtle Footer */}
      <footer className="max-w-6xl mx-auto mt-20 pb-8 text-center text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} AI Ticket Support Systems
      </footer>
    </div>
  );
}

export default App;