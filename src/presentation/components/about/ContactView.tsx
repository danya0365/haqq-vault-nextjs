'use client';

/**
 * ContactView
 * Contact page with form and information
 */

import { SITE_CONFIG } from '@/src/config/site.config';
import { UI_CONFIG } from '@/src/config/ui.config';
import { AnimatedButton } from '@/src/presentation/components/animated/AnimatedButton';
import { AnimatedCard } from '@/src/presentation/components/animated/AnimatedCard';
import { AnimatedIslamicPattern } from '@/src/presentation/components/animated/AnimatedIslamicPattern';
import { MainLayout } from '@/src/presentation/layouts/MainLayout';
import { animated, useSpring } from '@react-spring/web';
import { useEffect, useState } from 'react';

export function ContactView() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const headerSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 20,
    config: { tension: 200, friction: 20 },
  });

  const contentSpring = useSpring({
    opacity: isLoaded ? 1 : 0,
    y: isLoaded ? 0 : 30,
    config: { tension: 200, friction: 25 },
    delay: 200,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = SITE_CONFIG.contact.methods;

  return (
    <MainLayout>
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <animated.div style={headerSpring} className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6">
              <AnimatedIslamicPattern type="arabesque" size="md" color="primary" animation="float" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              💬 {UI_CONFIG.labels.contactTitle}
            </h1>
            <p className="text-muted max-w-2xl mx-auto text-lg">
              {UI_CONFIG.labels.contactDesc}
            </p>
          </animated.div>

          <animated.div style={contentSpring}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <AnimatedCard className="p-6 md:p-8" variant="elevated">
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">✅</div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {UI_CONFIG.labels.submitSuccess}
                      </h3>
                      <p className="text-muted mb-6">
                        {UI_CONFIG.labels.submitSuccessDesc}
                      </p>
                      <AnimatedButton
                        variant="outline"
                        onClick={() => setIsSubmitted(false)}
                      >
                        {UI_CONFIG.labels.sendAgain}
                      </AnimatedButton>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <h2 className="text-xl font-bold text-foreground mb-4">
                        {UI_CONFIG.labels.sendMessageTitle}
                      </h2>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {UI_CONFIG.labels.labelName}
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder={UI_CONFIG.placeholders.yourName}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            {UI_CONFIG.labels.labelEmail}
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            placeholder="cleancode1986@gmail.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {UI_CONFIG.labels.labelSubject}
                        </label>
                        <select
                          required
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        >
                          <option value="">{UI_CONFIG.labels.chooseSubject}</option>
                          <option value="question">{UI_CONFIG.labels.subjectQuestion}</option>
                          <option value="correction">{UI_CONFIG.labels.subjectCorrection}</option>
                          <option value="suggestion">{UI_CONFIG.labels.subjectSuggestion}</option>
                          <option value="collaboration">{UI_CONFIG.labels.subjectCollaboration}</option>
                          <option value="other">{UI_CONFIG.labels.subjectOther}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          {UI_CONFIG.labels.labelMessage}
                        </label>
                        <textarea
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                          placeholder={UI_CONFIG.placeholders.messageDetails}
                        />
                      </div>

                      <AnimatedButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? UI_CONFIG.labels.sending : UI_CONFIG.labels.sendMessage}
                      </AnimatedButton>
                    </form>
                  )}
                </AnimatedCard>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <AnimatedCard className="p-6" variant="bordered">
                  <h3 className="font-semibold text-foreground mb-4">
                    {UI_CONFIG.labels.contactChannels}
                  </h3>
                  <div className="space-y-4">
                    {contactMethods.map((method) => (
                      <a
                        key={method.label}
                        href={method.href}
                        className="flex items-center gap-3 text-muted hover:text-primary transition-colors"
                      >
                        <span className="text-xl">{method.icon}</span>
                        <div>
                          <div className="text-xs text-muted">{method.label}</div>
                          <div className="text-sm font-medium text-foreground">
                            {method.value}
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </AnimatedCard>

                <AnimatedCard className="p-6" variant="bordered">
                  <h3 className="font-semibold text-foreground mb-4">
                    {UI_CONFIG.labels.sendNewQuestion}
                  </h3>
                  <p className="text-sm text-muted mb-4">
                    {UI_CONFIG.labels.sendNewQuestionDesc}
                  </p>
                  <ul className="text-sm text-muted space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{UI_CONFIG.labels.instructionClearQuestion}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{UI_CONFIG.labels.instructionAttachSource}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary">•</span>
                      <span>{UI_CONFIG.labels.instructionResponse}</span>
                    </li>
                  </ul>
                </AnimatedCard>

                {/* Arabic Quote */}
                <div className="text-center p-6 bg-primary/5 dark:bg-primary/10 rounded-xl border border-primary/20">
                  <p className="arabic-text text-lg text-primary mb-2">
                    {UI_CONFIG.labels.contactQuote.arabic}
                  </p>
                  <p className="text-xs text-muted italic">
                    {UI_CONFIG.labels.contactQuote.thai}
                  </p>
                  <p className="text-xs text-muted mt-1">{UI_CONFIG.labels.contactQuote.source}</p>
                </div>
              </div>
            </div>
          </animated.div>
        </div>
      </div>
    </MainLayout>
  );
}
