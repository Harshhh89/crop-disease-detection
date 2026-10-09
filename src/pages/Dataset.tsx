import { motion } from "framer-motion";
import {
  Database,
  Image,
  Trees,
  Bug,
  Brain,
  Code,
  ShieldCheck,
  Cloud,
} from "lucide-react";

const stats = [
  {
    icon: Brain,
    label: "AI Technology",
    value: "Gemini AI",
    color: "text-primary",
  },
  {
    icon: Image,
    label: "Input Type",
    value: "Leaf Images",
    color: "text-success",
  },
  {
    icon: Bug,
    label: "Analysis",
    value: "Disease Detection",
    color: "text-warning",
  },
  {
    icon: ShieldCheck,
    label: "Backend Security",
    value: "Server-side API",
    color: "text-primary",
  },
];

const techs = [
  "React",
  "TypeScript",
  "Vite",
  "Google Gemini Multimodal AI",
  "Prompt Engineering",
  "Supabase Edge Functions",
  "JSON Structured Output",
  "Git & GitHub",
  "Vercel",
];

const Dataset = () => (
  <div className="min-h-screen pt-24 pb-16">
    <div className="container mx-auto px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
          AI Technology & Dataset
        </h1>

        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          CropGuard AI uses Google's pretrained Gemini multimodal AI to analyze
          leaf images and generate plant disease insights.
        </p>
      </motion.div>

      {/* Project Overview */}
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

            <p className="font-display text-xl md:text-2xl font-bold text-foreground">
              {s.value}
            </p>

            <p className="text-muted-foreground text-sm">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Approach */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Brain className="h-6 w-6 text-primary" />

          <h2 className="font-display text-2xl font-bold text-foreground">
            AI-Powered Leaf Analysis
          </h2>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          CropGuard AI uses a pretrained Google Gemini multimodal model to
          analyze uploaded leaf images. The application sends the image along
          with task-specific instructions to the AI model and receives
          structured information about the plant and its possible health
          condition.
        </p>

        <p className="text-muted-foreground leading-relaxed mb-4">
          The AI-generated response can include the plant name, botanical
          category, possible disease, confidence score, description, cause,
          treatment, prevention tips, and pesticide recommendations when
          appropriate.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          This project integrates a pretrained AI model through an API. A
          custom CNN model has not been trained as part of the current
          implementation, and the application's actual diagnostic accuracy
          has not yet been established through a dedicated evaluation dataset.
        </p>
      </motion.div>

      {/* Dataset Information */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-6 w-6 text-primary" />

          <h2 className="font-display text-2xl font-bold text-foreground">
            PlantVillage Dataset
          </h2>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          PlantVillage is a publicly available dataset containing labeled
          images of healthy and diseased plant leaves. It is widely used in
          agricultural AI research and in experiments involving plant disease
          classification.
        </p>

        <p className="text-muted-foreground leading-relaxed">
          PlantVillage is presented here as background information and a
          potential resource for future model evaluation or training. The
          current CropGuard AI implementation does not use a custom model
          trained on this dataset.
        </p>
      </motion.div>

      {/* Analysis Workflow */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8 mb-12"
      >
        <div className="flex items-center gap-3 mb-6">
          <Cloud className="h-6 w-6 text-primary" />

          <h2 className="font-display text-2xl font-bold text-foreground">
            How It Works
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              title: "1. Upload a Leaf Image",
              description:
                "The user selects an image of a plant leaf through the web interface.",
            },
            {
              title: "2. Secure Backend Processing",
              description:
                "A Supabase Edge Function handles the analysis request and calls the Gemini API using a server-side secret.",
            },
            {
              title: "3. AI Image Analysis",
              description:
                "Gemini analyzes the image using task-specific instructions and generates a structured response.",
            },
            {
              title: "4. Display the Results",
              description:
                "The application displays the returned plant information, possible disease, confidence score, causes, and recommendations.",
            },
          ].map((step) => (
            <div key={step.title}>
              <h3 className="font-semibold text-foreground mb-1">
                {step.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Technologies */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="glass-card rounded-2xl p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <Code className="h-6 w-6 text-primary" />

          <h2 className="font-display text-2xl font-bold text-foreground">
            Technologies Used
          </h2>
        </div>

        <div className="flex flex-wrap gap-3">
          {techs.map((tech) => (
            <span
              key={tech}
              className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

export default Dataset;