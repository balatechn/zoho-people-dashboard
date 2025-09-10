# Zoho People Dashboard - UI Components Guide

## Overview

This document provides detailed information about the UI components used in the Zoho People Dashboard. The interface follows a consistent design language with a gold and off-white theme, providing a clean and professional appearance suitable for HR management tasks.

## Theme Colors

The dashboard uses a custom color palette based on Tailwind CSS:

- **Primary**: Gold/amber theme (`amber-500`, `amber-600`)
- **Background**: Off-white (`amber-50`)
- **Text**: Dark gray (`zinc-800`)
- **Accents**:
  - Sky blue (`#0ea5e9`)
  - Green (`#22c55e`)
  - Amber (`#f59e0b`) 
  - Indigo (`#6366f1`)
  - Red (`#ef4444`)

## Layout Structure

### Top Bar
```jsx
<div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
  <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
    {/* Company logo, title, search, and action buttons */}
  </div>
</div>
```

### Main Layout
```jsx
<div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 p-4 lg:grid-cols-12">
  {/* Sidebar: 2 columns on large screens */}
  <aside className="lg:col-span-2">
    {/* Navigation and filters */}
  </aside>
  
  {/* Main content: 10 columns on large screens */}
  <main className="lg:col-span-10 space-y-4">
    {/* Dashboard components */}
  </main>
</div>
```

## Core Components

### Navigation Sidebar

The sidebar provides main navigation and quick filters:

```jsx
<Card className="sticky top-20">
  <CardHeader>
    <CardTitle className="text-sm">Navigation</CardTitle>
  </CardHeader>
  <CardContent className="space-y-1 text-sm">
    {/* Navigation buttons with icons */}
  </CardContent>
</Card>

<Card className="mt-4">
  <CardHeader>
    <CardTitle className="text-sm">Quick Filters</CardTitle>
  </CardHeader>
  <CardContent className="space-y-3">
    {/* Filter dropdown menus */}
  </CardContent>
</Card>
```

### KPI Cards

Key performance indicator cards display important metrics:

```jsx
<Card className="overflow-hidden">
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
```

### Chart Cards

Cards containing data visualizations:

```jsx
<Card className="xl:col-span-2">
  <CardHeader>
    <CardTitle className="flex items-center gap-2">
      <Clock className="h-4 w-4"/>Check-ins vs Check-outs
    </CardTitle>
  </CardHeader>
  <CardContent className="h-64">
    <ResponsiveContainer width="100%" height="100%">
      {/* Chart implementation */}
    </ResponsiveContainer>
  </CardContent>
</Card>
```

### Data Tables

Tables for displaying structured data:

```jsx
<table className="w-full text-sm">
  <thead>
    <tr className="border-b bg-amber-100/60 text-left text-xs uppercase text-zinc-600">
      {/* Table headers */}
    </tr>
  </thead>
  <tbody>
    {/* Table rows */}
  </tbody>
</table>
```

### Status Badges

Color-coded badges for attendance status:

```jsx
<span className={`rounded-full px-2 py-1 text-xs ${
  row.status === 'Present' ? 'bg-green-100 text-green-700' : 
  row.status === 'WFH' ? 'bg-indigo-100 text-indigo-700' : 
  row.status === 'Leave' ? 'bg-amber-100 text-amber-700' : 
  'bg-zinc-100 text-zinc-700'
}`}>
  {row.status}
</span>
```

### Approval Cards

Cards displaying pending approval items:

```jsx
<div className="rounded-xl border p-3">
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
```

### Attendance Upload Component

Specialized component for uploading attendance data:

```jsx
<div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
  <div className="px-4 py-3 bg-gradient-to-r from-amber-500 to-gold-600 flex justify-between items-center">
    <h2 className="text-white font-medium flex items-center gap-2">
      <Upload className="h-4 w-4" />
      Attendance Data Upload
    </h2>
  </div>
  
  <div className="p-6">
    <div className="border-2 border-dashed rounded-lg p-8 text-center border-gray-300 hover:border-gold-400">
      {/* Upload interface */}
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
```

## Data Visualization Components

### Area Chart

Used for time-series data like check-ins vs check-outs:

```jsx
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
```

### Pie Chart

Used for attendance distribution:

```jsx
<PieChart>
  <Pie data={attendanceSplit} dataKey="value" nameKey="name" outerRadius={85} label>
    {attendanceSplit.map((entry, index) => (
      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    ))}
  </Pie>
  <Tooltip />
</PieChart>
```

### Bar Chart

Used for regularization requests data:

```jsx
<BarChart data={regularizationData} margin={{ left: 8, right: 8 }}>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="date" />
  <YAxis />
  <Tooltip />
  <Bar dataKey="count" radius={[8, 8, 0, 0]} fill="#f59e0b" />
</BarChart>
```

## Interactive Components

### Button Variants

```jsx
// Primary button
<Button className="gap-2 bg-amber-500 hover:bg-amber-600">
  <Plus className="h-4 w-4"/>Add Employee
</Button>

// Outline button
<Button variant="outline" className="gap-2">
  <Filter className="h-4 w-4"/>Filters
</Button>

// Ghost button
<Button variant="ghost" size="icon">
  <Settings className="h-5 w-5"/>
</Button>

// Small button
<Button size="sm" className="h-8 bg-amber-500 hover:bg-amber-600">
  Approve
</Button>
```

### Dropdown Menus

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="w-full justify-between">
      Date Range <ChevronDown className="h-4 w-4"/>
    </Button>
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
```

### Search Input

```jsx
<Input className="w-56" placeholder="Search employee, request, policy…" />
```

## Responsive Design

The dashboard implements responsive design patterns:

- Layout grid changes from 1 column to 12 columns at large screen sizes
- Charts and tables stack on mobile and expand horizontally on larger screens
- KPI cards switch from stacked to grid layout based on screen size
- Sidebar becomes floating/overlay on mobile devices

## Animation

The UI includes subtle animations using Framer Motion:

```jsx
<motion.div 
  initial={{ opacity: 0, y: 6 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.3 }}
>
  {/* Animated content */}
</motion.div>
```

## Icon Usage

The dashboard uses Lucide icons consistently throughout the interface:

- `Users`: For employee-related sections
- `Clock`: For time-related sections
- `CalendarCheck`: For attendance-related sections
- `ShieldCheck`: For approvals-related sections
- `Building2`: For organization-related sections
- `Briefcase`: For department-related sections
- `MapPin`: For location-related sections
- `Bell`: For notifications and approvals
- `Filter`, `Download`, `Plus`, `Settings`: For action buttons

## Best Practices for UI Consistency

1. Always use the established color scheme for status indicators
2. Maintain consistent icon usage across the application
3. Use card containers with proper headers for all major sections
4. Include both icon and text labels for important navigation items
5. Follow spacing and padding patterns from existing components
6. Use standardized button variants based on action importance

---

*This UI Components Guide is part of the Zoho People Dashboard documentation. Last updated: September 9, 2025.*
