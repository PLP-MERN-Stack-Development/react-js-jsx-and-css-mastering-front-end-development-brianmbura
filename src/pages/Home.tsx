import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Laptop, Shield, Zap, TrendingUp } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Laptop className="h-8 w-8" />,
      title: "Latest Technology",
      description: "Cutting-edge devices and gadgets from top global brands",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Warranty Protection",
      description: "All products backed by manufacturer warranty and support",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "Quick nationwide shipping with secure packaging",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Best Prices",
      description: "Competitive pricing and amazing deals on premium tech",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-hero-start to-hero-end text-primary-foreground">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-3xl animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Power Your Digital Life with HatupoiTech
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90">
              Discover the latest laptops, smartphones, accessories, and tech gadgets.
              Quality products at unbeatable prices, delivered to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Browse Products
                </Button>
              </Link>
              <Link to="/orders">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  My Orders
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-feature">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Shop at HatupoiTech?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We combine quality products with exceptional service to deliver
              the best tech shopping experience in Kenya
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-primary/10 text-primary w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Tech?
          </h2>
          <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
            Browse our extensive collection of laptops, phones, and accessories
          </p>
          <Link to="/menu">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 hover:scale-105 transition-transform"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
