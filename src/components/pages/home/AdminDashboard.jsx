import { useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  Row,
  Col,
  Progress,
  Avatar,
  Space,
  Select,
} from "antd";
import {
  ShopOutlined,
  CarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
  RiseOutlined,
  TruckOutlined,
  WarningOutlined,
  FilterOutlined,
  DownloadOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ResponsiveCard from "@/components/ui/cards/ResponsiveCard";

const { Option } = Select;

const AdminDashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [warehouse, setWarehouse] = useState("all");
  // Warehouse Partners Data
  const warehouseData = [
    {
      key: "1",
      name: "Central Warehouse Hub",
      location: "Delhi, NCR",
      capacity: "25,000 sq.ft",
      utilization: 85,
      status: "active",
      performance: 92,
      monthlyOrders: 1240,
      joinDate: "2024-03-15",
    },
    {
      key: "2",
      name: "Southern Storage Solutions",
      location: "Chennai, Tamil Nadu",
      capacity: "18,500 sq.ft",
      utilization: 78,
      status: "active",
      performance: 88,
      monthlyOrders: 890,
      joinDate: "2024-05-20",
    },
    {
      key: "3",
      name: "Western Logistics Hub",
      location: "Mumbai, Maharashtra",
      capacity: "32,000 sq.ft",
      utilization: 92,
      status: "active",
      performance: 95,
      monthlyOrders: 1580,
      joinDate: "2024-02-10",
    },
    {
      key: "4",
      name: "Eastern Distribution Center",
      location: "Kolkata, West Bengal",
      capacity: "15,000 sq.ft",
      utilization: 65,
      status: "active",
      performance: 82,
      monthlyOrders: 650,
      joinDate: "2024-07-08",
    },
    {
      key: "5",
      name: "North India Storage",
      location: "Chandigarh, Punjab",
      capacity: "12,000 sq.ft",
      utilization: 45,
      status: "inactive",
      performance: 58,
      monthlyOrders: 320,
      joinDate: "2024-01-25",
    },
    {
      key: "6",
      name: "Tech City Warehouse",
      location: "Bangalore, Karnataka",
      capacity: "28,000 sq.ft",
      utilization: 88,
      status: "active",
      performance: 94,
      monthlyOrders: 1450,
      joinDate: "2024-04-12",
    },
  ];

  // Carrier Partners Data
  const carrierData = [
    {
      key: "1",
      name: "FastShip Logistics",
      location: "Mumbai, Maharashtra",
      vehicles: 45,
      onTimeRate: 95,
      status: "active",
      monthlyDeliveries: 2340,
      rating: 4.8,
      joinDate: "2024-02-15",
    },
    {
      key: "2",
      name: "Express Delivery Co.",
      location: "Bangalore, Karnataka",
      vehicles: 32,
      onTimeRate: 88,
      status: "pending",
      monthlyDeliveries: 0,
      rating: null,
      joinDate: "2025-10-20",
    },
    {
      key: "3",
      name: "QuickMove Transport",
      location: "Pune, Maharashtra",
      vehicles: 28,
      onTimeRate: 45,
      status: "inactive",
      monthlyDeliveries: 890,
      rating: 3.2,
      joinDate: "2024-09-25",
    },
    {
      key: "4",
      name: "Swift Cargo Services",
      location: "Hyderabad, Telangana",
      vehicles: 52,
      onTimeRate: 92,
      status: "active",
      monthlyDeliveries: 3120,
      rating: 4.6,
      joinDate: "2024-03-08",
    },
    {
      key: "5",
      name: "Metro Logistics Ltd",
      location: "Delhi, NCR",
      vehicles: 68,
      onTimeRate: 96,
      status: "active",
      monthlyDeliveries: 4250,
      rating: 4.9,
      joinDate: "2024-01-20",
    },
  ];

  // Columns with vibrant colors and improved styles
  const warehouseColumns = [
    {
      title: "Partner Name",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text) => (
        <Space>
          <Avatar
            style={{ backgroundColor: "#52c41a", boxShadow: "0 0 6px #52c41a" }}
            icon={<ShopOutlined />}
            size="small"
          />
          <span className="font-semibold text-green-700 hover:text-green-900 cursor-pointer">
            {text}
          </span>
        </Space>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 180,
      render: (text) => <span className="text-sm font-medium">{text}</span>,
    },
    {
      title: "Capacity",
      dataIndex: "capacity",
      key: "capacity",
      width: 130,
      render: (text) => <span className="text-sm font-medium">{text}</span>,
    },
    {
      title: "Utilization",
      dataIndex: "utilization",
      key: "utilization",
      width: 160,
      render: (utilization) => (
        <div className="flex flex-col items-start gap-1">
          <Progress
            percent={utilization}
            size="small"
            strokeColor={
              utilization < 50
                ? "#ff4d4f"
                : utilization < 75
                ? "#faad14"
                : "#52c41a"
            }
            trailColor="#f0f0f0"
            strokeWidth={10}
            style={{ width: 120, borderRadius: 5 }}
          />
          <span className="text-xs text-gray-600 font-semibold">
            {utilization}%
          </span>
        </div>
      ),
    },
    {
      title: "Performance",
      dataIndex: "performance",
      key: "performance",
      width: 130,
      render: (performance) => {
        let color =
          performance >= 90
            ? "text-green-600"
            : performance >= 75
            ? "text-yellow-600"
            : "text-red-600";
        return (
          <span className={`text-sm font-semibold ${color}`}>
            {performance}%
          </span>
        );
      },
    },
    {
      title: "Monthly Orders",
      dataIndex: "monthlyOrders",
      key: "monthlyOrders",
      width: 140,
      render: (orders) => (
        <span className="text-sm font-medium">{orders.toLocaleString()}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status) => {
        const config = {
          active: {
            color: "green",
            icon: <CheckCircleOutlined />,
            text: "Active",
          },
          inactive: {
            color: "red",
            icon: <CloseCircleOutlined />,
            text: "Inactive",
          },
          pending: {
            color: "orange",
            icon: <ClockCircleOutlined />,
            text: "Pending",
          },
        };
        return (
          <Tag
            color={config[status]?.color || "default"}
            icon={config[status]?.icon}
            className="text-sm font-semibold"
          >
            {config[status]?.text || status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      fixed: "right",
      render: () => (
        <Space size="small" className="text-gray-700">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            title="Edit Partner"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            title="Delete Partner"
          />
        </Space>
      ),
    },
  ];

  const carrierColumns = [
    {
      title: "Partner Name",
      dataIndex: "name",
      key: "name",
      width: 220,
      render: (text) => (
        <Space>
          <Avatar
            style={{ backgroundColor: "#1890ff", boxShadow: "0 0 6px #1890ff" }}
            icon={<CarOutlined />}
            size="small"
          />
          <span className="font-semibold  text-blue-700 hover:text-blue-900 cursor-pointer">
            {text}
          </span>
        </Space>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      width: 180,
      render: (text) => <span className="font-medium text-sm">{text}</span>,
    },
    {
      title: "Vehicles",
      dataIndex: "vehicles",
      key: "vehicles",
      width: 110,
      render: (vehicles) => (
        <span className="font-medium text-sm">{vehicles}</span>
      ),
    },
    {
      title: "On-Time Rate",
      dataIndex: "onTimeRate",
      key: "onTimeRate",
      width: 160,
      render: (rate) => (
        <div className="flex flex-col items-start gap-1">
          <Progress
            percent={rate}
            size="small"
            strokeColor={rate < 70 ? "#ff4d4f" : "#1890ff"}
            trailColor="#f0f0f0"
            strokeWidth={10}
            style={{ width: 120, borderRadius: 5 }}
          />
          <span className="text-xs text-gray-600 font-semibold">{rate}%</span>
        </div>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      width: 110,
      render: (rating) =>
        rating ? (
          <span className="text-yellow-600 font-semibold text-sm">
            {rating}/5.0
          </span>
        ) : (
          <span className="text-gray-400 text-xs italic">N/A</span>
        ),
    },
    {
      title: "Monthly Deliveries",
      dataIndex: "monthlyDeliveries",
      key: "monthlyDeliveries",
      width: 150,
      render: (deliveries) => (
        <span className="font-medium text-sm">
          {deliveries.toLocaleString()}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 110,
      render: (status) => {
        const config = {
          active: {
            color: "green",
            icon: <CheckCircleOutlined />,
            text: "Active",
          },
          inactive: {
            color: "red",
            icon: <CloseCircleOutlined />,
            text: "Inactive",
          },
          pending: {
            color: "orange",
            icon: <ClockCircleOutlined />,
            text: "Pending",
          },
        };
        return (
          <Tag
            color={config[status]?.color}
            icon={config[status]?.icon}
            className="text-sm font-semibold"
          >
            {config[status]?.text || status}
          </Tag>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 130,
      fixed: "right",
      render: () => (
        <Space size="small" className="text-gray-700">
          <Button
            type="text"
            icon={<EyeOutlined />}
            size="small"
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            size="small"
            title="Edit Partner"
          />
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            size="small"
            title="Delete Partner"
          />
        </Space>
      ),
    },
  ];

  return (
    <ResponsiveCard
      title={
        <div className="my-3">
          <h1 className="text-xl font-extrabold text-indigo-900 leading-tight">
            Dashboard
          </h1>
          <small className=" text-gray-600 ">
            Comprehensive view of all partner operations with real-time insights
          </small>
        </div>
      }
      extra={
        <Space>
          <Select
            defaultValue="all"
            value={warehouse}
            onChange={(value) => setWarehouse(value)}
            size="middle"
            style={{ width: 150 }}
            options={[
              { value: "all", label: "All" },
              {
                value: "Central Warehouse Hub",
                label: "Central Warehouse Hub",
              },
              {
                value: "Southern Storage Solutions",
                label: "Southern Storage Solutions",
              },
            ]}
          />
          <Button
            icon={<ReloadOutlined />}
            size="middle"
            className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
            type="primary"
            shape="round"
          >
            Refresh
          </Button>
          <Button
            icon={<DownloadOutlined />}
            size="middle"
            className="bg-green-600 hover:bg-green-700 text-white shadow-md"
            type="primary"
            shape="round"
          >
            Export Report
          </Button>
        </Space>
      }
      className=""
    >
      <div className="flex flex-col gap-6">
        {/* Summary Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <ResponsiveCard
              hoverable
              className="relative overflow-hidden shadow-md h-full  transition-all duration-300 border-0"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl shadow-sm">
                    <ShopOutlined className="text-3xl text-green-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-green-100 rounded-full">
                    <RiseOutlined className="text-green-600 text-xs" />
                    <span className="text-xs font-bold text-green-700">
                      +12%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                    Warehouse Partners
                  </p>
                  <p className="text-3xl font-bold text-green-800">47</p>
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <ResponsiveCard
              hoverable
              className="relative overflow-hidden shadow-md h-full bg-linear-to-br from-blue-50 to-cyan-50  transition-all duration-300 border-0"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl shadow-sm">
                    <CarOutlined className="text-3xl text-blue-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-blue-100 rounded-full">
                    <RiseOutlined className="text-blue-600 text-xs" />
                    <span className="text-xs font-bold text-blue-700">+8%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wider">
                    Carrier Partners
                  </p>
                  <p className="text-3xl font-bold text-blue-800">83</p>
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <ResponsiveCard
              hoverable
              className="relative overflow-hidden shadow-md h-full  transition-all duration-300 border-0"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-xl shadow-sm">
                    <TruckOutlined className="text-3xl text-orange-600" />
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-orange-100 rounded-full">
                    <RiseOutlined className="text-orange-600 text-xs" />
                    <span className="text-xs font-bold text-orange-700">
                      +23%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wider">
                    Monthly Shipments
                  </p>
                  <p className="text-3xl font-bold text-orange-800">15,847</p>
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <ResponsiveCard
              hoverable
              className="relative overflow-hidden shadow-md h-full transition-all duration-300 border-0"
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl shadow-sm">
                    <span className="text-2xl font-bold text-purple-600">
                      ₹
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-full">
                    <RiseOutlined className="text-purple-600 text-xs" />
                    <span className="text-xs font-bold text-purple-700">
                      +18%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wider">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-purple-800">28.5L</p>
                </div>
              </div>
            </ResponsiveCard>
          </Col>
        </Row>

        {/* Performance Overview Cards */}
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={8}>
            <ResponsiveCard
              className="shadow-lg h-full  bg-white hover:shadow-md transition-shadow duration-300"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-linear-to-b from-green-400 to-green-600 rounded-full" />
                  <span className="font-bold text-gray-800">
                    Capacity Utilization
                  </span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">
                      Total Capacity
                    </span>
                    <span className="text-lg font-bold text-green-700">
                      185,000 sq.ft
                    </span>
                  </div>
                  <Progress
                    percent={73}
                    strokeColor={{
                      from: "#52c41a",
                      to: "#73d13d",
                    }}
                    trailColor="#f0f0f0"
                    strokeWidth={16}
                    strokeLinecap="round"
                    className="mb-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl ">
                    <p className="text-xs text-gray-600 mb-1">Occupied</p>
                    <p className="text-xl font-bold text-green-700">135,050</p>
                    <p className="text-xs text-gray-500">sq.ft</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl ">
                    <p className="text-xs text-gray-600 mb-1">Available</p>
                    <p className="text-xl font-bold text-gray-700">49,950</p>
                    <p className="text-xs text-gray-500">sq.ft</p>
                  </div>
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} lg={8}>
            <ResponsiveCard
              className="shadow-lg h-full bg-white hover:shadow-md transition-shadow duration-300"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-linear-to-b from-blue-400 to-blue-600 rounded-full" />
                  <span className=" font-bold text-gray-800">
                    Performance Metrics
                  </span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="bg-linear-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">
                      On-Time Delivery
                    </span>
                    <span className="text-2xl font-bold text-blue-700">
                      94.5%
                    </span>
                  </div>
                  <Progress
                    percent={94.5}
                    strokeColor={{
                      from: "#1890ff",
                      to: "#40a9ff",
                    }}
                    trailColor="#f0f0f0"
                    strokeWidth={16}
                    strokeLinecap="round"
                  />
                </div>

                <div className="bg-linear-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-gray-700">
                      Order Accuracy
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      97.8%
                    </span>
                  </div>
                  <Progress
                    percent={97.8}
                    strokeColor={{
                      from: "#52c41a",
                      to: "#73d13d",
                    }}
                    trailColor="#f0f0f0"
                    strokeWidth={16}
                    strokeLinecap="round"
                  />
                </div>
              </div>
            </ResponsiveCard>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              className="shadow-lg  bg-white hover:shadow-md transition-shadow duration-300"
              title={
                <div className="flex items-center gap-3">
                  <div className="w-1 h-6 bg-linear-to-b from-purple-400 to-purple-600 rounded-full" />
                  <span className=" font-bold text-gray-800">
                    Alerts & Status
                  </span>
                </div>
              }
            >
              <Space direction="vertical" size="small" className="w-full">
                <div className="group relative overflow-hidden bg-linear-to-r from-red-50 to-pink-50 p-4 rounded-xl border-l-4 border-red-500 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <WarningOutlined className="text-red-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-red-800">
                        2 Performance Alerts
                      </p>
                      <p className="text-xs text-red-600">Requires attention</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-linear-to-r from-yellow-50 to-amber-50 p-4 rounded-xl border-l-4 border-yellow-500 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-yellow-100 rounded-full">
                      <ClockCircleOutlined className="text-yellow-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-yellow-800">
                        4 Pending Approvals
                      </p>
                      <p className="text-xs text-yellow-600">Action needed</p>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden bg-linear-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-l-4 border-blue-500 hover:shadow-md transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <CheckCircleOutlined className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-blue-800">
                        118 Active Partners
                      </p>
                      <p className="text-xs text-blue-600">
                        Operating normally
                      </p>
                    </div>
                  </div>
                </div>
              </Space>
            </Card>
          </Col>
        </Row>

        {/* Warehouse Partners Table */}
        <ResponsiveCard
          size="small"
          title={
            <span className="text-sm font-semibold text-gray-800">
              Warehouse Partners
            </span>
          }
          extra={
            <Space size="small">
              <Select
                placeholder="Filter by status"
                size="small"
                style={{ width: 140 }}
                onChange={setSelectedFilter}
                className="text-xs"
                allowClear
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
              <Button
                icon={<FilterOutlined />}
                size="small"
                className="text-xs"
              >
                More Filters
              </Button>
            </Space>
          }
          className="mb-6 h-full shadow-lg rounded-lg border border-gray-200"
        >
          <Table
            columns={warehouseColumns}
            dataSource={warehouseData.filter(
              (item) =>
                selectedFilter === "all" || item.status === selectedFilter
            )}
            pagination={{ pageSize: 5, size: "small" }}
            scroll={{ x: 1200 }}
            size="small"
            rowClassName={(record) =>
              record.status === "inactive"
                ? "bg-red-50"
                : record.status === "pending"
                ? "bg-yellow-50"
                : "bg-white"
            }
          />
        </ResponsiveCard>

        {/* Carrier Partners Table */}
        <ResponsiveCard
          size="small"
          title={
            <span className="text-sm font-semibold text-gray-800">
              Carrier Partners
            </span>
          }
          extra={
            <Space size="small">
              <Select
                placeholder="Filter by status"
                size="small"
                style={{ width: 140 }}
                onChange={setSelectedFilter}
                className="text-xs"
                allowClear
              >
                <Option value="all">All Status</Option>
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="pending">Pending</Option>
              </Select>
              <Button
                icon={<FilterOutlined />}
                size="small"
                className="text-xs"
              >
                More Filters
              </Button>
            </Space>
          }
          className="shadow-lg rounded-lg border border-gray-200"
        >
          <Table
            columns={carrierColumns}
            dataSource={carrierData.filter(
              (item) =>
                selectedFilter === "all" || item.status === selectedFilter
            )}
            pagination={{ pageSize: 5, size: "small" }}
            scroll={{ x: 1200 }}
            size="small"
            rowClassName={(record) =>
              record.status === "inactive"
                ? "bg-red-50"
                : record.status === "pending"
                ? "bg-yellow-50"
                : "bg-white"
            }
          />
        </ResponsiveCard>
      </div>
    </ResponsiveCard>
  );
};

export default AdminDashboard;
