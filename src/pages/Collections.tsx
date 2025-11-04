import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import { Instagram, Facebook } from "lucide-react";

const Collections = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      let query = supabase.from("products").select(`
        id,
        name,
        price,
        image_url,
        artisans ( name, origin )
      `);

      if (category) {
        query = query.eq("category", category);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error);
      } else {
        setProducts(data);
      }
    };

    getProducts();
  }, [category]);

  const getCategoryTitle = (cat: string | undefined) => {
    switch (cat) {
      case "wood":
        return "Ukiran Kayu";
      case "silver":
        return "Perak & Perhiasan";
      case "textile":
        return "Tekstil Tenun";
      default:
        return "Semua Koleksi";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-background shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-playfair text-3xl font-bold text-foreground">
            BaliCraft
          </h1>
          <div className="hidden md:flex space-x-8 font-lato">
            <Link to="/" className="text-foreground hover:text-accent transition-colors">
              Home
            </Link>
            <Link to="/collections" className="text-accent font-semibold">
              Collections
            </Link>
            <a href="/#our-story" className="text-foreground hover:text-accent transition-colors">
              Our Story
            </a>
            <a href="/#contact" className="text-foreground hover:text-accent transition-colors">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-4">
            {getCategoryTitle(category)}
          </h1>
          <p className="font-lato text-lg text-muted-foreground max-w-2xl mx-auto">
            Karya seni tangan asli dari seniman Bali yang berpengalaman
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/collections">
            <Button variant={!category ? "default" : "outline"} className="font-lato">
              Semua
            </Button>
          </Link>
          <Link to="/collections/wood">
            <Button variant={category === "wood" ? "default" : "outline"} className="font-lato">
              Ukiran Kayu
            </Button>
          </Link>
          <Link to="/collections/silver">
            <Button variant={category === "silver" ? "default" : "outline"} className="font-lato">
              Perak & Perhiasan
            </Button>
          </Link>
          <Link to="/collections/textile">
            <Button variant={category === "textile" ? "default" : "outline"} className="font-lato">
              Tekstil Tenun
            </Button>
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={product.image_url || undefined}
                alt={product.name}
                className="w-full h-64 object-cover"
              />
              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="font-lato text-sm text-muted-foreground mb-2">
                  {product.artisans ? `dari ${product.artisans.origin}` : ""}
                </p>
                <p className="font-lato text-lg font-bold text-accent mb-4">
                  {`IDR ${product.price.toLocaleString("id-ID")}`}
                </p>
                <Button variant="cta" className="w-full">
                  Lihat di Galeri Kami
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-4">Rasakan Kualitasnya Secara Langsung</h2>
          <p className="font-lato text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Tertarik dengan koleksi kami? Kunjungi galeri kami di Ubud untuk merasakan keindahan dan detail setiap karya secara langsung.
          </p>
          <Link to="/#contact">
            <Button variant="cta" size="lg">
              Lihat Peta & Alamat
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-playfair font-bold mb-4">BaliCraft</h2>
          <p className="text-background/80 mb-6 max-w-md mx-auto">
            Jiwa Bali, Dituang dalam Karya Tangan. Temukan keaslian kerajinan tangan Bali di galeri kami.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Instagram size={24} /></a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors"><Facebook size={24} /></a>
          </div>
          <div className="border-t border-background/20 pt-8 text-center text-sm text-background/70">
            <p>© 2024 BaliCraft. All rights reserved.</p>
            <a href="https://github.com/your-github-profile" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors mt-2 inline-block">
              [Lihat Source Code di GitHub]
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Collections;
