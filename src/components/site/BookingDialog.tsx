import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useShop } from "@/lib/shop-store";

const SLOTS = ["Tomorrow · 10:00 AM", "Tomorrow · 2:30 PM", "Thu · 11:00 AM", "Fri · 4:00 PM"];

export function BookingDialog() {
  const { bookingOpen, setBookingOpen } = useShop();
  const [slot, setSlot] = useState(SLOTS[0]);

  return (
    <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
      <DialogContent className="max-w-lg rounded-none bg-background">
        <DialogHeader>
          <p className="eyebrow text-primary">Private Appointment</p>
          <DialogTitle className="font-display text-3xl font-light">
            Book a Virtual Consultation
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Thirty minutes with a Danhov consultant from our Los Angeles atelier — no obligation.
        </p>
        <form
          className="mt-2 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setBookingOpen(false);
            toast.success(`Appointment requested — ${slot}. We'll confirm by email.`);
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="booking-name">Name</Label>
              <Input id="booking-name" required className="rounded-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="booking-email">Email</Label>
              <Input id="booking-email" type="email" required className="rounded-none" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Preferred time (PT)</Label>
            <div className="grid grid-cols-2 gap-2">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSlot(s)}
                  className={
                    slot === s
                      ? "border border-primary bg-primary px-3 py-2 text-xs tracking-[0.12em] text-primary-foreground uppercase"
                      : "border border-border px-3 py-2 text-xs tracking-[0.12em] uppercase hover:border-primary"
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="booking-notes">What are you looking for?</Label>
            <Textarea id="booking-notes" rows={3} className="rounded-none" />
          </div>
          <Button type="submit" className="w-full rounded-none py-6 tracking-[0.2em] uppercase">
            Request Appointment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
