import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { allProducts } from "@/data/products";

const WinterPicksSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const winterPicks = allProducts.slice(0, 6);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="section-padding bg-cream">
      <div className="container-wide">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-section font-bold">
            Explore Our <em className="highlighted-text not-italic">Winter Picks</em>
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

        {/* Products Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {winterPicks.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[260px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WinterPicksSection;
