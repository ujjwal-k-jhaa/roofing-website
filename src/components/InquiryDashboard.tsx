import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, Clock, Wrench, RefreshCw, Layers, ShieldCheck, Mail, CheckCircle, FlameKindling, Info, Hammer } from "lucide-react";
import { Booking } from "../types";

interface InquiryDashboardProps {
  isDarkMode: boolean;
}

export default function InquiryDashboard({ isDarkMode }: InquiryDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Booking | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error("Failed to fetch CRM leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        // Update local state smoothly
        setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus as any } : b));
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry(prev => prev ? { ...prev, status: newStatus as any } : null);
        }
      }
    } catch (err) {
      console.error("CRM State Update Failure:", err);
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const searchString = `${b.name} ${b.email} ${b.phone} ${b.address} ${b.roofType} ${b.serviceType}`.toLowerCase();
    const matchesSearch = searchString.includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "All" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "New":
        return "bg-sky-500/10 text-sky-500 border border-sky-500/20";
      case "Contacted":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "Scheduled":
        return "bg-indigo-500/10 text-indigo-500 border border-indigo-500/20";
      case "Completed":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border border-slate-500/20";
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Visual Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-colors ${
        isDarkMode ? "bg-slate-950 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="space-y-1.5 flex-1">
          <span className="text-[10px] font-mono uppercase tracking-widest text-amber-500 font-bold block">
            Real-time Database Connection
          </span>
          <h2 className="text-2xl font-bold font-sans tracking-tight">
            Apex CRM Staff Dashboard
          </h2>
          <p className="text-xs text-slate-500 max-w-xl">
            This workspace displays live lead records parsed directly from the custom Node express server. Click on any row to alter booking statuses in real time.
          </p>
        </div>

        {/* Sync Button */}
        <button
          id="crm-sync-button"
          onClick={fetchBookings}
          disabled={loading}
          className={`px-4.5 py-2.5 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition cursor-pointer ${
            isDarkMode 
              ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white" 
              : "bg-white border-slate-250 text-slate-700 hover:bg-slate-50 hover:shadow-sm"
          }`}
        >
          <RefreshCw className={`w-4.5 h-4.5 text-amber-500 ${loading ? "animate-spin" : ""}`} />
          <span>Synchronize Records</span>
        </button>
      </div>

      {/* Stats Counter Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Leads", count: bookings.length, color: "border-slate-500" },
          { label: "New Request", count: bookings.filter(b => b.status === "New").length, color: "border-sky-500" },
          { label: "Action Scheduled", count: bookings.filter(b => b.status === "Scheduled").length, color: "border-indigo-500" },
          { label: "Closed Success", count: bookings.filter(b => b.status === "Completed").length, color: "border-emerald-500" }
        ].map((stat, idx) => (
          <div key={idx} className={`p-3 sm:p-4 rounded-xl border ${stat.color}/20 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase text-slate-400 block truncate" title={stat.label}>{stat.label}</span>
            <span className="text-xl sm:text-2xl font-extrabold font-sans block mt-1">{stat.count}</span>
          </div>
        ))}
      </div>

      {/* Main CRM Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Table & Filtering Block (Left 8 cols) */}
        <div className={`col-span-1 lg:col-span-8 rounded-2xl border overflow-hidden ${
          isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
        }`}>
          
          {/* Filters Bar */}
          <div className={`p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between ${
            isDarkMode ? "border-slate-800 bg-slate-900/10" : "border-slate-100 bg-slate-50/50"
          }`}>
            {/* Search Input */}
            <div className={`flex items-center gap-2 px-3 py-2 text-xs rounded-xl border w-full md:max-w-xs ${
              isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <Search className="w-4 h-4 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search phone, name, materials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full"
              />
            </div>

            {/* Status Selectors */}
            <div className="flex flex-wrap items-center gap-1">
              {["All", "New", "Contacted", "Scheduled", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase font-bold transition cursor-pointer ${
                    statusFilter === status
                      ? "bg-amber-500 text-slate-950"
                      : isDarkMode
                        ? "text-slate-400 hover:text-white hover:bg-slate-900"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Table Element */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-4 space-y-4">
                {[1, 2, 3, 4, 5].map((skeletonId) => (
                  <div 
                    key={`crm-skeleton-${skeletonId}`} 
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-dashed border-slate-200/20 dark:border-white/[0.04] bg-slate-100/50 dark:bg-white/[0.01] animate-pulse gap-4"
                  >
                    <div className="space-y-2 flex-1 w-full">
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                      <div className="h-3 bg-slate-150 dark:bg-slate-850 rounded w-1/4" />
                    </div>
                    <div className="space-y-2 flex-1 w-full">
                      <div className="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                      <div className="h-2.5 bg-slate-150 dark:bg-slate-850 rounded w-1/2" />
                    </div>
                    <div className="space-y-2 flex-1 w-full hidden md:block">
                      <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-4/5" />
                      <div className="h-2.5 bg-slate-150 dark:bg-slate-850 rounded w-1/3" />
                    </div>
                    <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-16" />
                  </div>
                ))}
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="py-20 text-center text-xs space-y-1.5">
                <Info className="w-8 h-8 text-amber-500 mx-auto" />
                <p className="text-slate-500 font-semibold">No lead consultation records found</p>
                <p className="text-slate-400 text-[10px]">Try filling the public booking form down on the page.</p>
              </div>
            ) : (
              <table className="w-full text-xs">
                <thead>
                  <tr className={`border-b text-[10px] font-mono uppercase tracking-wider ${
                    isDarkMode ? "border-slate-800 bg-slate-900/20 text-slate-400" : "border-slate-150 bg-slate-50 text-slate-500"
                  }`}>
                    <th className="p-4 text-left font-bold">Inquirer</th>
                    <th className="p-4 text-left font-bold">Materials / Action</th>
                    <th className="p-4 text-left font-bold">&nbsp;Details</th>
                    <th className="p-4 text-left font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? "divide-slate-800" : "divide-slate-150"}`}>
                  {filteredBookings.map((b) => (
                    <tr
                      key={b.id}
                      onClick={() => setSelectedInquiry(b)}
                      className={`hover:bg-amber-500/[0.015] transition cursor-pointer ${
                        selectedInquiry?.id === b.id
                          ? isDarkMode ? "bg-amber-500/5 hover:bg-amber-500/5" : "bg-amber-500/[0.03] hover:bg-amber-500/[0.03]"
                          : ""
                      }`}
                    >
                      {/* Name/Phone */}
                      <td className="p-4">
                        <div className="space-y-0.5">
                          <p className="font-bold font-sans text-sm">{b.name}</p>
                          <p className={`text-[11px] font-mono ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{b.phone}</p>
                        </div>
                      </td>

                      {/* Materials/Requested */}
                      <td className="p-4">
                        <div className="space-y-0.5 max-w-[170px] truncate">
                          <p className="font-semibold text-amber-500">{b.roofType}</p>
                          <p className={`text-[10px] leading-tight ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>{b.serviceType}</p>
                        </div>
                      </td>

                      {/* Info summary snippet */}
                      <td className="p-4 max-w-[220px] truncate text-slate-500">
                        <p className={`text-[11px] font-sans truncate ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                          {b.address || "No Address Provided"}
                        </p>
                        <p className={`text-[10px] font-mono font-medium block truncate ${isDarkMode ? "text-slate-500" : "text-slate-400"}`}>
                          Date: {b.preferredDate || "Not Set"} ({b.preferredTime})
                        </p>
                      </td>

                      {/* Status select/pills */}
                      <td className="p-4">
                        <span className={`px-2.5 py-1 text-[10px] font-mono uppercase font-bold rounded-full ${getStatusBadge(b.status || "New")}`}>
                          {b.status || "New"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

        </div>

        {/* Detailed Study & State Modifier Panel (Right 4 cols) */}
        <div className="col-span-1 lg:col-span-4 space-y-6">
          {selectedInquiry ? (
            <div className={`p-6 rounded-2xl border text-left space-y-5 animate-fade-in ${
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
            }`}>
              
              {/* Header */}
              <div className="space-y-1">
                <span className={`px-2.5 py-0.5 text-[9px] font-mono uppercase font-bold rounded-md ${getStatusBadge(selectedInquiry.status || "New")}`}>
                  Record Code: {selectedInquiry.id}
                </span>
                <h3 className="text-lg font-bold font-sans tracking-tight pt-2">{selectedInquiry.name}</h3>
                <p className="text-xs text-slate-500 font-medium">{selectedInquiry.email}</p>
              </div>

              <div className="h-px bg-slate-200/10" />

              {/* Inquiry Spec Details */}
              <div className="space-y-3.5 text-xs">
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Phone</span>
                    <p className="font-bold">{selectedInquiry.phone}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Consult Type</span>
                    <p className="font-bold text-amber-500 text-[11px] leading-tight">{selectedInquiry.serviceType}</p>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Expected Materials</span>
                  <p className="font-bold">{selectedInquiry.roofType}</p>
                </div>

                {selectedInquiry.address && (
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Coordinates / Address</span>
                    <p className="font-sans text-slate-500 font-semibold text-xs leading-snug">
                      {selectedInquiry.address}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/5">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Target Date</span>
                    <p className="font-mono text-[11px] font-bold">{selectedInquiry.preferredDate || "ASAP"}</p>
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Shift window</span>
                    <p className="font-semibold capitalize font-mono text-[11px]">{selectedInquiry.preferredTime}</p>
                  </div>
                </div>

                {selectedInquiry.message && (
                  <div className="space-y-1 p-3 rounded-lg bg-slate-900/40 border border-slate-800/80 text-[11px]">
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">Property Notes</span>
                    <p className={`italic ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>"{selectedInquiry.message}"</p>
                  </div>
                )}

              </div>

              <div className="h-px bg-slate-200/10" />

              {/* Status touching buttons */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">Modify CRM Flow State:</span>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: "New Lead", state: "New" },
                    { label: "Contacted", state: "Contacted" },
                    { label: "Schedule Job", state: "Scheduled" },
                    { label: "Close Complete", state: "Completed" }
                  ].map((act) => (
                    <button
                      key={act.state}
                      disabled={updatingId === selectedInquiry.id}
                      onClick={() => handleStatusUpdate(selectedInquiry.id!, act.state)}
                      className={`py-2 px-2.5 rounded-lg text-[10px] font-semibold text-center transition cursor-pointer border ${
                        selectedInquiry.status === act.state
                          ? "bg-amber-500 border-amber-500 text-slate-950 font-extrabold"
                          : isDarkMode
                            ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                            : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-amber-500"
                      }`}
                    >
                      {updatingId === selectedInquiry.id && selectedInquiry.status === act.state ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin mx-auto text-amber-500" />
                      ) : (
                        act.label
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className={`p-8 rounded-2xl border text-center space-y-3 ${
              isDarkMode ? "bg-slate-950 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <Info className="w-8 h-8 text-amber-500 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h4 className="text-xs font-bold font-sans uppercase tracking-wider text-slate-400">Detail Inspector</h4>
                <p className="text-xs text-slate-500">
                  Select an inquiry row from the database spreadsheet table board to manipulate structural records and edit statuses immediately.
                </p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
