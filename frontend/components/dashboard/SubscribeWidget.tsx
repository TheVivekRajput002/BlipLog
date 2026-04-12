"use client";

import { useState } from "react";

export default function SubscribeWidget() {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    if (!email) return;
    // Handle subscription logic here
    console.log("Subscribing:", email);
    setEmail("");
  };

  return (
    <div className="fixed bottom-8 right-8 hidden lg:block">
      <div className="bg-surface p-6 shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-outline max-w-xs">
        <h5 className="font-syne font-bold text-sm uppercase mb-2 text-on-surface">
          Get Status Updates
        </h5>
        <p className="text-xs text-on-surface-variant mb-4">
          Receive real-time notifications via email or webhook when services are
          interrupted.
        </p>
        <div className="flex flex-col space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@address.com"
            className="bg-surface-container-low border-none font-mono text-xs p-3 text-on-surface focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/50 outline-none"
          />
          <button
            onClick={handleSubmit}
            className="bg-primary text-on-primary font-syne font-bold text-xs py-3 uppercase tracking-widest hover:bg-on-surface-variant transition-colors"
          >
            Subscribe Now
          </button>
        </div>
      </div>
    </div>
  );
}