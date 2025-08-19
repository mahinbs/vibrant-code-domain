
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Download, Users, Calendar, Phone, Mail, FileText } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface TrialLead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  source: string | null;
  notes: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  created_at: string;
  updated_at: string;
}

const TrialLeads = () => {
  const [leads, setLeads] = useState<TrialLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  const loadTrialLeads = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('trial_leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading trial leads:', error);
        return;
      }

      setLeads(data || []);
    } catch (error) {
      console.error('Error loading trial leads:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTrialLeads();
  }, []);

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.phone && lead.phone.includes(searchTerm));
    
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesSource;
  });

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'WhatsApp', 'Source', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'Notes', 'Created At'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${lead.name}"`,
        `"${lead.email}"`,
        `"${lead.phone || ''}"`,
        `"${lead.source || ''}"`,
        `"${lead.utm_source || ''}"`,
        `"${lead.utm_medium || ''}"`,
        `"${lead.utm_campaign || ''}"`,
        `"${lead.notes || ''}"`,
        `"${new Date(lead.created_at).toLocaleString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trial-leads-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const uniqueSources = [...new Set(leads.map(lead => lead.source).filter(Boolean))];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl text-cyan-400 animate-pulse">Loading trial leads...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Trial Leads
            </h1>
            <p className="text-gray-400 mt-2">Manage AI freelancing trial sign-ups</p>
          </div>
          <div className="flex gap-3">
            <Button 
              onClick={loadTrialLeads}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500"
            >
              <Users className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            {filteredLeads.length > 0 && (
              <Button 
                onClick={exportToCSV}
                variant="outline"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            )}
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">Total Leads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{leads.length}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">This Week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {leads.filter(lead => {
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return new Date(lead.created_at) >= weekAgo;
                }).length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">AI Freelancing</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {leads.filter(lead => lead.source === 'ai_freelancing_trial').length}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-400">With WhatsApp</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {leads.filter(lead => lead.phone).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-600 text-white"
                />
              </div>
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-600 text-white">
                  <SelectValue placeholder="Filter by source" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-600">
                  <SelectItem value="all">All Sources</SelectItem>
                  {uniqueSources.map(source => (
                    <SelectItem key={source} value={source!}>
                      {source === 'ai_freelancing_trial' ? 'AI Freelancing Trial' : source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="bg-gray-900/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Trial Leads ({filteredLeads.length})
            </CardTitle>
            <CardDescription className="text-gray-400">
              View and manage trial lead submissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredLeads.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                {leads.length === 0 ? 'No trial leads found.' : 'No leads match your search criteria.'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700">
                      <TableHead className="text-gray-300">Name</TableHead>
                      <TableHead className="text-gray-300">Email</TableHead>
                      <TableHead className="text-gray-300">WhatsApp</TableHead>
                      <TableHead className="text-gray-300">Source</TableHead>
                      <TableHead className="text-gray-300">UTM Info</TableHead>
                      <TableHead className="text-gray-300">Notes</TableHead>
                      <TableHead className="text-gray-300">Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLeads.map((lead) => (
                      <TableRow key={lead.id} className="border-gray-700 hover:bg-gray-800/50">
                        <TableCell className="text-white font-medium">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-cyan-400" />
                            {lead.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-blue-400" />
                            <a 
                              href={`mailto:${lead.email}`}
                              className="hover:text-blue-400 transition-colors"
                            >
                              {lead.email}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {lead.phone ? (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-green-400" />
                              <a 
                                href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-green-400 transition-colors"
                              >
                                {lead.phone}
                              </a>
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs">
                            {lead.source === 'ai_freelancing_trial' ? 'AI Freelancing' : lead.source || 'Unknown'}
                          </span>
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {lead.utm_source || lead.utm_medium || lead.utm_campaign ? (
                            <div className="text-xs space-y-1">
                              {lead.utm_source && <div>Source: {lead.utm_source}</div>}
                              {lead.utm_medium && <div>Medium: {lead.utm_medium}</div>}
                              {lead.utm_campaign && <div>Campaign: {lead.utm_campaign}</div>}
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          {lead.notes ? (
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm truncate max-w-32" title={lead.notes}>
                                {lead.notes}
                              </span>
                            </div>
                          ) : (
                            <span className="text-gray-500">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-gray-300">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-purple-400" />
                            <div className="text-sm">
                              <div>{new Date(lead.created_at).toLocaleDateString()}</div>
                              <div className="text-xs text-gray-500">
                                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
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

export default TrialLeads;
