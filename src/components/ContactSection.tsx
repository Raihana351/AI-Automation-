import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Copy, Check, ShieldCheck, RefreshCw, Cloud, Server, Database } from 'lucide-react';
import { submitContactMessage, isAwsConfigured, AWS_SAM_TEMPLATE, AWS_TERRAFORM_TEMPLATE } from '../lib/aws';
import { ContactMessage } from '../types';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<ContactMessage | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [copiedIaC, setCopiedIaC] = useState(false);
  const [showIaC, setShowIaC] = useState(false);
  const [iaCTab, setIaCTab] = useState<'sam' | 'terraform'>('sam');

  const copyIaCToClipboard = () => {
    const code = iaCTab === 'sam' ? AWS_SAM_TEMPLATE : AWS_TERRAFORM_TEMPLATE;
    navigator.clipboard.writeText(code);
    setCopiedIaC(true);
    setTimeout(() => setCopiedIaC(false), 2000);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your business email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email format (e.g. name@company.com).';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const result = await submitContactMessage({
        name: formData.name,
        email: formData.email,
        company: formData.company,
        message: formData.message,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setSubmittedRecord(result.data || null);
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
        setErrors({});
      } else {
        setServerError(result.message);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unexpected submission error';
      setServerError(`Failed to record submission: ${msg}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-[#05060A] relative" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Context & AWS Cloud Architecture Information */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold tracking-wider text-cyan-400 uppercase font-mono mb-2">
                INITIATE PARTNERSHIP
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Ready to Build What’s Next on AWS?
              </h2>
              <p className="text-base text-slate-300 mt-3 leading-relaxed text-balance">
                Our solutions engineering team works with technology leaders to deploy autonomous AI pipelines and enterprise multi-agent workflows backed by AWS Cloud infrastructure.
              </p>

              {/* AWS Status Indicator */}
              <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
                <Cloud className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <span>AWS Serverless Pipeline</span>
                    <span className={`px-2 py-0.5 text-[10px] rounded font-mono ${isAwsConfigured ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-cyan-950 text-cyan-300 border border-cyan-800'}`}>
                      {isAwsConfigured ? 'AWS API Gateway Active' : 'AWS DynamoDB Ready'}
                    </span>
                  </div>
                  <p className="text-slate-400 mt-1 leading-relaxed">
                    Target: <code className="text-cyan-300 font-mono">Amazon DynamoDB (nexora_contact_messages)</code> via AWS Lambda
                  </p>
                </div>
              </div>

              {/* AWS SAM / Terraform Infrastructure Code Drawer */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setShowIaC(!showIaC)}
                  className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
                >
                  <span>{showIaC ? '▼ Hide AWS Infrastructure as Code' : '▶ View AWS SAM & Terraform Blueprint'}</span>
                </button>

                {showIaC && (
                  <div className="mt-3 p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-[11px] text-slate-300 relative">
                    <div className="flex items-center justify-between mb-2 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIaCTab('sam')}
                          className={`px-2 py-0.5 rounded text-[10px] ${iaCTab === 'sam' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                        >
                          AWS SAM (YAML)
                        </button>
                        <button
                          onClick={() => setIaCTab('terraform')}
                          className={`px-2 py-0.5 rounded text-[10px] ${iaCTab === 'terraform' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'}`}
                        >
                          Terraform (HCL)
                        </button>
                      </div>
                      <button
                        onClick={copyIaCToClipboard}
                        className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] flex items-center gap-1"
                      >
                        {copiedIaC ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedIaC ? 'Copied' : 'Copy IaC'}</span>
                      </button>
                    </div>
                    <pre className="overflow-x-auto max-h-56 pr-2">
                      {iaCTab === 'sam' ? AWS_SAM_TEMPLATE : AWS_TERRAFORM_TEMPLATE}
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* SLA Trust Notes */}
            <div className="pt-8 border-t border-slate-800/80 mt-8 space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>AWS KMS Encrypted at Rest & in Transit (TLS 1.3)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Direct response from our AWS Certified Solutions Architect</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-slate-900/40 border border-slate-800/90 shadow-2xl backdrop-blur-sm relative">
              {submitSuccess ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Ingestion Successful</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Your transmission has been processed and stored in Amazon DynamoDB. Our systems architect will review your project requirements within 24 hours.
                  </p>

                  {submittedRecord && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 max-w-md mx-auto text-left text-xs font-mono space-y-1 text-slate-300">
                      <div><span className="text-slate-500">DynamoDB Partition Key:</span> {submittedRecord.id}</div>
                      <div><span className="text-slate-500">Sender:</span> {submittedRecord.name} ({submittedRecord.email})</div>
                      <div><span className="text-slate-500">Timestamp:</span> {submittedRecord.created_at}</div>
                      <div><span className="text-slate-500">Target Service:</span> Amazon DynamoDB / AWS Lambda</div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setSubmittedRecord(null);
                    }}
                    className="mt-4 px-5 py-2 text-xs font-semibold text-slate-900 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    Send Another Transmission
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {serverError && (
                    <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/80 text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Your Full Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isSubmitting}
                        placeholder="Dr. Elena Vance"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.name
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.name && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                        Work Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isSubmitting}
                        placeholder="elena@blackmesa.com"
                        className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors ${
                          errors.email
                            ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                            : 'border-slate-800 focus:border-cyan-400'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Organization / Company <span className="text-slate-500">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      disabled={isSubmitting}
                      placeholder="Black Mesa Research"
                      className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-slate-800 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1.5">
                      Project Requirements <span className="text-cyan-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      disabled={isSubmitting}
                      placeholder="Describe your workflows, expected AWS query volumes, or AI automation goals..."
                      className={`w-full px-4 py-3 rounded-xl bg-slate-950/80 border text-sm text-white placeholder-slate-600 focus:outline-none transition-colors resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:ring-1 focus:ring-rose-500'
                          : 'border-slate-800 focus:border-cyan-400'
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                        <span>Transmitting to AWS API Gateway...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ContactSection;
