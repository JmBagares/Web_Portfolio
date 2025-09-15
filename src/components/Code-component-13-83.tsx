import React from 'react';
import { useForm } from 'react-hook-form@7.55.0';
import { Button } from './Button';
import { Mail, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string; // Anti-spam field
}

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactForm() {
  const [formState, setFormState] = React.useState<FormState>('idle');
  const [statusMessage, setStatusMessage] = React.useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus
  } = useForm<ContactFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      subject: '',
      message: '',
      honeypot: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot field for spam
    if (data.honeypot) {
      setFormState('error');
      setStatusMessage('Something went wrong—please try again.');
      return;
    }

    setFormState('loading');
    setStatusMessage('');

    try {
      // Simulate API call with 800ms delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real implementation, you would send the data to your backend
      console.log('Form data:', data);
      
      setFormState('success');
      setStatusMessage('Thanks! Your message has been sent.');
      
      // Reset form and focus on first field after success
      setTimeout(() => {
        reset();
        setFocus('fullName');
        setFormState('idle');
        setStatusMessage('');
      }, 3000);
      
    } catch (error) {
      setFormState('error');
      setStatusMessage('Something went wrong—please try again.');
    }
  };

  const isDisabled = formState === 'loading' || formState === 'success';

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field - hidden from users */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="honeypot">Leave this field empty</label>
          <input
            type="text"
            id="honeypot"
            tabIndex={-1}
            autoComplete="off"
            {...register('honeypot')}
          />
        </div>

        {/* Full Name Field */}
        <div>
          <label 
            htmlFor="fullName" 
            className="block mb-2 text-foreground"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            disabled={isDisabled}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.fullName 
                ? 'border-destructive bg-destructive/5 text-destructive-foreground' 
                : 'border-border bg-input-background text-foreground hover:border-muted-foreground focus:border-primary'
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="Enter your full name"
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            {...register('fullName', { 
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
          />
          {errors.fullName && (
            <p 
              id="fullName-error" 
              className="mt-2 text-destructive flex items-center gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label 
            htmlFor="email" 
            className="block mb-2 text-foreground"
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            disabled={isDisabled}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.email 
                ? 'border-destructive bg-destructive/5 text-destructive-foreground' 
                : 'border-border bg-input-background text-foreground hover:border-muted-foreground focus:border-primary'
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="your.email@example.com"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', { 
              required: 'Email address is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
          />
          {errors.email && (
            <p 
              id="email-error" 
              className="mt-2 text-destructive flex items-center gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div>
          <label 
            htmlFor="subject" 
            className="block mb-2 text-foreground"
          >
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            disabled={isDisabled}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.subject 
                ? 'border-destructive bg-destructive/5 text-destructive-foreground' 
                : 'border-border bg-input-background text-foreground hover:border-muted-foreground focus:border-primary'
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="What's this about?"
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            aria-invalid={errors.subject ? 'true' : 'false'}
            {...register('subject', { 
              required: 'Subject is required',
              minLength: {
                value: 3,
                message: 'Subject must be at least 3 characters'
              }
            })}
          />
          {errors.subject && (
            <p 
              id="subject-error" 
              className="mt-2 text-destructive flex items-center gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label 
            htmlFor="message" 
            className="block mb-2 text-foreground"
          >
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            disabled={isDisabled}
            className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-vertical ${
              errors.message 
                ? 'border-destructive bg-destructive/5 text-destructive-foreground' 
                : 'border-border bg-input-background text-foreground hover:border-muted-foreground focus:border-primary'
            } ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            placeholder="Tell me about your project, ideas, or just say hello!"
            aria-describedby={errors.message ? 'message-error' : undefined}
            aria-invalid={errors.message ? 'true' : 'false'}
            {...register('message', { 
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters'
              }
            })}
          />
          {errors.message && (
            <p 
              id="message-error" 
              className="mt-2 text-destructive flex items-center gap-2"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Privacy Note */}
        <p className="text-muted-foreground">
          I'll only use your info to reply.
        </p>

        {/* Status Messages */}
        <div 
          className="min-h-[1.5rem]"
          aria-live="polite"
          aria-atomic="true"
        >
          {statusMessage && (
            <div className={`flex items-center gap-2 ${
              formState === 'success' ? 'text-success' : 'text-destructive'
            }`}>
              {formState === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
              )}
              <span>{statusMessage}</span>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isDisabled}
            className={`flex-1 px-6 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              formState === 'success' 
                ? 'bg-success text-white cursor-default'
                : formState === 'loading'
                ? 'bg-primary/80 text-primary-foreground cursor-not-allowed'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/95'
            } ${isDisabled ? 'opacity-90' : ''}`}
          >
            <span className="flex items-center justify-center gap-2">
              {formState === 'loading' && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
              {formState === 'success' && (
                <CheckCircle className="w-4 h-4" />
              )}
              {formState === 'loading' ? 'Sending...' : 
               formState === 'success' ? 'Sent!' : 'Send Message'}
            </span>
          </button>

          <Button
            variant="secondary"
            size="large"
            href="mailto:jmbagares52@gmail.com"
            className="flex-shrink-0"
          >
            <Mail className="w-4 h-4 mr-2" />
            Email me directly
          </Button>
        </div>
      </form>
    </div>
  );
}