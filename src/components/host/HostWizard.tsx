import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import ProgressBar from './ProgressBar';
import StepBasics from './StepBasics';
import StepCategory from './StepCategory';
import StepListingType from './StepListingType';
import StepLocation from './StepLocation';
import StepWelcome from './StepWelcome';
import { defaultHostFormData, type HostFormData } from './types';

const totalSteps = 5;
const STORAGE_KEY = 'host-wizard-progress';

const stepSchemas = {
  1: z.object({}),
  2: z.object({
    listingType: z.enum(['experiences', 'events', 'services']).nullable().refine((value) => value !== null, {
      message: 'Please choose one listing type.',
    }),
  }),
  3: z.object({
    category: z.string().trim().min(1, 'Please choose a category.'),
  }),
  4: z.object({
    province: z.string().trim().min(1, 'Please add a province.'),
    district: z.string().trim().min(1, 'Please add a district.'),
    sector: z.string().trim().min(1, 'Please add a sector.'),
    address: z.string().trim().min(1, 'Please add a street address.'),
  }),
  5: z
    .object({
      listingType: z.enum(['experiences', 'events', 'services']).nullable(),
      title: z.string().trim().min(1, 'Please add a listing title.'),
      summary: z.string().trim().min(1, 'Please add a short summary.'),
      description: z.string().trim().min(1, 'Please add a detailed description.'),
      languages: z.string().trim().min(1, 'Please add the languages you speak.'),
      maxGuests: z.string().trim().min(1, 'Please add a maximum guest count.'),
      duration: z.string().trim().optional(),
      operatingDays: z.string().trim().min(1, 'Please add operating days.'),
      operatingHours: z.string().trim().min(1, 'Please add operating hours.'),
      included: z.string().trim().min(1, 'Please note what is included.'),
    })
    .superRefine((values, context) => {
      if (values.listingType === 'experiences' || values.listingType === 'events') {
        if (!values.duration?.trim()) {
          context.addIssue({
            code: z.ZodIssueCode.custom,
            path: ['duration'],
            message: 'Please add a duration for experiences and events.',
          });
        }
      }
    }),
} as const;

type HostWizardProps = {
  onComplete?: () => void;
  onCancel?: () => void;
};

export default function HostWizard({ onComplete, onCancel }: HostWizardProps) {
  const [step, setStep] = useState(1);
  const [savedMessage, setSavedMessage] = useState('');
  const { setValue, watch, setError, clearErrors, formState } = useForm<HostFormData>({
    defaultValues: defaultHostFormData,
    mode: 'onChange',
  });

  const formData = watch();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as Partial<HostFormData>;
      Object.entries(parsed).forEach(([key, value]) => {
        if (value !== undefined) {
          setValue(key as keyof HostFormData, value as never);
        }
      });
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [setValue]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    setSavedMessage('Progress saved locally');
  }, [formData]);

  const updateField = (field: keyof HostFormData, value: string | number | null) => {
    setValue(field, value as never);
    clearErrors(field);
    setSavedMessage('Progress saved locally');
  };

  const stepTitle = useMemo(() => {
    switch (step) {
      case 1:
        return 'Welcome';
      case 2:
        return 'What are you hosting?';
      case 3:
        return 'Category';
      case 4:
        return 'Location';
      case 5:
        return 'Basic information';
      default:
        return 'Host Wizard';
    }
  }, [step]);

  const validateStep = (currentStep: number) => {
    const schema = stepSchemas[currentStep as keyof typeof stepSchemas];
    const result = schema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof HostFormData;
        setError(field, { type: 'validation', message: issue.message });
      });
      return false;
    }

    clearErrors();
    return true;
  };

  const goNext = async () => {
    const isValid = validateStep(step);
    if (!isValid) {
      setSavedMessage('Please complete the required fields before continuing.');
      return;
    }

    setStep((current) => Math.min(current + 1, totalSteps));
  };

  const goBack = () => {
    setStep((current) => Math.max(current - 1, 1));
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setSavedMessage('Geolocation is not supported in this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setValue('latitude', position.coords.latitude as never);
        setValue('longitude', position.coords.longitude as never);
        setSavedMessage('Current location captured');
      },
      () => {
        setSavedMessage('Unable to access your location');
      },
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <StepWelcome onNext={goNext} />;
      case 2:
        return <StepListingType value={formData.listingType} onSelect={(value) => updateField('listingType', value)} onNext={goNext} onBack={goBack} errors={{ listingType: formState.errors.listingType?.message }} />;
      case 3:
        return <StepCategory listingType={formData.listingType} value={formData.category} onSelect={(value) => updateField('category', value)} onNext={goNext} onBack={goBack} errors={{ category: formState.errors.category?.message }} />;
      case 4:
        return <StepLocation values={{ province: formData.province, district: formData.district, sector: formData.sector, address: formData.address, landmark: formData.landmark }} onChange={(field, value) => updateField(field as keyof HostFormData, value)} onUseCurrentLocation={handleUseCurrentLocation} onNext={goNext} onBack={goBack} errors={{ province: formState.errors.province?.message, district: formState.errors.district?.message, sector: formState.errors.sector?.message, address: formState.errors.address?.message }} />;
      case 5:
        return <StepBasics values={{ title: formData.title, summary: formData.summary, description: formData.description, languages: formData.languages, maxGuests: formData.maxGuests, duration: formData.duration, operatingDays: formData.operatingDays, operatingHours: formData.operatingHours, included: formData.included, guestRequirements: formData.guestRequirements, accessibility: formData.accessibility }} onChange={(field, value) => updateField(field as keyof HostFormData, value)} onNext={() => onComplete?.()} onBack={goBack} errors={{ title: formState.errors.title?.message, summary: formState.errors.summary?.message, description: formState.errors.description?.message, languages: formState.errors.languages?.message, maxGuests: formState.errors.maxGuests?.message, duration: formState.errors.duration?.message, operatingDays: formState.errors.operatingDays?.message, operatingHours: formState.errors.operatingHours?.message, included: formState.errors.included?.message }} />;
      default:
        return null;
    }
  };

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-[36px] border border-white/70 bg-white/70 p-6 shadow-[0_30px_100px_rgba(15,23,42,0.10)] backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-gradient-to-br from-emerald-50/70 via-white to-slate-50 p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Become a Host</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">{stepTitle}</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600">Build a premium listing for experiences, events, or services tailored for Rwanda travelers.</p>
          </div>
          {onCancel ? (
            <button type="button" onClick={onCancel} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
              Close
            </button>
          ) : null}
          <div className="min-w-[220px]">
            <ProgressBar currentStep={step} totalSteps={totalSteps} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25, ease: 'easeOut' }}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>

        {savedMessage ? <p className="mt-6 text-sm font-medium text-emerald-700">{savedMessage}</p> : null}
      </div>
    </section>
  );
}
