import React from "react";
import { motion } from "framer-motion";
import { 
  Users, Clock, CalendarCheck, ShieldCheck, ChevronDown, Filter, Download, Plus, Settings, Building2, Briefcase, MapPin, UserCheck, Calendar, Bell
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// ----- Sample Data -----
const trendData = [
  { day: "Mon", checkins: 82, checkouts: 79 },
  { day: "Tue", checkins: 96, checkouts: 92 },
  { day: "Wed", checkins: 101, checkouts: 98 },
  { day: "Thu", checkins: 88, checkouts: 85 },
  { day: "Fri", checkins: 110, checkouts: 104 },
  { day: "Sat", checkins: 37, checkouts: 36 },
  { day: "Sun", checkins: 12, checkouts: 10 },
];

const regularizationData = [
  { date: "Aug 29", count: 8 },
  { date: "Aug 30", count: 6 },
  { date: "Aug 31", count: 4 },
  { date: "Sep 01", count: 12 },
  { date: "Sep 02", count: 10 },
  { date: "Sep 03", count: 7 },
  { date: "Sep 04", count: 9 },
];

const attendanceSplit = [
  { name: "Present", value: 124 },
  { name: "WFH", value: 22 },
  { name: "Leave", value: 15 },
  { name: "OD", value: 7 },
  { name: "Absent", value: 9 },
];

const COLORS = ["#0ea5e9", "#22c55e", "#f59e0b", "#6366f1", "#ef4444"]; // sky, green, amber, indigo, red

const todayTable = [
  { name: "Anita Desai", dept: "HR", location: "Bengaluru", status: "Present", time: "09:18" },
  { name: "Vishal Singh", dept: "Finance", location: "Mumbai", status: "WFH", time: "09:05" },
  { name: "Harini V", dept: "Sales", location: "Bengaluru", status: "Present", time: "09:24" },
  { name: "Rohit Jain", dept: "Projects", location: "Mangaluru", status: "Leave", time: "-" },
  { name: "Farheen K", dept: "IT", location: "Bengaluru", status: "Present", time: "08:59" },
];

const approvals = [
  { id: "RG-1042", type: "Regularization", by: "Karthik P", for: "Sep 03 • 09:20", age: "2d" },
  { id: "LV-2218", type: "Leave", by: "Shwetha S", for: "Sep 09-10 • Casual", age: "1d" },
  { id: "WF-0081", type: "WFH", by: "Jason C", for: "Sep 06 • Full Day", age: "3h" },
];

export default function ZohoPeopleDashboardMock() {
  return (
    <div className="min-h-screen bg-amber-50 text-zinc-800">
      {/* Top Bar */}
      <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-amber-500" />
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-wider text-zinc-500">National Group</p>
              <h1 className="text-lg font-semibold">Zoho People — Management Dashboard</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Input className="w-56" placeholder="Search employee, request, policy…" />
            <Button variant="outline" className="gap-2"><Filter className="h-4 w-4"/>Filters</Button>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4"/>Export</Button>
            <Button className="gap-2 bg-amber-500 hover:bg-amber-600"><Plus className="h-4 w-4"/>Add Employee</Button>
            <Button variant="ghost" size="icon"><Settings className="h-5 w-5"/></Button>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-2">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle className="text-sm">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              {[
                { icon: <Users className="h-4 w-4"/>, label: "People" },
                { icon: <CalendarCheck className="h-4 w-4"/>, label: "Attendance" },
                { icon: <Clock className="h-4 w-4"/>, label: "Timesheets" },
                { icon: <ShieldCheck className="h-4 w-4"/>, label: "Approvals" },
                { icon: <Briefcase className="h-4 w-4"/>, label: "HR Files" },
                { icon: <Building2 className="h-4 w-4"/>, label: "Org Chart" },
              ].map((i, idx) => (
                <button key={idx} className="flex w-full items-center gap-2 rounded-lg px-2 py-2 hover:bg-amber-100">
                  {i.icon}<span>{i.label}</span>
                </button>
              ))}
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Quick Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">Date Range <ChevronDown className="h-4 w-4"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuLabel>Presets</DropdownMenuLabel>
                  <DropdownMenuItem>Today</DropdownMenuItem>
                  <DropdownMenuItem>This Week</DropdownMenuItem>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuSeparator/>
                  <DropdownMenuItem>Custom…</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between"><MapPin className="mr-2 h-4 w-4"/>Location <ChevronDown className="h-4 w-4"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>Bengaluru</DropdownMenuItem>
                  <DropdownMenuItem>Mumbai</DropdownMenuItem>
                  <DropdownMenuItem>Mangaluru</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between"><Briefcase className="mr-2 h-4 w-4"/>Department <ChevronDown className="h-4 w-4"/></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>IT</DropdownMenuItem>
                  <DropdownMenuItem>HR</DropdownMenuItem>
                  <DropdownMenuItem>Sales</DropdownMenuItem>
                  <DropdownMenuItem>Finance</DropdownMenuItem>
                  <DropdownMenuItem>Projects</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
        </aside>

        {/* Main */}
        <main className="lg:col-span-10 space-y-4">
          {/* KPI Row */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Employees", value: "177", sub: "+4 this month", icon: <Users className="h-4 w-4"/> },
              { label: "Present Now", value: "146", sub: "↑ 3% vs last wk", icon: <UserCheck className="h-4 w-4"/> },
              { label: "Pending Approvals", value: "18", sub: "Reg/Leave/WFH", icon: <ShieldCheck className="h-4 w-4"/> },
              { label: "Avg. Check-in", value: "09:21", sub: "Bengaluru • Sep 06", icon: <Clock className="h-4 w-4"/> },
            ].map((kpi, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500">{kpi.label}</CardTitle>
                  <div className="text-zinc-400">{kpi.icon}</div>
                </CardHeader>
                <CardContent>
                  <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                    <div className="text-2xl font-semibold">{kpi.value}</div>
                    <div className="text-xs text-zinc-500">{kpi.sub}</div>
                  </motion.div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-4 w-4"/>Check-ins vs Check-outs</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData} margin={{ left: 8, right: 8 }}>
                    <defs>
                      <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="checkins" stroke="#0ea5e9" fill="url(#c1)" strokeWidth={2}/>
                    <Area type="monotone" dataKey="checkouts" stroke="#f59e0b" fill="url(#c2)" strokeWidth={2}/>
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar className="h-4 w-4"/>Attendance Split (Today)</CardTitle>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={attendanceSplit} dataKey="value" nameKey="name" outerRadius={85} label>
                      {attendanceSplit.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Tables Row */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-4 w-4"/>Today's Attendance (Sample)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-amber-100/60 text-left text-xs uppercase text-zinc-600">
                        <th className="px-3 py-2">Employee</th>
                        <th className="px-3 py-2">Department</th>
                        <th className="px-3 py-2">Location</th>
                        <th className="px-3 py-2">Status</th>
                        <th className="px-3 py-2">Check-in</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todayTable.map((row, i) => (
                        <tr key={i} className="border-b last:border-none">
                          <td className="px-3 py-2">{row.name}</td>
                          <td className="px-3 py-2">{row.dept}</td>
                          <td className="px-3 py-2">{row.location}</td>
                          <td className="px-3 py-2">
                            <span className={`rounded-full px-2 py-1 text-xs ${row.status === 'Present' ? 'bg-green-100 text-green-700' : row.status === 'WFH' ? 'bg-indigo-100 text-indigo-700' : row.status === 'Leave' ? 'bg-amber-100 text-amber-700' : 'bg-zinc-100 text-zinc-700'}`}>{row.status}</span>
                          </td>
                          <td className="px-3 py-2">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bell className="h-4 w-4"/>Pending Approvals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {approvals.map((a) => (
                  <div key={a.id} className="rounded-xl border p-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="font-medium">{a.type} • <span className="text-zinc-500">{a.id}</span></div>
                      <div className="text-xs text-zinc-500">{a.age} ago</div>
                    </div>
                    <div className="mt-1 text-xs text-zinc-600">{a.by} — {a.for}</div>
                    <div className="mt-2 flex gap-2">
                      <Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-600">Approve</Button>
                      <Button size="sm" variant="outline" className="h-8">Reject</Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Regularization Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShieldCheck className="h-4 w-4"/>Regularization Requests (Last 7 days)</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regularizationData} margin={{ left: 8, right: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Attendance Upload Component Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Upload className="h-4 w-4"/>Attendance Upload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                <div className="px-4 py-3 bg-gradient-to-r from-amber-500 to-gold-600 flex justify-between items-center">
                  <h2 className="text-white font-medium flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Attendance Data Upload
                  </h2>
                </div>
                
                <div className="p-6">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-gold-400">
                    <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center mx-auto mb-3">
                      <Upload className="h-6 w-6 text-gold-600" />
                    </div>
                    
                    <p className="mb-2 text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                    <p className="mb-4 text-xs text-gray-500">CSV or Excel files only</p>
                    
                    <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-gold-600 rounded-md text-white text-sm font-medium hover:opacity-90 inline-flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      Select File
                    </button>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">Supported Formats</h3>
                    <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
                      <li>CSV file with header row (recommended)</li>
                      <li>Excel file (.xlsx) with attendance data</li>
                      <li>Required columns: Date, Employee Id, Name, Email, Check-in, Check-out, etc.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="pb-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} National Group • Sample UI for Zoho People dashboard • Gold & Off‑White theme
          </div>
        </main>
      </div>
    </div>
  );
}
