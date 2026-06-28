import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing json and urlencoded body
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Persistent-like in-memory cache of initial bookings
  const bookings: any[] = [
    {
      id: "bk_initial1",
      name: "Marcus Vance",
      email: "marcus.v@example.com",
      phone: "(555) 234-5678",
      address: "1024 Ridgecrest Dr, Austin TX",
      roofType: "Asphalt Shingles",
      serviceType: "Full Replacement",
      message: "Need a full review of hail damage from last week's storm. Looking to replace with high-durability modern architectural shingles.",
      preferredDate: "2026-06-25",
      preferredTime: "morning",
      status: "Scheduled",
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
    },
    {
      id: "bk_initial2",
      name: "Eleanor Vance",
      email: "eleanor.v@example.com",
      phone: "(555) 987-6543",
      address: "419 Oakwood Ln, Austin TX",
      roofType: "Standing Seam Metal",
      serviceType: "New Installation",
      message: "Interested in upgrading our ranch-style house to a modern standing seam metal roof in Matte Black. Please provide an estimate.",
      preferredDate: "2026-06-28",
      preferredTime: "afternoon",
      status: "New",
      createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString()
    }
  ];

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // GET and POST bookings/leads
  app.post("/api/bookings", (req, res) => {
    const { name, email, phone, address, roofType, serviceType, message, preferredDate, preferredTime } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone number are required." });
    }

    const booking = {
      id: "bk_" + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      address: address || "",
      roofType: roofType || "Not Specified",
      serviceType: serviceType || "Inspection",
      message: message || "",
      preferredDate: preferredDate || "",
      preferredTime: preferredTime || "anytime",
      status: "New", // New, Contacted, Scheduled, Completed
      createdAt: new Date().toISOString()
    };

    bookings.push(booking);
    res.status(201).json({ success: true, booking });
  });

  app.get("/api/bookings", (req, res) => {
    // Sort in reverse order (newest first)
    const sorted = [...bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    res.json(sorted);
  });

  app.patch("/api/bookings/:id/status", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const booking = bookings.find(b => b.id === id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }
    
    booking.status = status;
    res.json({ success: true, booking });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
