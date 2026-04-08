import { ArrowRight } from "lucide-react";

const Ecosystem = () => {
  const products = [
    { name: "AfriTube", desc: "Africa's video platform", emoji: "📹" },
    { name: "AfroMail", desc: "African email service", emoji: "📧" },
    { name: "AfriSearch", desc: "Africa's search engine", emoji: "🔍" },
    { name: "AfriCloud", desc: "African cloud infrastructure", emoji: "☁️" },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <span className="text-primary font-semibold text-sm uppercase tracking-widest">The Ecosystem</span>
        <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-foreground">
          Build for the <span className="text-gradient-gold">Ecosystem</span>
        </h2>
        <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
          ADU students don't just learn — they contribute to real African digital products as part of their training.
        </p>
        <div className="mt-14 flex flex-wrap justify-center gap-4">
          {products.map((p, i) => (
            <div key={p.name} className="flex items-center gap-3">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-border shadow-card">
                <span className="text-2xl">{p.emoji}</span>
                <div className="text-left">
                  <div className="font-bold text-foreground">{p.name}</div>
                  <div className="text-xs text-muted-foreground">{p.desc}</div>
                </div>
              </div>
              {i < products.length - 1 && (
                <ArrowRight className="hidden md:block w-5 h-5 text-secondary" />
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 rounded-2xl bg-foreground max-w-2xl mx-auto">
          <p className="text-primary-foreground/70 text-sm mb-2">The Closed Loop</p>
          <p className="text-primary-foreground font-semibold">
            ADA trains → ADU specializes → Graduates build products → Revenue funds more students
          </p>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;
