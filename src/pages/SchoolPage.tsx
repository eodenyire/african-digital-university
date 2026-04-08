import { useParams, Link } from "react-router-dom";
import { getSchoolBySlug } from "@/data/schools";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, BookOpen, Briefcase, Clock, GraduationCap, Wrench } from "lucide-react";
import { useState } from "react";

const SchoolPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const school = getSchoolBySlug(slug || "");
  const [activeYear, setActiveYear] = useState(0);

  if (!school) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">School Not Found</h1>
          <Link to="/" className="text-secondary hover:underline">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const Icon = school.icon;
  const totalCourses = school.curriculum.reduce((acc, y) => acc + y.semesters.reduce((a, s) => a + s.courses.length, 0), 0);
  const totalCredits = school.curriculum.reduce((acc, y) => acc + y.semesters.reduce((a, s) => a + s.courses.reduce((c, co) => c + co.credits, 0), 0), 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-24 pb-16 bg-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(circle at 20% 50%, ${school.color} 0%, transparent 50%)` }} />
        <div className="relative z-10 container mx-auto px-4 pt-12">
          <Link to="/#programs" className="inline-flex items-center gap-2 text-primary-foreground/50 hover:text-secondary transition-colors mb-8 text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to All Programs
          </Link>
          <div className="flex items-start gap-6 mb-6">
            <div className={`w-16 h-16 rounded-2xl ${school.colorClass} flex items-center justify-center shrink-0`}>
              <Icon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-3">{school.title}</h1>
              <p className="text-xl text-gradient-gold font-semibold">{school.tagline}</p>
            </div>
          </div>
          <p className="text-primary-foreground/60 max-w-3xl text-lg leading-relaxed mt-6">{school.description}</p>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6 mt-10">
            {[
              { icon: Clock, label: "Duration", value: "3 Years (6 Semesters)" },
              { icon: BookOpen, label: "Total Courses", value: `${totalCourses} Courses` },
              { icon: GraduationCap, label: "Total Credits", value: `${totalCredits} Credits` },
              { icon: Briefcase, label: "Career Paths", value: `${school.careerPaths.length}+ Roles` },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 bg-primary-foreground/5 rounded-xl px-5 py-3">
                <s.icon className="w-5 h-5 text-secondary" />
                <div>
                  <div className="text-xs text-primary-foreground/40">{s.label}</div>
                  <div className="text-sm font-semibold text-primary-foreground">{s.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Program Highlights</h2>
              <div className="space-y-4">
                {school.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg ${school.colorClass} flex items-center justify-center shrink-0 mt-0.5`}>
                      <span className="text-primary-foreground font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-foreground">{h}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-6">Tools & Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {school.tools.map((t) => (
                  <span key={t} className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-foreground">
                    {t}
                  </span>
                ))}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-6 mt-10">Career Paths</h2>
              <div className="flex flex-wrap gap-2">
                {school.careerPaths.map((c) => (
                  <span key={c} className="px-4 py-2 rounded-full bg-foreground text-primary-foreground text-sm font-medium">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              Full <span className="text-gradient-gold">Curriculum</span>
            </h2>
            <p className="text-muted-foreground mt-3">Detailed course breakdown across 3 years</p>
          </div>

          {/* Year tabs */}
          <div className="flex justify-center gap-3 mb-10">
            {school.curriculum.map((y, i) => (
              <button
                key={y.year}
                onClick={() => setActiveYear(i)}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                  activeYear === i
                    ? `${school.colorClass} text-primary-foreground shadow-elevated`
                    : "bg-card border border-border text-foreground hover:shadow-card"
                }`}
              >
                Year {y.year}: {y.label}
              </button>
            ))}
          </div>

          {/* Semesters */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {school.curriculum[activeYear].semesters.map((sem) => (
              <div key={sem.name} className="bg-card rounded-2xl border border-border overflow-hidden shadow-card">
                <div className={`${school.colorClass} px-6 py-4`}>
                  <h3 className="text-lg font-bold text-primary-foreground">{sem.name}</h3>
                  <p className="text-primary-foreground/70 text-sm">
                    {sem.courses.length} courses · {sem.courses.reduce((a, c) => a + c.credits, 0)} credits
                  </p>
                </div>
                <div className="divide-y divide-border">
                  {sem.courses.map((course) => (
                    <div key={course.code} className="px-6 py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded">{course.code}</span>
                            <span className="text-xs text-muted-foreground">{course.credits} credits</span>
                          </div>
                          <h4 className="font-semibold text-foreground text-sm">{course.title}</h4>
                          <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{course.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-primary-foreground mb-4">
            Ready to join the {school.shortTitle} program?
          </h2>
          <p className="text-primary-foreground/50 mb-8 max-w-lg mx-auto">
            Applications are open. Start your journey to becoming an African tech leader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#" className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold hover:brightness-110 transition shadow-elevated">
              Apply to This Program
            </a>
            <Link to="/#programs" className="px-8 py-4 rounded-xl border-2 border-primary-foreground/20 text-primary-foreground font-bold hover:bg-primary-foreground/10 transition">
              Explore Other Schools
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SchoolPage;
