import React, { useState } from 'react';
import { Button, Input, TextArea, Select } from './UIComponents';
import { useToast } from './ToastContext';
import {
  Rocket,
  Target,
  Building2,
  User,
  ChevronRight,
  ChevronLeft,
  Zap,
  Sparkles,
  CheckCircle2,
  Mail,
  Layers,
  Heart,
  TrendingUp,
  Users,
  Layout,
  Globe,
  Briefcase,
  Link as LinkIcon
} from 'lucide-react';
import { FcSalesPerformance, FcFlashOn } from 'react-icons/fc';

interface OnboardingProps {
  onComplete: () => void;
}

interface OnboardingData {
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  customRole: string;
  // Step 2: Organization
  companyName: string;
  companyWebsite: string;
  companyAddress: string;
  companyIntro: string;
  industry: string;
  customIndustry: string;
  teamSize: string;
  // Step 3: CRM Strategy
  pipelineTemplate: string;
  customStages: string[];
  leadSources: string[];
  // Step 4: Team & Preferences
  teamInvites: string[];
  communicationPreference: string;
}

const INDUSTRIES = [
  { value: 'technology', label: 'Technology & Software' },
  { value: 'finance', label: 'Finance & Banking' },
  { value: 'healthcare', label: 'Healthcare & Medical' },
  { value: 'education', label: 'Education & Training' },
  { value: 'retail', label: 'Retail & E-Commerce' },
  { value: 'marketing', label: 'Marketing & Advertising' },
  { value: 'consulting', label: 'Consulting & Services' },
  { value: 'manufacturing', label: 'Manufacturing & Industrial' },
  { value: 'media', label: 'Media & Entertainment' },
  { value: 'nonprofit', label: 'Non-Profit & Government' },
  { value: 'realestate', label: 'Real Estate & Construction' },
  { value: 'legal', label: 'Legal & Compliance' },
  { value: 'other', label: 'Other' },
];

const TEAM_SIZES = [
  { value: 'solo', label: 'Just me' },
  { value: '2-10', label: '2-10 people' },
  { value: '11-50', label: '11-50 people' },
  { value: '51-200', label: '51-200 people' },
  { value: '201-500', label: '201-500 people' },
  { value: '500+', label: '500+ people' },
];

const ROLES = [
  { value: 'executive', label: 'Executive / C-Level' },
  { value: 'manager', label: 'Manager / Team Lead' },
  { value: 'professional', label: 'Professional / Specialist' },
  { value: 'entrepreneur', label: 'Entrepreneur / Founder' },
  { value: 'freelancer', label: 'Freelancer / Consultant' },
  { value: 'student', label: 'Student / Learner' },
  { value: 'creative', label: 'Creative / Designer' },
  { value: 'sales', label: 'Sales / Business Development' },
  { value: 'support', label: 'Customer Support / Service' },
  { value: 'other', label: 'Other' },
];

const PIPELINE_TEMPLATES = [
  { id: 'sales', label: 'Standard Sales', icon: <FcSalesPerformance size={24} />, stages: ['Lead', 'Discovery', 'Proposal', 'Negotiation', 'Closed'] },
  { id: 'saas', label: 'SaaS Subscription', icon: <Sparkles className="text-blue-500" size={24} />, stages: ['Trial', 'Engagement', 'Activation', 'Expansion', 'Renewal'] },
  { id: 'realestate', label: 'Real Estate', icon: <Building2 className="text-orange-500" size={24} />, stages: ['Inquiry', 'Viewing', 'Offer', 'Closing', 'Handover'] },
  { id: 'recruitment', label: 'Recruitment', icon: <Users className="text-purple-500" size={24} />, stages: ['Applied', 'Screening', 'Interview', 'Offer', 'Hired'] },
];

const LEAD_SOURCES = [
  { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
  { id: 'website', label: 'Website CMS', icon: '🌐' },
  { id: 'email', label: 'Email Outreach', icon: '📧' },
  { id: 'referral', label: 'Referrals', icon: '🤝' },
  { id: 'manual', label: 'Manual Entry', icon: '✍️' },
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const [data, setData] = useState<OnboardingData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    role: '',
    customRole: '',
    companyName: '',
    companyWebsite: '',
    companyAddress: '',
    companyIntro: '',
    industry: '',
    customIndustry: '',
    teamSize: '',
    pipelineTemplate: 'sales',
    customStages: PIPELINE_TEMPLATES[0].stages,
    leadSources: [],
    teamInvites: [''],
    communicationPreference: 'email',
  });

  const steps = [
    { title: 'Welcome', icon: Rocket, description: 'Welcome to LeadQ.ai' },
    { title: 'Personal', icon: User, description: 'Tell us about yourself' },
    { title: 'Organization', icon: Building2, description: 'Your workplace' },
    { title: 'Strategy', icon: Target, description: 'CRM Configuration' },
    { title: 'Launch', icon: Sparkles, description: 'Final setup' },
  ];

  const handleLeadSourceToggle = (id: string) => {
    setData(prev => ({
      ...prev,
      leadSources: prev.leadSources.includes(id)
        ? prev.leadSources.filter(s => s !== id)
        : [...prev.leadSources, id]
    }));
  };

  const handlePipelineSelect = (templateId: string) => {
    const template = PIPELINE_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setData(prev => ({
        ...prev,
        pipelineTemplate: templateId,
        customStages: template.stages
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const onboardingData = {
        profile: {
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          location: data.location,
        },
        company: {
          name: data.companyName,
          website: data.companyWebsite,
          address: data.companyAddress,
          intro: data.companyIntro,
          industry: data.industry === 'other' ? data.customIndustry : data.industry,
          teamSize: data.teamSize,
        },
        preferences: {
          role: data.role === 'other' ? data.customRole : data.role,
          communicationPreference: data.communicationPreference,
        },
        crm: {
          pipeline: data.pipelineTemplate,
          stages: data.customStages,
          leadSources: data.leadSources,
        },
        team: data.teamInvites.filter(email => email.trim() !== ''),
        completedAt: new Date().toISOString(),
      };

      localStorage.setItem('leadq_user_data', JSON.stringify(onboardingData));
      addToast('Great! Your LeadQ.ai environment is ready.', 'success');
      onComplete();
    } catch (error: any) {
      addToast('Failed to complete setup', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    switch (currentStep) {
      case 0: return true;
      case 1:
        const roleValid = data.role !== '' && (data.role !== 'other' || data.customRole.trim() !== '');
        return data.fullName.trim() !== '' && data.email.trim() !== '' && emailRegex.test(data.email) && roleValid;
      case 2:
        const industryValid = data.industry !== '' && (data.industry !== 'other' || data.customIndustry.trim() !== '');
        return data.companyName.trim() !== '' && industryValid && data.teamSize !== '';
      case 3:
        return data.pipelineTemplate !== '' && data.leadSources.length > 0;
      case 4: return true;
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center py-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
              <Rocket className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to LeadQ.ai
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-md mx-auto">
              Let's set up your workspace in just a few steps. This will help us personalize your lead management experience.
            </p>
            <div className="flex justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Fast & Easy</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500" />
                <span>Personalized</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span>Boost Sales</span>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              <p className="text-gray-500 mt-2">Help us know you better</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={<span>Full Name <span className="text-red-500">*</span></span>}
                value={data.fullName}
                onChange={(e) => setData({ ...data, fullName: e.target.value })}
                placeholder="John Doe"
              />
              <Input
                label={<span>Email Address <span className="text-red-500">*</span></span>}
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Phone Number"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                placeholder="+1 (555) 000-0000"
              />
              <Input
                label="Location"
                value={data.location}
                onChange={(e) => setData({ ...data, location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
            <Select
              label={<span>Your Role <span className="text-red-500">*</span></span>}
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
              options={[{ value: '', label: 'Select your role...' }, ...ROLES]}
            />
            {data.role === 'other' && (
              <Input
                label={<span>Please specify <span className="text-red-500">*</span></span>}
                value={data.customRole}
                onChange={(e) => setData({ ...data, customRole: e.target.value })}
              />
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Company Details</h2>
              <p className="text-gray-500 mt-2">Tell us about your organization</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label={<span>Company Name <span className="text-red-500">*</span></span>}
                value={data.companyName}
                onChange={(e) => setData({ ...data, companyName: e.target.value })}
              />
              <Input
                label="Website"
                value={data.companyWebsite}
                onChange={(e) => setData({ ...data, companyWebsite: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select
                label={<span>Industry <span className="text-red-500">*</span></span>}
                value={data.industry}
                onChange={(e) => setData({ ...data, industry: e.target.value })}
                options={[{ value: '', label: 'Select industry...' }, ...INDUSTRIES]}
              />
              <Select
                label={<span>Team Size <span className="text-red-500">*</span></span>}
                value={data.teamSize}
                onChange={(e) => setData({ ...data, teamSize: e.target.value })}
                options={[{ value: '', label: 'Select team size...' }, ...TEAM_SIZES]}
              />
            </div>
            <TextArea
              label="Company Introduction"
              value={data.companyIntro}
              onChange={(e) => setData({ ...data, companyIntro: e.target.value })}
              placeholder="How can LeadQ help your organization?"
              rows={3}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">CRM Strategy & Sourcing</h2>
              <p className="text-gray-500 mt-2">Define your sales flow and lead origins</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Pipeline Flow</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PIPELINE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handlePipelineSelect(tmpl.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-left flex items-start gap-4 ${data.pipelineTemplate === tmpl.id ? 'border-blue-500 bg-blue-50' : 'border-gray-100 hover:bg-gray-50'
                      }`}
                  >
                    <div>{tmpl.icon}</div>
                    <div>
                      <div className="font-bold text-sm text-gray-900">{tmpl.label}</div>
                      <div className="text-[10px] text-gray-400 mt-1">{tmpl.stages.join(' → ')}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wider">Lead Sources</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {LEAD_SOURCES.map((source) => (
                  <button
                    key={source.id}
                    onClick={() => handleLeadSourceToggle(source.id)}
                    className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1 ${data.leadSources.includes(source.id) ? 'border-green-500 bg-green-50' : 'border-gray-100'
                      }`}
                  >
                    <span className="text-xl">{source.icon}</span>
                    <span className="text-[10px] font-bold text-gray-700">{source.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're All Set! 🎉</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Your profile and LeadQ CRM strategy are ready.
            </p>
            <div className="bg-gray-50 rounded-2xl p-6 text-left max-w-lg mx-auto">
              <h3 className="font-bold text-sm text-gray-900 mb-4">Summary:</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3"><User size={16} className="text-blue-500" /> {data.fullName}</div>
                <div className="flex items-center gap-3"><Building2 size={16} className="text-purple-500" /> {data.companyName}</div>
                <div className="flex items-center gap-3"><Layers size={16} className="text-indigo-500" /> {PIPELINE_TEMPLATES.find(t => t.id === data.pipelineTemplate)?.label} Pipeline</div>
                <div className="flex items-center gap-3"><LinkIcon size={16} className="text-green-500" /> {data.leadSources.length} Sources Integrated</div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-xs text-gray-400">By clicking launch, you agree to our Terms of Service.</p>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex items-center justify-center gap-2 min-w-max">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <button
                  onClick={() => idx < currentStep && setCurrentStep(idx)}
                  disabled={idx > currentStep}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${idx === currentStep ? 'bg-blue-600 text-white shadow-lg' : idx < currentStep ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
                    }`}
                >
                  {idx < currentStep ? <CheckCircle2 size={18} /> : <step.icon size={18} />}
                  <span className="text-xs font-bold uppercase tracking-wider">{step.title}</span>
                </button>
                {idx < steps.length - 1 && <div className={`w-8 h-0.5 ${idx < currentStep ? 'bg-green-300' : 'bg-gray-200'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-[32px] shadow-2xl border border-gray-100 overflow-hidden flex flex-col min-h-[600px]">
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            {renderStepContent()}
          </div>
          <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {currentStep > 0 ? (
              <Button variant="ghost" onClick={() => setCurrentStep(p => p - 1)}>
                <ChevronLeft size={16} className="mr-2" /> Back
              </Button>
            ) : <div />}
            <div className="flex gap-3">
              {currentStep > 0 && currentStep < 4 && (
                <button
                  onClick={() => canProceed() && setCurrentStep(p => p + 1)}
                  disabled={!canProceed()}
                  className={`text-xs font-bold uppercase tracking-widest transition-colors ${canProceed() ? 'text-gray-400 hover:text-gray-600' : 'text-gray-200 cursor-not-allowed'
                    }`}
                >
                  Skip
                </button>
              )}
              <Button
                variant="primary"
                onClick={currentStep < steps.length - 1 ? () => setCurrentStep(p => p + 1) : handleSubmit}
                disabled={!canProceed() || isSubmitting}
                className="bg-slate-900 hover:bg-black text-white px-8"
              >
                {isSubmitting ? 'Loading...' : currentStep < steps.length - 1 ? 'Continue' : 'Launch Dashboard'}
                {currentStep < steps.length - 1 && <ChevronRight size={16} className="ml-2" />}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
