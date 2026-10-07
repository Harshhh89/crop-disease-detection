import { motion } from "framer-motion";
import { Database, Image, Trees, Bug, BarChart3, Code } from "lucide-react";

const stats = [
  { icon: Image, label: "Total Images", value: "54,000+", color: "text-primary" },
  { icon: Trees, label: "Plant Species", value: "14", color: "text-success" },
  { icon: Bug, label: "Disease Classes", value: "38", color: "text-warning" },
  { icon: BarChart3, label: "Model Accuracy", value: "~95%", color: "text-primary" },
];

const techs = [
  "Python", "TensorFlow / Keras", "CNN (Convolutional Neural Network)",
  "PlantVillage Dataset", "Flask / FastAPI", "HTML, CSS, JavaScript",
];

const Dataset = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">Dataset & Model</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Our AI model is trained on the PlantVillage dataset — one of the largest open-source plant disease datasets.
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-2xl p-6 text-center"
          >
            <s.icon className={`h-8 w-8 mx-auto mb-3 ${s.color}`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-muted-foreground text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* About Dataset */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8 mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">PlantVillage Dataset</h2>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">
          The PlantVillage dataset contains over 54,000 labeled images of healthy and diseased plant leaves across 14 species and 38 disease classes. It was curated by researchers at Penn State University and is widely used for training deep learning models in agricultural AI.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Our CNN model leverages transfer learning and data augmentation to achieve ~95% classification accuracy, enabling real-time disease detection that can help farmers protect their crops.
        </p>
      </motion.div>

      {/* Technologies */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-card rounded-2xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />
          <h2 className="font-display text-2xl font-bold text-foreground">Technologies Used</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {techs.map((t) => (
            <span key={t} className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium">
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Dataset;
