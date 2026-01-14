import { useRef } from "react";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { allProducts } from "@/data/products";

const PERFUME_VIDEO_URL = "/videos/perfume-video.mp4";

const shoppableVideos = [
  {
    videoUrl: PERFUME_VIDEO_URL,
    product: allProducts[0],
  },
  {
    videoUrl: PERFUME_VIDEO_URL,
    product: allProducts[1],
  },
  {
    videoUrl: PERFUME_VIDEO_URL,
    product: allProducts[2],
  },
  {
    videoUrl: PERFUME_VIDEO_URL,
    product: allProducts[3],
  },
  {
    videoUrl: PERFUME_VIDEO_URL,
    product: allProducts[4],
  },
];

const ShoppableVideos = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { addItem, setIsCartOpen } = useCart();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (product: typeof allProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      size: "50ml",
      price: product.price,
      quantity: 1,
      image: product.image,
    });
    setIsCartOpen(true);
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-section font-bold">
            Shoppable <em className="highlighted-text not-italic">Videos</em>
          </h2>
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 border border-charcoal/20 rounded-full hover:bg-charcoal hover:text-cream transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Videos Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {shoppableVideos.map((item, index) => (
            <div key={index} className="flex-shrink-0 w-[260px] group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted">
                <video
                  src={item.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
                
                {/* Product Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-charcoal/80 to-transparent">
                  <div className="flex items-end justify-between">
                    <Link to={`/products/${item.product.slug}`} className="flex-1">
                      <h3 className="font-serif text-sm font-medium text-white">
                        {item.product.name}
                      </h3>
                      <p className="text-white/80 text-xs">
                        ₹{item.product.price.toLocaleString()}
                      </p>
                    </Link>
                    <button
                      onClick={() => handleAddToCart(item.product)}
                      className="w-8 h-8 flex items-center justify-center bg-white rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShoppableVideos;
