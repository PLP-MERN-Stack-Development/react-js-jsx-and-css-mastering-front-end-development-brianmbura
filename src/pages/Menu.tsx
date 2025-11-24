import { useState, useEffect } from "react";
import { Search, Loader2 } from "lucide-react";
import MenuCard from "@/components/MenuCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Order } from "@/components/OrderCard";

interface MenuItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
}

const Menu = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [orders, setOrders] = useLocalStorage<Order[]>("dinesmart-orders", []);
  const { toast } = useToast();

  const itemsPerPage = 6;

  useEffect(() => {
    fetchMenuItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [items, searchQuery, selectedCategory]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      if (!response.ok) throw new Error("Failed to fetch menu items");
      const data = await response.json();
      
      // Only show electronics
      const menuItems = data
        .filter((item: any) => item.category === "electronics")
        .map((item: any) => ({
          id: item.id,
          title: item.title,
          price: Math.round(item.price * 130), // Convert USD to KES (1 USD ≈ 130 KES)
          image: item.image,
          category: "Electronics",
        }));
      
      setItems(menuItems);
      setError(null);
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchQuery) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  };

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))];

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const handleAddToOrder = (item: { id: number; title: string; price: number }) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      dishName: item.title,
      customerName: "Walk-in Customer",
      status: "pending",
      timestamp: Date.now(),
    };
    setOrders([...orders, newOrder]);
    toast({
      title: "Added to Orders",
      description: `${item.title} has been added to your orders`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-destructive text-xl mb-4">{error}</p>
          <Button onClick={fetchMenuItems}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Our Products
        </h1>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedItems.map((item) => (
            <MenuCard key={item.id} {...item} onAddToOrder={handleAddToOrder} />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <p className="text-center text-muted-foreground text-lg">
            No items found. Try a different search or category.
          </p>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
