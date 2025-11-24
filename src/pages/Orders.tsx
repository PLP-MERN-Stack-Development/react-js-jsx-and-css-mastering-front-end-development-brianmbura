import { useState } from "react";
import { Plus } from "lucide-react";
import OrderCard, { Order } from "@/components/OrderCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";

const Orders = () => {
  const [orders, setOrders] = useLocalStorage<Order[]>("hatupoitech-orders", []);
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [dishName, setDishName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleAddOrder = () => {
    if (!dishName.trim() || !tableNumber) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      dishName: dishName.trim(),
      customerName: tableNumber,
      status: "pending",
      timestamp: Date.now(),
    };

    setOrders([...orders, newOrder]);
    setDishName("");
    setTableNumber("");
    setDialogOpen(false);
    
    toast({
      title: "Order Added",
      description: `Order for ${dishName} has been created`,
    });
  };

  const handleToggleStatus = (id: string) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? {
              ...order,
              status: order.status === "pending" ? "completed" : "pending",
            }
          : order
      )
    );
    toast({
      title: "Status Updated",
      description: "Order status has been changed",
    });
  };

  const handleDeleteOrder = (id: string) => {
    setOrders(orders.filter((order) => order.id !== id));
    toast({
      title: "Order Deleted",
      description: "Order has been removed",
    });
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold text-foreground">Order Manager</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-5 w-5" />
                Add Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Add a new customer order to the system
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="dishName">Product Name</Label>
                  <Input
                    id="dishName"
                    placeholder="Enter product name"
                    value={dishName}
                    onChange={(e) => setDishName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tableNumber">Customer Name</Label>
                  <Input
                    id="tableNumber"
                    type="text"
                    placeholder="Enter customer name"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddOrder}>Create Order</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-foreground">{stats.total}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm mb-1">Pending</p>
            <p className="text-3xl font-bold text-warning">{stats.pending}</p>
          </div>
          <div className="bg-card rounded-lg border border-border p-6">
            <p className="text-muted-foreground text-sm mb-1">Completed</p>
            <p className="text-3xl font-bold text-success">{stats.completed}</p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Orders
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed
          </Button>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-lg border border-border">
              <p className="text-muted-foreground text-lg">
                No orders found. Add your first order to get started!
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onToggleStatus={handleToggleStatus}
                onDelete={handleDeleteOrder}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
