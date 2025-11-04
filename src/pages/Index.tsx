import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import heroImage from "@/assets/hero-bali-crafts.jpg";
import categoryWood from "@/assets/category-wood.jpg";
import categorySilver from "@/assets/category-silver.jpg";
import categoryTextile from "@/assets/category-textile.jpg";
import artisanWork from "@/assets/artisan-work.jpg";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
  const [formState, setFormState] = useState({ name: "", email: "", purpose: "", body: "" });

  useEffect(() => {
    const getFeaturedProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          image_url,
          category,
          artisans ( name, origin )
        `)
        .eq("is_featured", true)
        .limit(4);

      if (error) {
        console.error("Error fetching featured products:", error);
      } else {
        setFeaturedProducts(data);
      }
    };

    getFeaturedProducts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormState(prevState => ({ ...prevState, purpose: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("messages").insert([formState]);
    if (error) {
      console.error("Error sending message:", error);
    } else {
      // Handle success (e.g., show a success message, clear the form)
      console.log("Message sent successfully:", data);
      setFormState({ name: "", email: "", purpose: "", body: "" });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-lato">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-background shadow-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-playfair font-bold text-foreground">
            BaliCraft
          </h1>
          <div className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Home
            </button>
            <Link to="/collections" className="text-foreground hover:text-accent transition-colors">
              Collections
            </Link>
            <button
              onClick={() => scrollToSection("story")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Our Story
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-foreground hover:text-accent transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 text-center text-background px-4">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
            BaliCraft
          </h1>
          <p className="text-xl md:text-2xl font-playfair mb-8">
            Jiwa Bali, Dituang dalam Karya Tangan
          </p>
          <Button
            variant="cta"
            size="lg"
            className="text-lg"
            onClick={() => scrollToSection("collections")}
          >
            Jelajahi Koleksi Kami
          </Button>
        </div>
      </section>

      {/* Category/Collections Section */}
      <section id="collections" className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-foreground mb-12">
            Koleksi Pilihan Kami
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { img: categoryWood, name: "Ukiran Kayu", category: "wood" },
              { img: categorySilver, name: "Perak & Perhiasan", category: "silver" },
              { img: categoryTextile, name: "Tekstil Tenun", category: "textile" },
            ].map((category) => (
              <Link key={category.name} to={`/collections/${category.category}`}>
                <div className="text-center group cursor-pointer">
                  <div className="relative w-48 h-48 md:w-56 md:h-56 mx-auto mb-6 overflow-hidden rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={category.img}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl md:text-2xl font-playfair font-bold text-foreground">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-foreground mb-12">
            Produk Unggulan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-background rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image_url || undefined}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-playfair font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground italic mb-2">
                    {product.artisans ? `dari ${product.artisans.origin}` : ""}
                  </p>
                  <p className="text-xl font-bold text-accent mb-4">{`IDR ${product.price.toLocaleString("id-ID")}`}</p>
                  <Link to={`/collections/${product.category}`}>
                    <button className="text-accent font-semibold hover:underline flex items-center gap-2">
                      Lihat Detail
                      <span>→</span>
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Artisans Section */}
      <section id="story" className="py-16 md:py-24 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img
                src={artisanWork}
                alt="Balinese artisan at work"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-6">
                Dibuat Sepenuh Hati oleh Seniman Lokal
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Setiap produk BaliCraft adalah karya seni yang diciptakan dengan penuh dedikasi
                  oleh seniman lokal Bali yang terampil. Kami bangga mendukung warisan budaya yang
                  telah diwariskan dari generasi ke generasi.
                </p>
                <p>
                  Dengan memilih BaliCraft, Anda tidak hanya membawa pulang karya seni berkualitas
                  tinggi, tetapi juga turut melestarikan tradisi kerajinan tangan Bali dan
                  mendukung kehidupan para pengrajin lokal.
                </p>
                <p>
                  Setiap karya memiliki cerita uniknya sendiri—dari tangan yang menciptakannya
                  hingga inspirasi di balik setiap detail yang indah.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="py-16 md:py-24 px-4 bg-muted">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-center text-foreground mb-12">
            Temukan Galeri Kami
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-background p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-playfair font-bold text-foreground mb-6">
                Hubungi Kami
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Input placeholder="Nama" name="name" value={formState.name} onChange={handleInputChange} className="bg-background" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" name="email" value={formState.email} onChange={handleInputChange} className="bg-background" />
                </div>
                <div>
                  <Select onValueChange={handleSelectChange} value={formState.purpose}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Pilih tujuan pesan Anda" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Pertanyaan Umum</SelectItem>
                      <SelectItem value="availability">Cek Ketersediaan Produk</SelectItem>
                      <SelectItem value="visit">Jadwalkan Kunjungan Pribadi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Textarea placeholder="Pesan" name="body" value={formState.body} onChange={handleInputChange} rows={5} className="bg-background" />
                </div>
                <Button type="submit" variant="cta" className="w-full">
                  Kirim Pesan
                </Button>
              </form>
            </div>
            <div className="bg-background rounded-lg shadow-md overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63225.33331843335!2d115.2225323671875!3d-8.509175100000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23d735856b365%3A0x33627fa4e427c312!2sUbud%2C%2C%20Gianyar%2C%20Bali!5e0!3m2!1sen!2sid!4v1628583333333!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
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

export default Index;
