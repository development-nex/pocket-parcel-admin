import {
  Card,
  Row,
  Col,
  Statistic,
  Progress,
  Avatar,
  Space,
  Typography,
  Tag,
  Button,
} from "antd";
import {
  ShopOutlined,
  CarOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  TruckOutlined,
  DollarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  FireOutlined,
  ThunderboltOutlined,
  SafetyOutlined,
  GlobalOutlined,
  RocketOutlined,
  ArrowRightOutlined,
  ShoppingOutlined,
  ExclamationCircleOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";
import { Link } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useState } from "react";

const { Title, Text } = Typography;

const AdminHomePage = () => {
  const [dashboardData, setDashboardData] = useState({
    kpis: {
      totalWarehouses: 25,
      totalCarriers: 12,
      activeShipments: 342,
      shipmentsToday: 1452,
      pendingActions: 5,
    },
    shipmentStatus: [
      { name: "Delivered", value: 45, color: "#10b981" },
      { name: "In Transit", value: 25, color: "#3b82f6" },
      { name: "Out for Delivery", value: 15, color: "#f59e0b" },
      { name: "Pending", value: 10, color: "#6b7280" },
      { name: "Exception", value: 5, color: "#ef4444" },
    ],
    weeklyVolume: [
      { day: "Mon", shipments: 1200 },
      { day: "Tue", shipments: 1300 },
      { day: "Wed", shipments: 1100 },
      { day: "Thu", shipments: 1450 },
      { day: "Fri", shipments: 1600 },
      { day: "Sat", shipments: 900 },
      { day: "Sun", shipments: 700 },
    ],
    warehousePerformance: [
      { name: "Mumbai Central", utilization: 85, shipments: 450 },
      { name: "Delhi North", utilization: 72, shipments: 380 },
      { name: "Bangalore South", utilization: 90, shipments: 520 },
      { name: "Chennai East", utilization: 68, shipments: 320 },
      { name: "Kolkata West", utilization: 78, shipments: 410 },
    ],
    recentActivity: [
      {
        id: 1,
        time: "12:05 PM",
        action: "Shipment Delivered",
        details: "Shipment #TRK-789123 delivered successfully",
        type: "success",
        icon: <CheckCircleOutlined />,
      },
      {
        id: 2,
        time: "11:48 AM",
        action: "New User Registered",
        details: 'New carrier partner "QuickDeliver" registered',
        type: "info",
        icon: <UserAddOutlined />,
      },
      {
        id: 3,
        time: "11:30 AM",
        action: "Warehouse Alert",
        details: 'Warehouse "Pune Central" at 92% capacity',
        type: "warning",
        icon: <ExclamationCircleOutlined />,
      },
      {
        id: 4,
        time: "10:15 AM",
        action: "Shipment Exception",
        details: "Shipment #TRK-456789 delayed - weather conditions",
        type: "error",
        icon: <ExclamationCircleOutlined />,
      },
      {
        id: 5,
        time: "09:45 AM",
        action: "New Shipment",
        details: "New shipment created #TRK-987654",
        type: "info",
        icon: <ShoppingOutlined />,
      },
    ],
    activeAlerts: [
      {
        id: 1,
        message: 'Warehouse "Mumbai Central" at 95% capacity',
        type: "warning",
      },
      {
        id: 2,
        message: 'Carrier "FastExpress" has 3 delayed shipments today',
        type: "error",
      },
    ],
  });
  return (
    <ResponsiveCard
      title={"Partner Network Overview"}
      subTitle={"Real-time insights into your logistics ecosystem"}
    >
      <div className="flex flex-col gap-4">
        {/* Hero Stats - Large Featured Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <ResponsiveCard className="shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-200 animate-pulse backdrop-blur p-3 rounded-xl">
                    <ShopOutlined className="text-xl " />
                  </div>
                  <div>
                    <div className="text-lg leading-4 font-medium">
                      Partner Warehouses
                    </div>
                    <div className="text-sm">Nationwide Network</div>
                  </div>
                </div>
              </div>

              <div className="  p-2 rounded-xl mx-auto w-fit text-center">
                <div className=" text-3xl font-bold mb-3">47</div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag color="success" className="border-0 text-base px-3 py-1">
                    <RiseOutlined /> +12% this month
                  </Tag>
                  <Tag className="border-0 bg-white/20  text-base px-3 py-1">
                    +5 new partners
                  </Tag>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Active</div>
                  <div className=" text-xl font-bold">42</div>
                  <div className="text-xs mt-1">89.4%</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Pending</div>
                  <div className=" text-xl font-bold">3</div>
                  <div className="text-xs mt-1">6.4%</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Inactive</div>
                  <div className=" text-xl font-bold">2</div>
                  <div className="text-xs mt-1">4.2%</div>
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} lg={12}>
            <ResponsiveCard className="shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="bg-green-200 animate-pulse backdrop-blur p-3 rounded-xl">
                    <CarOutlined className="text-xl " />
                  </div>
                  <div>
                    <div className="text-lg leading-4 font-medium">
                      Carrier Partners
                    </div>
                    <div className="text-sm">Logistics Fleet</div>
                  </div>
                </div>
              </div>

              <div className="p-2 rounded-xl mx-auto w-fit text-center">
                <div className=" text-3xl font-bold mb-3">83</div>
                <div className="flex items-center gap-2 mb-4">
                  <Tag color="success" className="border-0 text-base px-3 py-1">
                    <RiseOutlined /> +8% this month
                  </Tag>
                  <Tag className="border-0 bg-white/20  text-base px-3 py-1">
                    +6 new carriers
                  </Tag>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Active</div>
                  <div className=" text-xl font-bold">76</div>
                  <div className="text-xs mt-1">91.6%</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Pending</div>
                  <div className=" text-xl font-bold">5</div>
                  <div className="text-xs mt-1">6.0%</div>
                </div>
                <div className="bg-gray-100 rounded-xl p-2 text-center">
                  <div className="text-sm mb-1">Inactive</div>
                  <div className=" text-xl font-bold">2</div>
                  <div className="text-xs mt-1">2.4%</div>
                </div>
              </div>
            </ResponsiveCard>
          </Col>
        </Row>
        {/* Charts and Main Content */}
        <Row gutter={[16, 16]}>
          {/* Shipment Status Chart */}
          <Col xs={24} lg={12}>
            <Card
              title="Shipment Status Distribution"
              className="shadow-sm border-0"
              extra={<Tag color="blue">Live</Tag>}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dashboardData.shipmentStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dashboardData.shipmentStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>

          {/* Weekly Volume Chart */}
          <Col xs={24} lg={12}>
            <Card
              title="Weekly Shipment Volume"
              className="shadow-sm border-0"
              extra={<Tag color="green">Last 7 Days</Tag>}
            >
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData.weeklyVolume}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Legend />
                    <Tooltip />
                    <Bar
                      dataKey="shipments"
                      fill="#8884d8"
                      radius={[4, 4, 0, 0]}
                      name="Shipments"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Key Performance Metrics */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all bg-linear-to-br from-emerald-50 to-green-50">
              <div className="flex items-start justify-between mb-4">
                <Avatar
                  size={48}
                  className="bg-linear-to-br from-emerald-400 to-green-500"
                  icon={<TruckOutlined />}
                />
                <Tag color="success" className="border-0">
                  +23%
                </Tag>
              </div>
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Monthly Shipments
                  </span>
                }
                value={15847}
                valueStyle={{
                  color: "#10b981",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all bg-linear-to-br from-amber-50 to-orange-50">
              <div className="flex items-start justify-between mb-4">
                <Avatar
                  size={48}
                  className="bg-linear-to-br from-amber-400 to-orange-500"
                  icon={<DollarOutlined />}
                />
                <Tag color="orange" className="border-0">
                  +18%
                </Tag>
              </div>
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Revenue (Month)
                  </span>
                }
                value={2847500}
                prefix="₹"
                valueStyle={{
                  color: "#f59e0b",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all bg-linear-to-br from-cyan-50 to-blue-50">
              <div className="flex items-start justify-between mb-4">
                <Avatar
                  size={48}
                  className="bg-linear-to-br from-cyan-400 to-blue-500"
                  icon={<TeamOutlined />}
                />
                <Tag color="cyan" className="border-0">
                  +15%
                </Tag>
              </div>
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Total Employees
                  </span>
                }
                value={1245}
                valueStyle={{
                  color: "#06b6d4",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card className="border-0 shadow-md hover:shadow-xl transition-all bg-linear-to-br from-violet-50 to-purple-50">
              <div className="flex items-start justify-between mb-4">
                <Avatar
                  size={48}
                  className="bg-linear-to-br from-violet-400 to-purple-500"
                  icon={<GlobalOutlined />}
                />
                <Tag color="purple" className="border-0">
                  12 Cities
                </Tag>
              </div>
              <Statistic
                title={
                  <span className="text-gray-600 font-medium">
                    Service Coverage
                  </span>
                }
                value={185000}
                suffix="sq.ft"
                valueStyle={{
                  color: "#8b5cf6",
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Operational Metrics */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <FireOutlined className="text-orange-500" />
                  <span className="text-lg font-semibold">
                    Performance Highlights
                  </span>
                </div>
              }
              className="border-0 shadow-md"
            >
              <Row gutter={[16, 24]}>
                <Col xs={24} sm={12}>
                  <div className="text-center p-4 bg-linear-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      94.5%
                    </div>
                    <Text className="text-gray-600 font-medium">
                      On-Time Delivery Rate
                    </Text>
                    <div className="mt-3">
                      <Progress
                        percent={94.5}
                        strokeColor="#3b82f6"
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="text-center p-4 bg-linear-to-br from-emerald-50 to-green-50 rounded-xl">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">
                      97.8%
                    </div>
                    <Text className="text-gray-600 font-medium">
                      Order Accuracy
                    </Text>
                    <div className="mt-3">
                      <Progress
                        percent={97.8}
                        strokeColor="#10b981"
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="text-center p-4 bg-linear-to-br from-amber-50 to-yellow-50 rounded-xl">
                    <div className="text-3xl font-bold text-amber-600 mb-2">
                      4.6<span className="text-xl">/5</span>
                    </div>
                    <Text className="text-gray-600 font-medium">
                      Customer Satisfaction
                    </Text>
                    <div className="mt-3">
                      <Progress
                        percent={92}
                        strokeColor="#f59e0b"
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </Col>
                <Col xs={24} sm={12}>
                  <div className="text-center p-4 bg-linear-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      2.4h
                    </div>
                    <Text className="text-gray-600 font-medium">
                      Avg. Processing Time
                    </Text>
                    <div className="mt-3">
                      <Progress
                        percent={88}
                        strokeColor="#a855f7"
                        strokeWidth={8}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <div className="flex items-center gap-2">
                  <ThunderboltOutlined className="text-yellow-500" />
                  <span className="text-lg font-semibold">Quick Stats</span>
                </div>
              }
              className="border-0 shadow-md h-full"
            >
              <Space direction="vertical" size="large" className="w-full">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircleOutlined className="text-xl text-blue-600" />
                    <div>
                      <div className="text-xl font-bold text-blue-600">118</div>
                      <Text className="text-gray-600">Active Partners</Text>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <SafetyOutlined className="text-xl text-green-600" />
                    <div>
                      <div className="text-xl font-bold text-green-600">
                        99.2%
                      </div>
                      <Text className="text-gray-600">Safety Compliance</Text>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <RocketOutlined className="text-xl text-purple-600" />
                    <div>
                      <div className="text-xl font-bold text-purple-600">
                        847
                      </div>
                      <Text className="text-gray-600">Daily Orders</Text>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <EnvironmentOutlined className="text-xl text-orange-600" />
                    <div>
                      <div className="text-xl font-bold text-orange-600">
                        12
                      </div>
                      <Text className="text-gray-600">Cities Covered</Text>
                    </div>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Bottom CTA Section */}
        <Card className="border-0 shadow-md bg-linear-to-r from-blue-600 to-indigo-600">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="">
              <Title level={4} className="!mb-0">
                Ready to explore detailed analytics?
              </Title>
              <Text className="text-blue-100 text-base">
                View comprehensive reports, partner details, and performance
                metrics
              </Text>
            </div>

            <Link to="/dashboard/domestic/overview">
              <Button
                type="primary"
                className="bg-white text-blue-600 border-0 hover:bg-blue-50"
                icon={<ArrowRightOutlined />}
              >
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </ResponsiveCard>
  );
};

export default AdminHomePage;
