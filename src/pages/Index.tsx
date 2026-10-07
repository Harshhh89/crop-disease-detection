import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Upload, BookOpen, Leaf, Shield, Zap, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

const features = [
  { icon: Leaf, title: "Plant Identification", desc: "Automatically identify 14+ plant species from leaf images" },
  { icon: Shield, title: "Disease Detection", desc: "Detect 38 disease classes with high accuracy using AI" },
  { icon: Zap, title: "Instant Results", desc: "Get analysis results in seconds with treatment suggestions" },
  { icon: BarChart3, title: "Confidence Scoring", desc: "View prediction confidence to assess result reliability" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Lush green farmland" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-background" />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 mb-6">
              <Leaf className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary-foreground">AI-Powered Agriculture</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-6 leading-tight">
              AI Crop Disease<br />Detection System
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
              Upload a plant leaf image and detect the plant type and disease instantly using Artificial Intelligence and Computer Vision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="hero-gradient text-lg px-8 py-6 rounded-xl font-semibold elevated-shadow">
                <Link to="/detect">
                  <Upload className="mr-2 h-5 w-5" /> Upload Image
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl font-semibold bg-card/20 backdrop-blur border-primary-foreground/30 text-primary-foreground hover:bg-card/40 hover:text-primary-foreground">
                <Link to="/about">
                  <BookOpen className="mr-2 h-5 w-5" /> Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Simply upload a leaf image and our CNN model will analyze it in seconds.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-2xl p-6 hover:elevated-shadow transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
                  <f.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Protect Your Crops?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
            Start detecting diseases early and save your harvest with AI-powered analysis.
          </p>
          <Button asChild size="lg" className="bg-card text-primary hover:bg-card/90 text-lg px-8 py-6 rounded-xl font-semibold">
            <Link to="/detect">
              <Upload className="mr-2 h-5 w-5" /> Start Detection
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-muted/50">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © 2026 CropGuard AI — AI Crop Disease Detection System. Built for farmers and agriculture students.
        </div>
      </footer>
    </div>
  );
};

export default Index;
