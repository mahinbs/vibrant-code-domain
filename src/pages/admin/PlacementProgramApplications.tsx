import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import {
  placementProgramService,
  type PlacementProgramApplication,
} from "@/services/placementProgramService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Download,
  GraduationCap,
  Mail,
  Phone,
  RefreshCw,
  Search,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PlacementProgramApplications = () => {
  const [applications, setApplications] = useState<PlacementProgramApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await placementProgramService.listApplications();
    setApplications(data);
    setLoadError(error);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const programOptions = useMemo(
    () => [...new Set(applications.map((item) => item.program))],
    [applications]
  );

  const filtered = useMemo(() => {
    return applications.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.phone.includes(searchTerm) ||
        (item.message ?? "").toLowerCase().includes(searchTerm.toLowerCase());

      const matchesProgram =
        programFilter === "all" || item.program === programFilter;

      return matchesSearch && matchesProgram;
    });
  }, [applications, searchTerm, programFilter]);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Program",
      "Background",
      "Message",
      "Status",
      "Created At",
    ];
    const csvContent = [
      headers.join(","),
      ...filtered.map((item) =>
        [
          `"${item.name}"`,
          `"${item.email}"`,
          `"${item.phone}"`,
          `"${item.program}"`,
          `"${item.background}"`,
          `"${(item.message ?? "").replace(/"/g, '""')}"`,
          `"${item.status}"`,
          `"${new Date(item.created_at).toLocaleString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `placement-applications-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="animate-pulse text-xl text-cyan-400">
            Loading placement applications...
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-3xl font-bold text-transparent">
              Placement Program Applications
            </h1>
            <p className="mt-2 text-gray-400">
              Applications submitted from the /placement-programs page.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild className="border-gray-700 text-gray-300">
              <Link to="/admin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
            <Button
              onClick={() => void load()}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            {filtered.length > 0 && (
              <Button
                onClick={exportToCSV}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            )}
          </div>
        </div>

        {loadError && (
          <Card className="border-red-500/40 bg-red-950/20">
            <CardContent className="pt-6 text-red-300">{loadError}</CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{applications.length}</div>
            </CardContent>
          </Card>
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {
                  applications.filter((item) => {
                    const weekAgo = new Date();
                    weekAgo.setDate(weekAgo.getDate() - 7);
                    return new Date(item.created_at) >= weekAgo;
                  }).length
                }
              </div>
            </CardContent>
          </Card>
          <Card className="border-gray-700 bg-gray-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">
                Programs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {programOptions.length}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="text-lg text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by name, email, phone, or message..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-gray-600 bg-gray-800 pl-10 text-white"
                />
              </div>
              <Select value={programFilter} onValueChange={setProgramFilter}>
                <SelectTrigger className="w-full border-gray-600 bg-gray-800 text-white md:w-72">
                  <SelectValue placeholder="Filter by program" />
                </SelectTrigger>
                <SelectContent className="border-gray-600 bg-gray-800">
                  <SelectItem value="all">All Programs</SelectItem>
                  {programOptions.map((program) => (
                    <SelectItem key={program} value={program}>
                      {program}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-white">
              <GraduationCap className="h-5 w-5" />
              Applications ({filtered.length})
            </CardTitle>
            <CardDescription className="text-gray-400">
              View and export placement program submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-gray-400">
                {applications.length === 0
                  ? "No applications yet."
                  : "No applications match your filters."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Contact</TableHead>
                      <TableHead className="text-gray-300">Program</TableHead>
                      <TableHead className="text-gray-300">Background</TableHead>
                      <TableHead className="text-gray-300">Message</TableHead>
                      <TableHead className="text-gray-300">Submitted</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((item) => (
                      <TableRow
                        key={item.id}
                        className="border-gray-700 hover:bg-gray-800/50"
                      >
                        <TableCell className="font-medium text-white">
                          {item.name}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-blue-400" />
                              <a
                                href={`mailto:${item.email}`}
                                className="hover:text-blue-400"
                              >
                                {item.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-green-400" />
                              <a
                                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, "")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-400"
                              >
                                {item.phone}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs text-gray-300">
                          <span className="rounded bg-cyan-500/20 px-2 py-1 text-xs text-cyan-300">
                            {item.program}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {item.background}
                        </TableCell>
                        <TableCell className="max-w-xs text-gray-300">
                          {item.message ? (
                            <span className="text-sm" title={item.message}>
                              {item.message}
                            </span>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-400" />
                            <div className="text-sm">
                              <div>
                                {new Date(item.created_at).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(item.created_at), {
                                  addSuffix: true,
                                })}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default PlacementProgramApplications;
