// src/components/tracking/DatePicker.tsx
import { useState } from "react";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const goToNextDay = () => {
    onDateChange(addDays(selectedDate, 1));
  };

  const goToPreviousDay = () => {
    onDateChange(subDays(selectedDate, 1));
  };

  const goToToday = () => {
    onDateChange(new Date());
  };

  const isToday = isSameDay(selectedDate, new Date());

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center gap-2 w-full justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousDay}>
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button variant="outline" className="flex-1 font-medium" onClick={() => setIsCalendarOpen(!isCalendarOpen)}>
          <CalendarIcon className="h-4 w-4 mr-2" />
          {format(selectedDate, "EEEE, d 'de' MMMM", { locale: ptBR })}
        </Button>

        <Button variant="outline" size="icon" onClick={goToNextDay}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {!isToday && (
        <Button variant="link" className="mt-1 text-xs" onClick={goToToday}>
          Ir para hoje
        </Button>
      )}

      {/* TODO: Add full calendar when open */}
    </div>
  );
};

export default DatePicker;
