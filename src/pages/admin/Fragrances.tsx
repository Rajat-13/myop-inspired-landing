import { useState } from "react";
import { Search, Plus, Edit, Trash2, Eye, X, Upload, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { allProducts, categories, genderOptions, Product } from "@/data/products";

const Fragrances = () => {
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    slug: "",
    price: 0,
    originalPrice: undefined,
    image: "",
    images: [],
    tag: "",
    gender: "unisex",
    category: "floral",
    notes: { top: [], middle: [], base: [] },
    description: "",
    occasion: "",
    concentration: { sillage: 50, projection: 50, longevity: 50 },
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    const matchesGender = genderFilter === "all" || product.gender === genderFilter;
    return matchesSearch && matchesCategory && matchesGender;
  });

  const handleCreateNew = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      price: 0,
      originalPrice: undefined,
      image: "",
      images: [],
      tag: "",
      gender: "unisex",
      category: "floral",
      notes: { top: [], middle: [], base: [] },
      description: "",
      occasion: "",
      concentration: { sillage: 50, projection: 50, longevity: 50 },
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsDialogOpen(true);
  };

  const handleView = (product: Product) => {
    setViewingProduct(product);
    setIsViewDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm("Are you sure you want to delete this fragrance?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleSave = () => {
    if (editingProduct) {
      // Update existing
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...formData } as Product : p
        )
      );
    } else {
      // Create new
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
        slug: formData.name?.toLowerCase().replace(/\s+/g, "-") || "",
        images: formData.image ? [formData.image] : [],
      } as Product;
      setProducts([...products, newProduct]);
    }
    setIsDialogOpen(false);
  };

  const handleNotesChange = (type: "top" | "middle" | "base", value: string) => {
    setFormData({
      ...formData,
      notes: {
        ...formData.notes!,
        [type]: value.split(",").map((s) => s.trim()).filter(Boolean),
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-charcoal">Fragrances</h1>
          <p className="text-muted-foreground">Manage all your perfume products</p>
        </div>
        <Button onClick={handleCreateNew} className="gap-2">
          <Plus className="w-4 h-4" />
          Add New Fragrance
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search fragrances..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={genderFilter} onValueChange={setGenderFilter}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            {genderOptions.map((g) => (
              <SelectItem key={g.id} value={g.id}>
                {g.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Product</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Category</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Gender</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Price</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Tag</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-charcoal">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="capitalize text-sm">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <Badge variant="outline" className="capitalize">
                      {product.gender.replace("-", " ")}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="font-medium">₹{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          ₹{product.originalPrice}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    {product.tag && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        {product.tag}
                      </Badge>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(product)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="View"
                      >
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="p-8 text-center text-muted-foreground">
            No fragrances found matching your filters.
          </div>
        )}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? "Edit Fragrance" : "Add New Fragrance"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Fragrance name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={formData.slug || ""}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="fragrance-slug"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price (₹)</label>
                <Input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Original Price (₹)</label>
                <Input
                  type="number"
                  value={formData.originalPrice || ""}
                  onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value ? Number(e.target.value) : undefined })}
                  placeholder="Optional"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Tag</label>
                <Select
                  value={formData.tag || "none"}
                  onValueChange={(v) => setFormData({ ...formData, tag: v === "none" ? undefined : v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No Tag</SelectItem>
                    <SelectItem value="Bestseller">Bestseller</SelectItem>
                    <SelectItem value="Sale">Sale</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="New">New</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select
                  value={formData.category || "floral"}
                  onValueChange={(v) => setFormData({ ...formData, category: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Gender</label>
                <Select
                  value={formData.gender || "unisex"}
                  onValueChange={(v) => setFormData({ ...formData, gender: v as any })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genderOptions.map((g) => (
                      <SelectItem key={g.id} value={g.id}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Image URL</label>
              <Input
                value={formData.image || ""}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Fragrance description..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Occasion</label>
              <Input
                value={formData.occasion || ""}
                onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                placeholder="e.g., Evening, Daily Wear"
              />
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Fragrance Notes</h4>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Top Notes (comma separated)</label>
                  <Input
                    value={formData.notes?.top?.join(", ") || ""}
                    onChange={(e) => handleNotesChange("top", e.target.value)}
                    placeholder="Rose, Jasmine, Bergamot"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Middle Notes (comma separated)</label>
                  <Input
                    value={formData.notes?.middle?.join(", ") || ""}
                    onChange={(e) => handleNotesChange("middle", e.target.value)}
                    placeholder="Peony, Lily, Violet"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Base Notes (comma separated)</label>
                  <Input
                    value={formData.notes?.base?.join(", ") || ""}
                    onChange={(e) => handleNotesChange("base", e.target.value)}
                    placeholder="Musk, Cedar, Vanilla"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Concentration Levels</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sillage (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.concentration?.sillage || 50}
                    onChange={(e) => setFormData({
                      ...formData,
                      concentration: { ...formData.concentration!, sillage: Number(e.target.value) }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Projection (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.concentration?.projection || 50}
                    onChange={(e) => setFormData({
                      ...formData,
                      concentration: { ...formData.concentration!, projection: Number(e.target.value) }
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Longevity (%)</label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.concentration?.longevity || 50}
                    onChange={(e) => setFormData({
                      ...formData,
                      concentration: { ...formData.concentration!, longevity: Number(e.target.value) }
                    })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                {editingProduct ? "Update" : "Create"} Fragrance
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Fragrance Details</DialogTitle>
          </DialogHeader>

          {viewingProduct && (
            <div className="grid gap-6 py-4">
              <div className="flex gap-6">
                <img
                  src={viewingProduct.image}
                  alt={viewingProduct.name}
                  className="w-32 h-32 rounded-lg object-cover"
                />
                <div>
                  <h3 className="text-xl font-serif font-semibold">{viewingProduct.name}</h3>
                  <p className="text-muted-foreground mb-2">{viewingProduct.slug}</p>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="capitalize">
                      {viewingProduct.category}
                    </Badge>
                    <Badge variant="outline" className="capitalize">
                      {viewingProduct.gender.replace("-", " ")}
                    </Badge>
                    {viewingProduct.tag && (
                      <Badge className="bg-primary/10 text-primary">
                        {viewingProduct.tag}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-muted-foreground">{viewingProduct.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Pricing</h4>
                  <p className="text-lg font-semibold">₹{viewingProduct.price}</p>
                  {viewingProduct.originalPrice && (
                    <p className="text-muted-foreground line-through">
                      ₹{viewingProduct.originalPrice}
                    </p>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-2">Occasion</h4>
                  <p className="text-muted-foreground">{viewingProduct.occasion}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Fragrance Notes</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Top Notes</p>
                    <p className="text-sm text-muted-foreground">
                      {viewingProduct.notes.top.join(", ")}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Middle Notes</p>
                    <p className="text-sm text-muted-foreground">
                      {viewingProduct.notes.middle.join(", ")}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-lg">
                    <p className="text-sm font-medium mb-1">Base Notes</p>
                    <p className="text-sm text-muted-foreground">
                      {viewingProduct.notes.base.join(", ")}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Concentration</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Sillage</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${viewingProduct.concentration.sillage}%` }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1">{viewingProduct.concentration.sillage}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Projection</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${viewingProduct.concentration.projection}%` }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1">{viewingProduct.concentration.projection}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Longevity</p>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${viewingProduct.concentration.longevity}%` }}
                      />
                    </div>
                    <p className="text-xs text-right mt-1">{viewingProduct.concentration.longevity}%</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Fragrances;