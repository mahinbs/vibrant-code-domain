import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { isWithinInterval, parseISO, startOfDay, endOfDay } from 'date-fns';
import { customerInquiryService, CustomerInquiry } from '@/services/customerInquiryService';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Mail, Phone, Building, Calendar as CalendarIcon, DollarSign, Clock, MessageSquare, Filter, Search, ArrowLeft, Home, RotateCcw } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { DateRangePicker } from '@/components/admin/DateRangePicker';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const CustomerInquiries = () => {
  const isMobile = useIsMobile();
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [showDeleted, setShowDeleted] = useState(false);

  useEffect(() => {
    if (showDeleted) {
      loadDeletedInquiries();
    } else {
      loadInquiries();
    }
  }, [showDeleted]);

  const loadInquiries = async () => {
    try {
      setLoading(true);
      const data = await customerInquiryService.getInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Error loading inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadDeletedInquiries = async () => {
    try {
      setLoading(true);
      const data = await customerInquiryService.getDeletedInquiries();
      setInquiries(data);
    } catch (error) {
      console.error('Error loading deleted inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await customerInquiryService.updateInquiryStatus(id, status);
      await loadInquiries(); // Reload the list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to move this inquiry to trash?')) {
      try {
        await customerInquiryService.deleteInquiry(id);
        await loadInquiries(); // Reload the list
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  const restoreInquiry = async (id: string) => {
    try {
      await customerInquiryService.restoreInquiry(id);
      await loadDeletedInquiries(); // Reload deleted list
    } catch (error) {
      console.error('Error restoring inquiry:', error);
    }
  };
  
  const hardDeleteInquiry = async (id: string) => {
    if (window.confirm('Are you sure you want to PERMANENTLY delete this inquiry? This action cannot be undone.')) {
      try {
        await customerInquiryService.hardDeleteInquiry(id);
        await loadDeletedInquiries(); // Reload deleted list
      } catch (error) {
        console.error('Error permanently deleting inquiry:', error);
      }
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500';
      case 'in_progress': return 'bg-yellow-500';
      case 'contacted': return 'bg-purple-500';
      case 'converted': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesFilter = filter === 'all' || inquiry.status === filter;
    const matchesSearch = searchTerm === '' || 
      inquiry.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.service_interest.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (dateRange?.from) {
      const start = startOfDay(dateRange.from);
      const end = endOfDay(dateRange.to || dateRange.from);
      matchesDate = inquiry.created_at ? isWithinInterval(parseISO(inquiry.created_at), { start, end }) : false;
    }

    return matchesFilter && matchesSearch && matchesDate;
  });

  const inquiryStats = {
    total: filteredInquiries.length,
    new: filteredInquiries.filter(i => i.status === 'new').length,
    in_progress: filteredInquiries.filter(i => i.status === 'in_progress').length,
    converted: filteredInquiries.filter(i => i.status === 'converted').length,
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center py-12">
          <div className="text-white text-lg">Loading customer inquiries...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/admin" className="text-gray-400 hover:text-cyan-400 transition-colors">
                      <Home className="h-4 w-4" />
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-gray-500" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Customer Inquiries</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <Button
                asChild
                variant="outline"
                size="sm"
                className={`border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white ${isMobile ? 'w-full' : ''}`}
              >
                <Link to="/admin">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Customer Inquiries</h1>
            </div>
          </div>
          <Button 
            onClick={showDeleted ? loadDeletedInquiries : loadInquiries}
            className={`bg-cyan-500 hover:bg-cyan-600 ${isMobile ? 'w-full' : ''}`}
          >
            Refresh
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-xs md:text-sm text-gray-400">Total Inquiries</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-white">{inquiryStats.total}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-xs md:text-sm text-gray-400">New</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-blue-400">{inquiryStats.new}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-xs md:text-sm text-gray-400">In Progress</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-yellow-400">{inquiryStats.in_progress}</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="pb-2 p-3 md:p-4">
              <CardTitle className="text-xs md:text-sm text-gray-400">Converted</CardTitle>
            </CardHeader>
            <CardContent className="p-3 md:p-4 pt-0">
              <div className="text-xl md:text-2xl font-bold text-green-400">{inquiryStats.converted}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full md:w-40 bg-gray-800 border-gray-600 text-white h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <CalendarIcon className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <DateRangePicker date={dateRange} onDateChange={setDateRange} />
          </div>
          <div className="flex items-center space-x-2 flex-1">
            <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <Input
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-800 border-gray-600 text-white h-11"
            />
          </div>
          <div className="flex items-center justify-between md:justify-start space-x-2 w-full md:w-auto">
            <Label htmlFor="show-deleted" className="text-gray-400">Show Deleted</Label>
            <Switch
              id="show-deleted"
              checked={showDeleted}
              onCheckedChange={setShowDeleted}
            />
          </div>
        </div>

        {/* Inquiries List */}
        <div className="space-y-4">
          {filteredInquiries.length === 0 ? (
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">No inquiries found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredInquiries.map((inquiry) => (
              <Card key={inquiry.id} className="bg-gray-800 border-gray-700">
                <CardHeader className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-white text-base md:text-lg">
                        {inquiry.first_name} {inquiry.last_name}
                        {inquiry.company && <span className="text-gray-400 ml-2">• {inquiry.company}</span>}
                      </CardTitle>
                      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mt-2 text-xs md:text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{inquiry.email}</span>
                        </div>
                        {inquiry.phone && (
                          <div className="flex items-center space-x-1">
                            <Phone className="h-4 w-4 flex-shrink-0" />
                            <span>{inquiry.phone}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-1">
                          <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                          <span>{new Date(inquiry.created_at!).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-2 md:items-center">
                      {showDeleted ? (
                        <>
                          <Badge variant="destructive" className="w-fit">DELETED</Badge>
                          <Button
                           variant="outline"
                           size={isMobile ? "default" : "sm"}
                           onClick={() => restoreInquiry(inquiry.id!)}
                           className="text-white border-green-500 hover:bg-green-600 h-11 md:h-9"
                          >
                           <RotateCcw className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                          <Button
                           variant="destructive"
                           size={isMobile ? "default" : "sm"}
                           onClick={() => hardDeleteInquiry(inquiry.id!)}
                           className="h-11 md:h-9"
                          >
                           <Trash2 className="h-4 w-4 mr-2" />
                           Delete Permanently
                          </Button>
                        </>
                      ) : (
                        <>
                          <Badge className={`${getStatusBadgeColor(inquiry.status!)} text-white w-fit`}>
                            {inquiry.status?.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Select
                            value={inquiry.status}
                            onValueChange={(value) => updateStatus(inquiry.id!, value)}
                          >
                            <SelectTrigger className="w-full md:w-36 bg-gray-700 border-gray-600 text-white text-xs h-11 md:h-9">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-800 border-gray-600">
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="converted">Converted</SelectItem>
                              <SelectItem value="closed">Closed</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            variant="destructive"
                            size={isMobile ? "default" : "sm"}
                            onClick={() => deleteInquiry(inquiry.id!)}
                            className="h-11 md:h-9"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-4">
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <Building className="h-4 w-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-400">Service:</span>
                      <span className="text-white truncate">{inquiry.service_interest}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <DollarSign className="h-4 w-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-400">Budget:</span>
                      <span className="text-white">{inquiry.budget_range}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs md:text-sm">
                      <Clock className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-white">{inquiry.project_timeline}</span>
                    </div>
                  </div>
                  <div className="border-t border-gray-700 pt-4">
                    <div className="flex items-start space-x-2">
                      <MessageSquare className="h-4 w-4 text-purple-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <span className="text-gray-400 text-xs md:text-sm">Message:</span>
                        <p className="text-white mt-1 text-sm md:text-base break-words">{inquiry.message}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-4 pt-4 border-t border-gray-700">
                    <span className="text-xs md:text-sm text-gray-400 break-words">
                      Source: {inquiry.source_page} | 
                      Created: {new Date(inquiry.created_at!).toLocaleString()}
                      {showDeleted && inquiry.deleted_at && (
                        <> | Deleted: {new Date(inquiry.deleted_at).toLocaleString()}</>
                      )}
                    </span>
                    <div className="flex flex-col sm:flex-row gap-2 sm:space-x-2">
                      <Button
                        size={isMobile ? "default" : "sm"}
                        className="bg-blue-600 hover:bg-blue-700 h-11 md:h-9"
                        onClick={() => window.open(`mailto:${inquiry.email}`, '_blank')}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      {inquiry.phone && (
                        <Button
                          size={isMobile ? "default" : "sm"}
                          className="bg-green-600 hover:bg-green-700 h-11 md:h-9"
                          onClick={() => window.open(`tel:${inquiry.phone}`, '_blank')}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Call
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CustomerInquiries;
