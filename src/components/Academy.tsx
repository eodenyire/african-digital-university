import { Gamepad2, Smartphone, Wifi, Users } from "lucide-react";

const features = [
  { icon: Gamepad2, title: "Gamified Learning", desc: "Points, badges & leaderboards make learning addictive." },
  { icon: Smartphone, title: "Mobile-First", desc: "Built for Africa — learn from any Android device." },
  { icon: Wifi, title: "Offline Capable", desc: "Download lessons for areas with limited connectivity." },
  { icon: Users, title: "Earn While Learning", desc: "Contribute to real products and earn stipends." },
];

const Academy = () => {
  return (
    <section id="academy" className="py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-accent font-semibold text-sm uppercase tracking-widest">African Digital Academy</span>
            <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-foreground">
              From Age 10 to <span className="text-gradient-gold">Tech Leader</span>
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              ADA takes young Africans from digital foundations through junior engineering to pre-university specialization — all through project-based, real-world learning.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Scratch → Python", "Web Dev", "Robotics", "AI Basics", "Cybersecurity"].map((t) => (
                <span key={t} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <f.icon className="w-8 h-8 text-secondary mb-4" />
                <h4 className="font-bold text-foreground mb-1">{f.title}</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academy;
