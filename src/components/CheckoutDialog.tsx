import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, User, ChevronRight, X } from "lucide-react";

type Step = "address" | "payment";

const CheckoutDialog = () => {
  const { items, total, isCheckoutOpen, setIsCheckoutOpen } = useCart();
  const [step, setStep] = useState<Step>("address");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    country: "India",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = () => {
    if (step === "address") {
      setStep("payment");
    } else {
      // Handle payment submission
      console.log("Order placed:", { items, formData });
      setIsCheckoutOpen(false);
    }
  };

  const handleBack = () => {
    if (step === "payment") {
      setStep("address");
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep("address");
  };

  return (
    <Dialog open={isCheckoutOpen} onOpenChange={handleClose}>
      <DialogContent className="p-0 gap-0 max-w-lg max-h-[90vh] overflow-hidden border-0">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-white sticky top-0 z-10">
          <div className="flex items-center gap-4">
            {/* Logo */}
            <div className="bg-charcoal text-white font-bold text-xs px-2 py-1">
              <span className="block leading-tight">RI</span>
              <span className="block leading-tight">MÉ</span>
            </div>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => setStep("address")}
              className={`${step === "address" ? "text-charcoal font-medium" : "text-muted-foreground"}`}
            >
              Address
            </button>
            <span className="text-muted-foreground">»</span>
            <span
              className={`${step === "payment" ? "text-charcoal font-medium" : "text-muted-foreground"}`}
            >
              Payments
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === "address" && (
              <div className="space-y-6">
                {/* Contact Details */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-charcoal">Contact Details</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex mt-1">
                        <div className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">
                          <span className="text-sm">🇮🇳 +91</span>
                        </div>
                        <Input
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange(
                              "phone",
                              e.target.value.replace(/\D/g, "").slice(0, 10)
                            )
                          }
                          placeholder="Enter phone number"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email"
                        className="mt-1"
                      />
                      {formData.email && !formData.email.includes("@") && (
                        <p className="text-red-500 text-xs mt-1">
                          Please enter a valid email address
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => handleInputChange("country", value)}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="UK">United Kingdom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        House No., Building, Street <span className="text-red-500">*</span>
                      </label>
                      <Textarea
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Enter your complete address"
                        className="mt-1 resize-none"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase">
                          City <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="City"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground uppercase">
                          State <span className="text-red-500">*</span>
                        </label>
                        <Input
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          placeholder="State"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <Input
                        value={formData.pincode}
                        onChange={(e) =>
                          handleInputChange(
                            "pincode",
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          )
                        }
                        placeholder="Enter pincode"
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === "payment" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleBack}
                    className="p-2 hover:bg-muted rounded-full transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <h3 className="font-semibold text-charcoal text-lg">Payment Method</h3>
                </div>

                <div className="space-y-3">
                  <button className="w-full p-4 border border-border rounded-lg flex items-center justify-between hover:border-charcoal transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-xs">COD</span>
                      </div>
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>

                  <button className="w-full p-4 border border-border rounded-lg flex items-center justify-between hover:border-charcoal transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold text-xs">UPI</span>
                      </div>
                      <span className="font-medium">UPI Payment</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>

                  <button className="w-full p-4 border border-border rounded-lg flex items-center justify-between hover:border-charcoal transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 font-bold text-xs">💳</span>
                      </div>
                      <span className="font-medium">Credit / Debit Card</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-64 bg-muted/30 p-4 border-t lg:border-t-0 lg:border-l border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-charcoal">Order Summary</h4>
              <span className="text-sm text-muted-foreground">• {items.length} item(s)</span>
            </div>

            <div className="space-y-2 mb-4">
              {items.slice(0, 2).map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-2">
                  <div className="w-10 h-10 bg-cream flex-shrink-0 overflow-hidden rounded">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-charcoal truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
              {items.length > 2 && (
                <p className="text-xs text-muted-foreground">
                  +{items.length - 2} more item(s)
                </p>
              )}
            </div>

            <div className="border-t border-border pt-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString()}.00</span>
              </div>
              <div className="flex justify-between text-sm mb-3">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-green-600 text-xs">FREE</span>
              </div>
              <div className="flex justify-between font-semibold text-charcoal">
                <span>Total</span>
                <span>₹{total.toLocaleString()}.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-white sticky bottom-0">
          <Button
            onClick={handleContinue}
            className="w-full bg-charcoal text-white hover:bg-charcoal/90 py-6 text-sm font-medium"
          >
            Continue
          </Button>
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-muted-foreground">
            <span>T&C</span>
            <span>|</span>
            <span>Privacy</span>
            <span className="ml-4">🔒 Secured by <strong className="text-charcoal">RIMAÉ</strong></span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutDialog;
