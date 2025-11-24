import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";

interface MenuCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  onAddToOrder?: (item: { id: number; title: string; price: number }) => void;
}

const MenuCard = ({ id, title, price, image, category, onAddToOrder }: MenuCardProps) => {
  return (
    <div className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              {category}
            </span>
            <h3 className="text-lg font-semibold text-foreground mt-1 line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">KES {price.toLocaleString()}</span>
          {onAddToOrder && (
            <Button
              size="sm"
              onClick={() => onAddToOrder({ id, title, price })}
              className="gap-2"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
