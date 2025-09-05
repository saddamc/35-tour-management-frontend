import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAllToursQuery } from "@/redux/features/auth/Tour/tour.api";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Mock data for demo purposes
const mockBookingsOverTime = [
  { month: 'Jan', bookings: 400 },
  { month: 'Feb', bookings: 300 },
  { month: 'Mar', bookings: 500 },
  { month: 'Apr', bookings: 280 },
  { month: 'May', bookings: 590 },
  { month: 'Jun', bookings: 320 },
];

const mockTourTypeData = [
  { name: 'Adventure', value: 400 },
  { name: 'Culture', value: 300 },
  { name: 'Beach', value: 300 },
  { name: 'Mountain', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Bookings = () => {
  const { data: toursData, isLoading, error } = useGetAllToursQuery({});
  const totalTours = toursData?.length || 0;
  const totalBookings = 120; // Mock
  const totalRevenue = 15000; // Mock

  if (isLoading) return <div>Loading analytics...</div>;
  if (error) return <div>Error loading analytics</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTours}</div>
            <p className="text-xs text-muted-foreground">
              Active tour packages
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Bar Chart for Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bookings</CardTitle>
            <CardDescription>Bookings over the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockBookingsOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart for Tour Types */}
        <Card>
          <CardHeader>
            <CardTitle>Tour Types Distribution</CardTitle>
            <CardDescription>Popular categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={mockTourTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {mockTourTypeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bookings;