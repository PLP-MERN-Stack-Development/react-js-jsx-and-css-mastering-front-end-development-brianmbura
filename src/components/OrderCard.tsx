import { CheckCircle2, Clock, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

export interface Order {
  id: string;
  dishName: string;
  customerName: string;
  status: "pending" | "completed";
  timestamp: number;
}

interface OrderCardProps {
  order: Order;
  onToggleStatus: (id: string) => void;
  onDelete: (id: string) => void;
}

const OrderCard = ({ order, onToggleStatus, onDelete }: OrderCardProps) => {
  const isPending = order.status === "pending";

  return (
    <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            {isPending ? (
              <Clock className="h-5 w-5 text-warning" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-success" />
            )}
            <h3 className="font-semibold text-foreground">{order.dishName}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            <p>Customer: {order.customerName}</p>
            <p className="text-xs mt-1">
              {new Date(order.timestamp).toLocaleString()}
            </p>
          </div>
          <div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                isPending
                  ? "bg-warning/10 text-warning"
                  : "bg-success/10 text-success"
              }`}
            >
              {isPending ? "Pending" : "Completed"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            size="sm"
            variant={isPending ? "default" : "outline"}
            onClick={() => onToggleStatus(order.id)}
          >
            {isPending ? "Complete" : "Reopen"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => onDelete(order.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
