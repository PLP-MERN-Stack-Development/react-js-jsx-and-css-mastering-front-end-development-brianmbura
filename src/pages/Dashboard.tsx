import { useEffect, useState } from "react";
import { TrendingUp, ShoppingBag, CheckCircle2, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Order } from "@/components/OrderCard";

const Dashboard = () => {
  const [orders] = useLocalStorage<Order[]>("hatupoitech-orders", []);
  const [menuItemsCount, setMenuItemsCount] = useState(0);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setMenuItemsCount(data.length))
      .catch(() => setMenuItemsCount(0));
  }, []);

  const stats = {
    totalMenuItems: menuItemsCount,
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    completedOrders: orders.filter((o) => o.status === "completed").length,
  };

  const completionRate =
    stats.totalOrders > 0
      ? ((stats.completedOrders / stats.totalOrders) * 100).toFixed(1)
      : "0";

  const recentOrders = orders.slice(-5).reverse();

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-primary to-accent text-primary-foreground rounded-xl p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="h-8 w-8" />
              <TrendingUp className="h-5 w-5 opacity-75" />
            </div>
            <p className="text-sm opacity-90 mb-1">Total Products</p>
            <p className="text-3xl font-bold">{stats.totalMenuItems}</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-primary/10 text-primary p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalOrders}</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-warning/10 text-warning p-2 rounded-lg">
                <Clock className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
            <p className="text-3xl font-bold text-foreground">{stats.pendingOrders}</p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-success/10 text-success p-2 rounded-lg">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-1">Completed Orders</p>
            <p className="text-3xl font-bold text-foreground">{stats.completedOrders}</p>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {/* Completion Chart */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Order Completion Rate</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Completed</span>
                  <span className="text-sm font-medium text-foreground">
                    {stats.completedOrders} ({completionRate}%)
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-success transition-all duration-500"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Pending</span>
                  <span className="text-sm font-medium text-foreground">
                    {stats.pendingOrders} ({(100 - parseFloat(completionRate)).toFixed(1)}%)
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-warning transition-all duration-500"
                    style={{ width: `${100 - parseFloat(completionRate)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Orders</h2>
            <div className="space-y-3">
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No orders yet</p>
              ) : (
                recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                  >
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{order.dishName}</p>
                    <p className="text-xs text-muted-foreground">{order.customerName}</p>
                  </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "completed"
                          ? "bg-success/10 text-success"
                          : "bg-warning/10 text-warning"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-4">Shop Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur">
              <p className="text-sm opacity-90 mb-1">Average Order Value</p>
              <p className="text-2xl font-bold">
                KES {stats.totalOrders > 0 ? ((stats.totalOrders * 15000) / stats.totalOrders).toLocaleString() : "0"}
              </p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur">
              <p className="text-sm opacity-90 mb-1">Success Rate</p>
              <p className="text-2xl font-bold">{completionRate}%</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-lg p-4 backdrop-blur">
              <p className="text-sm opacity-90 mb-1">Active Orders</p>
              <p className="text-2xl font-bold">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
