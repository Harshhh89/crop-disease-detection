import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Loader2, Leaf, ShieldCheck, ShieldAlert, FlaskConical, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { AnalysisResult } from "@/lib/mockAnalysis";

const Detection = () => {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const analyze = async () => {
    if (!image) return;
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("analyze-leaf", {
        body: { imageBase64: image },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data as AnalysisResult);
    } catch (err: any) {
      console.error("Analysis failed:", err);
      toast.error(err.message || "Failed to analyze image. Please try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const reset = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
            Disease Detection
          </h1>
          <p className="text-muted-foreground text-lg">Upload a leaf image to analyze plant health</p>
        </motion.div>

        {/* Upload area */}
        {!image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`border-2 border-dashed rounded-2xl p-16 text-center transition-colors cursor-pointer ${
              dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Upload className="h-16 w-16 mx-auto mb-6 text-primary/60" />
            <h3 className="font-display text-xl font-semibold text-foreground mb-2">
              Drag & Drop your leaf image
            </h3>
            <p className="text-muted-foreground mb-6">or click to browse files</p>
            <Button className="hero-gradient">
              <Upload className="mr-2 h-4 w-4" /> Choose File
            </Button>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
          </motion.div>
        )}

        {/* Preview + Analyze */}
        {image && !result && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="glass-card rounded-2xl p-4 inline-block mb-8">
              <img src={image} alt="Uploaded leaf" className="max-h-80 rounded-xl object-contain" />
            </div>
            <div className="flex gap-4 justify-center">
              <Button onClick={analyze} disabled={analyzing} className="hero-gradient px-8 py-5 text-lg rounded-xl">
                {analyzing ? (
                  <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Analyzing...</>
                ) : (
                  <><Leaf className="mr-2 h-5 w-5" /> Analyze Leaf</>
                )}
              </Button>
              <Button variant="outline" onClick={reset} disabled={analyzing} className="px-8 py-5 text-lg rounded-xl">
                Reset
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Image + status summary */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="glass-card rounded-2xl p-4 shrink-0">
                  <img src={image!} alt="Analyzed leaf" className="h-48 w-48 object-cover rounded-xl" />
                </div>
                <div className="flex-1 glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    {result.isHealthy ? (
                      <ShieldCheck className="h-8 w-8 text-success" />
                    ) : (
                      <ShieldAlert className="h-8 w-8 text-destructive" />
                    )}
                    <span className={`font-display text-2xl font-bold ${result.isHealthy ? "text-success" : "text-destructive"}`}>
                      {result.isHealthy ? "Healthy Plant" : "Disease Detected"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground text-sm">Confidence:</span>
                    <span className="font-semibold text-foreground">{result.confidence}%</span>
                  </div>
                  <Progress value={result.confidence} className="h-2" />
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Plant Info */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Leaf className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-bold text-foreground">Plant Information</h3>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div><dt className="text-muted-foreground">Plant Name</dt><dd className="font-semibold text-foreground">{result.plantName}</dd></div>
                    <div><dt className="text-muted-foreground">Category</dt><dd className="font-semibold text-foreground">{result.plantCategory}</dd></div>
                  </dl>
                </div>

                {/* Disease Detection */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <ShieldAlert className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-bold text-foreground">Disease Detection</h3>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div><dt className="text-muted-foreground">Disease</dt><dd className="font-semibold text-foreground">{result.diseaseName}</dd></div>
                    <div><dt className="text-muted-foreground">Confidence</dt><dd className="font-semibold text-foreground">{result.confidence}%</dd></div>
                    <div><dt className="text-muted-foreground">Status</dt>
                      <dd className={`font-semibold ${result.isHealthy ? "text-success" : "text-destructive"}`}>
                        {result.isHealthy ? "Healthy" : "Diseased"}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Treatment */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <FlaskConical className="h-5 w-5 text-primary" />
                    <h3 className="font-display font-bold text-foreground">Treatment</h3>
                  </div>
                  <dl className="space-y-3 text-sm">
                    <div><dt className="text-muted-foreground">Cause</dt><dd className="text-foreground">{result.cause}</dd></div>
                    <div><dt className="text-muted-foreground">Pesticide</dt><dd className="font-semibold text-foreground">{result.pesticide}</dd></div>
                    <div><dt className="text-muted-foreground">Treatment</dt><dd className="text-foreground">{result.treatment}</dd></div>
                  </dl>
                </div>
              </div>

              {/* Prevention + Actions */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-foreground mb-2">Prevention Tips</h3>
                <p className="text-muted-foreground text-sm">{result.prevention}</p>
              </div>

              <div className="flex gap-4 justify-center pt-4">
                <Button onClick={reset} className="hero-gradient px-8 py-5 rounded-xl">
                  <Upload className="mr-2 h-4 w-4" /> Analyze Another
                </Button>
                <Button variant="outline" className="px-8 py-5 rounded-xl" onClick={() => window.print()}>
                  <Download className="mr-2 h-4 w-4" /> Download Report
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Detection;
