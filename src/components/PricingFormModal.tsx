import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, handleFirestoreError, OperationType } from "../lib/firebase";

interface PricingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: string;
  isAnnual: boolean;
}

export function PricingFormModal({ isOpen, onClose, selectedPlan, isAnnual }: PricingFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    plan: selectedPlan,
    billing: isAnnual ? "Annuel" : "Mensuel",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // Update form data when props change
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({
        ...prev,
        plan: selectedPlan,
        billing: isAnnual ? "Annuel" : "Mensuel"
      }));
      setSubmitStatus("idle");
    }
  }, [isOpen, selectedPlan, isAnnual]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // 1. Save to Firebase
      await addDoc(collection(db, "quote_requests"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // 2. Call API to send email (optional backup/fallback behavior)
      await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSubmitStatus("success");
      
      // Reset form and close after a delay
      setTimeout(() => {
        onClose();
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          plan: selectedPlan,
          billing: isAnnual ? "Annuel" : "Mensuel",
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
      
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      handleFirestoreError(error, OperationType.CREATE, "quote_requests");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 py-12 overflow-y-auto pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-black border border-white/10 p-8 md:p-12 pointer-events-auto shadow-[0_0_50px_rgba(246,133,31,0.1)] my-auto"
            >
              {/* Techy background patterns */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-20" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-noxen blur-[120px] opacity-20 pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-chrome/50 hover:text-white transition-colors"
                aria-label="Fermer"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Decorative Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-noxen/50 pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-noxen/50 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-noxen/50 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-noxen/50 pointer-events-none" />

              <div className="relative z-10 flex flex-col w-full h-full">
                <div className="mb-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-noxen mb-2 block flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-noxen rounded-full animate-pulse shadow-[0_0_8px_#F6851F]" />
                    Demande de devis
                  </span>
                  <h2 className="font-display text-3xl font-bold uppercase tracking-tight text-white">
                    Configurer votre <span className="text-noxen">offre</span>
                  </h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Nom complet *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Email professionnel *</label>
                      <input
                        type="email"
                        required
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@entreprise.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Téléphone</label>
                      <input
                        type="tel"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+213 XX XX XX XX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Entreprise</label>
                      <input
                        type="text"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Forfait choisi *</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none appearance-none cursor-pointer"
                          value={formData.plan}
                          onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
                        >
                          <option value="NOXEN START" className="bg-deep text-white">NOXEN START</option>
                          <option value="NOXEN GROWTH" className="bg-deep text-white">NOXEN GROWTH</option>
                          <option value="NOXEN ELITE" className="bg-deep text-white">NOXEN ELITE</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <span className="w-2 h-2 border-b border-r border-chrome/50 transform rotate-45 mb-1" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Cycle de facturation *</label>
                      <div className="relative">
                        <select
                          required
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none appearance-none cursor-pointer"
                          value={formData.billing}
                          onChange={(e) => setFormData({ ...formData, billing: e.target.value })}
                        >
                          <option value="Mensuel" className="bg-deep text-white">Mensuel</option>
                          <option value="Annuel" className="bg-deep text-white">Annuel (-30%)</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <span className="w-2 h-2 border-b border-r border-chrome/50 transform rotate-45 mb-1" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] uppercase tracking-widest text-chrome/70">Particularités ou besoins spécifiques</label>
                    <textarea
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white font-sans text-sm focus:border-noxen focus:bg-white/10 transition-colors outline-none resize-none"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Comment pouvons-nous vous aider ?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || submitStatus === 'success'}
                    className={`w-full relative group flex items-center justify-center py-4 px-6 font-sans text-xs uppercase tracking-widest font-bold box-border overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(246,133,31,0.4)] ${submitStatus === 'success' ? 'bg-green-500 text-white' : 'bg-noxen text-deep'}`}
                  >
                    {submitStatus !== 'success' && (
                      <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0 disabled:hidden" />
                    )}
                    <span className={`relative z-10 transition-colors duration-300 flex items-center gap-2 ${submitStatus === 'success' ? 'text-white' : 'group-hover:text-deep'}`}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                           <span className="w-4 h-4 border-2 border-deep/30 border-t-deep rounded-full animate-spin" />
                           Envoi en cours...
                        </span>
                      ) : submitStatus === "success" ? (
                        "Demande envoyée !"
                      ) : (
                        <>
                          Envoyer la demande
                          <span className="w-4 h-[1px] bg-deep group-hover:bg-deep transition-all duration-300" />
                        </>
                      )}
                    </span>
                  </button>

                  {submitStatus === "error" && (
                    <div className="text-red-500 text-sm font-sans mt-2 text-center">
                      Une erreur est survenue. Veuillez réessayer plus tard.
                    </div>
                  )}
                </form>
              </div>
              
              {/* Bottom line glitch effect */}
              <div className="absolute bottom-0 left-0 h-[2px] bg-noxen w-0 group-hover:w-full transition-all duration-1000 ease-in-out shadow-[0_0_12px_#F6851F]" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
