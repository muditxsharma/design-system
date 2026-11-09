import * as Chart from '@inverse_ratio/design-system/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
export default function ChartStudy() {
  return (
    <Chart.ChartContainer
      className="h-56 w-full"
      config={{ studies: { label: 'Studies', color: 'var(--signal)' } }}
    >
      <BarChart
        accessibilityLayer
        data={[
          { day: 'Mon', studies: 8 },
          { day: 'Tue', studies: 12 },
          { day: 'Wed', studies: 18 },
          { day: 'Thu', studies: 14 },
          { day: 'Fri', studies: 22 },
        ]}
      >
        <CartesianGrid vertical={false} />
        <XAxis dataKey="day" tickLine={false} axisLine={false} />
        <Chart.ChartTooltip content={<Chart.ChartTooltipContent />} />
        <Bar dataKey="studies" fill="var(--color-studies)" radius={0} />
      </BarChart>
    </Chart.ChartContainer>
  );
}
