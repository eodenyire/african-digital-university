import { Code, Brain, Landmark, Globe, Shield, Cpu } from "lucide-react";

const schools = [
  { icon: Code, title: "Software Engineering", desc: "Backend, frontend, DevOps & systems programming. Build real products for the African ecosystem.", color: "bg-primary" },
  { icon: Brain, title: "AI & Data Science", desc: "Machine learning, data engineering & African dataset modeling for agriculture, finance & health.", color: "bg-accent" },
  { icon: Landmark, title: "FinTech & Digital Banking", desc: "Payment systems, core banking, risk modeling & GRC — powering Africa's financial revolution.", color: "bg-secondary" },
  { icon: Globe, title: "Internet Systems", desc: "Search engines, video platforms & distributed systems at continental scale.", color: "bg-primary" },
  { icon: Shield, title: "GovTech & Public Systems", desc: "Digital ID, tax systems, land registries & smart city infrastructure.", color: "bg-accent" },
  { icon: Cpu, title: "Cloud & Infrastructure", desc: "AfriCloud-focused compute, storage, hosting & modern DevOps practices.", color: "bg-secondary" },
];

const Programs = () => {
  return (
    <section id="programs" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-widest">Schools & Faculties</span>
          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-foreground">
            World-Class <span className="text-gradient-gold">Programs</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Six specialized schools designed to produce builders, not just graduates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((s) => (
            <div key={s.title} className="group p-8 rounded-2xl bg-card border border-border hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
              <div className={`w-12 h-12 rounded-xl ${s.color} flex items-center justify-center mb-5`}>
                <s.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;
