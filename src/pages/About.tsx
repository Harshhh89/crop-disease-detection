import { motion } from "framer-motion";
import { Target, Eye, Heart, Users } from "lucide-react";

const values = [
  { icon: Target, title: "Our Mission", desc: "Empower farmers with AI tools to detect crop diseases early, reducing crop loss and improving food security worldwide." },
  { icon: Eye, title: "Our Vision", desc: "A world where every farmer has access to advanced disease detection technology, regardless of location or resources." },
  { icon: Heart, title: "Why It Matters", desc: "Plant diseases cause up to 40% crop losses globally. Early detection through AI can save billions in agricultural output." },
  { icon: Users, title: "Who It's For", desc: "Designed for farmers, agriculture students, researchers, and extension workers who need quick, reliable plant diagnosis." },
];

const About = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">About CropGuard AI</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Helping farmers detect plant diseases early using Artificial Intelligence and Computer Vision.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <div className="h-12 w-12 rounded-xl hero-gradient flex items-center justify-center mb-4">
              <v.icon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground mb-2">{v.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8 text-center">
        <h2 className="font-display text-2xl font-bold text-foreground mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Upload", desc: "Take a photo of the affected leaf and upload it to the system." },
            { step: "2", title: "Analyze", desc: "Our CNN model processes the image and classifies the disease." },
            { step: "3", title: "Results", desc: "Get instant diagnosis with treatment recommendations." },
          ].map((s) => (
            <div key={s.step}>
              <div className="h-10 w-10 rounded-full hero-gradient flex items-center justify-center mx-auto mb-3 text-primary-foreground font-bold">
                {s.step}
              </div>
              <h4 className="font-display font-bold text-foreground mb-1">{s.title}</h4>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default About;
