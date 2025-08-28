
import * as React from 'react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfToday, endOfToday, startOfDay, endOfDay } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined;
  onDateChange: (date: DateRange | undefined) => void;
}

export function DateRangePicker({ className, date, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handlePresetChange = (value: string) => {
    const now = new Date();
    let from: Date | undefined;
    let to: Date | undefined;

    switch (value) {
      case 'today':
        from = startOfToday();
        to = endOfToday();
        break;
      case 'this_week':
        from = startOfWeek(now);
        to = endOfWeek(now);
        break;
      case 'this_month':
        from = startOfMonth(now);
        to = endOfMonth(now);
        break;
      case 'last_7_days':
        from = startOfDay(addDays(now, -6));
        to = endOfDay(now);
        break;
      case 'last_30_days':
        from = startOfDay(addDays(now, -29));
        to = endOfDay(now);
        break;
      default:
        onDateChange(undefined);
        setIsOpen(false);
        return;
    }
    onDateChange({ from, to });
    setIsOpen(false);
  };
  
  return (
    <div className={cn('grid gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              'w-[270px] justify-start text-left font-normal border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white',
              !date && 'text-gray-400'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white" align="start">
          <div className="flex">
            <div className="p-2 border-r border-gray-700">
                <div className="flex flex-col space-y-1">
                    <Button variant="ghost" className="justify-start w-full text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => handlePresetChange('today')}>Today</Button>
                    <Button variant="ghost" className="justify-start w-full text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => handlePresetChange('this_week')}>This Week</Button>
                    <Button variant="ghost" className="justify-start w-full text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => handlePresetChange('this_month')}>This Month</Button>
                    <Button variant="ghost" className="justify-start w-full text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => handlePresetChange('last_7_days')}>Last 7 days</Button>
                    <Button variant="ghost" className="justify-start w-full text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => handlePresetChange('last_30_days')}>Last 30 days</Button>
                </div>
            </div>
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={onDateChange}
              numberOfMonths={2}
              classNames={{
                day_selected: "bg-cyan-500 text-white hover:bg-cyan-600 focus:bg-cyan-600",
                day_today: "bg-gray-700 text-white",
                day: "text-gray-300 hover:bg-gray-700 hover:text-white",
                day_range_start: "bg-cyan-500 text-white",
                day_range_end: "bg-cyan-500 text-white",
                caption: "text-white",
                caption_label: "text-white",
                nav_button: "text-gray-300 hover:bg-gray-700 hover:text-white",
                nav_button_previous: "text-gray-300 hover:bg-gray-700 hover:text-white",
                nav_button_next: "text-gray-300 hover:bg-gray-700 hover:text-white",
                head_cell: "text-gray-400",
                head_row: "border-gray-700",
                row: "border-gray-700",
                cell: "text-gray-300",
              }}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
