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
import StepImages from './StepImages';
import StepAvailability from './StepAvailability';
import StepPricing from './StepPricing';
import StepReview from './StepReview';
import { defaultHostFormData, type HostFormData } from './types';

const totalSteps = 9;
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
  6: z.object({
    gallery: z
      .array(
        z.object({
          status: z.enum(['uploading', 'uploaded', 'failed']),
          isCover: z.boolean(),
          secureUrl: z.string().optional(),
        }),
      )
      .min(5, 'Please upload at least 5 images.')
      .refine((gallery) => gallery.every((item) => item.status === 'uploaded'), 'Please wait until all images finish uploading.')
      .refine((gallery) => gallery.some((item) => item.isCover), 'Please select a cover photo.'),
  }),
  7: z
    .object({
      listingType: z.enum(['experiences', 'events', 'services']).nullable(),
      availability: z.object({
        startTime: z.string().trim(),
        endTime: z.string().trim(),
        eventDate: z.string().trim().optional(),
        multiDay: z.boolean(),
        capacity: z.string().trim().optional(),
        weeklySchedule: z.string().trim().optional(),
        appointmentDuration: z.string().trim().optional(),
        closedDays: z.string().trim().optional(),
        bookingCutoff: z.string().trim().optional(),
      }),
    })
    .superRefine((values, context) => {
      const { listingType, availability } = values;
      if (!listingType) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['listingType'], message: 'Listing type must be selected.' });
        return;
      }
      if (!availability.startTime) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'startTime'], message: 'Please add a start time.' });
      }
      if (!availability.endTime) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'endTime'], message: 'Please add an end time.' });
      }
      if (listingType === 'events') {
        if (!availability.eventDate) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'eventDate'], message: 'Please choose an event date.' });
        }
        if (!availability.capacity) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'capacity'], message: 'Please add event capacity.' });
        }
      }
      if (listingType === 'experiences') {
        if (!availability.bookingCutoff) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'bookingCutoff'], message: 'Please add a booking cutoff.' });
        }
        if (!availability.capacity) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'capacity'], message: 'Please add a maximum guest count.' });
        }
      }
      if (listingType === 'services') {
        if (!availability.weeklySchedule) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'weeklySchedule'], message: 'Please add a weekly schedule.' });
        }
        if (!availability.appointmentDuration) {
          context.addIssue({ code: z.ZodIssueCode.custom, path: ['availability', 'appointmentDuration'], message: 'Please add appointment duration.' });
        }
      }
    }),
  8: z
    .object({
      listingType: z.enum(['experiences', 'events', 'services']).nullable(),
      pricing: z.object({
        currency: z.string().trim().min(1, 'Please choose a currency.'),
        pricePerGuest: z.string().trim().optional(),
        groupDiscount: z.string().trim().optional(),
        standardTicketPrice: z.string().trim().optional(),
        vipTicketPrice: z.string().trim().optional(),
        earlyBirdPrice: z.string().trim().optional(),
        freeEvent: z.boolean(),
        hourlyRate: z.string().trim().optional(),
        dailyRate: z.string().trim().optional(),
        fixedPackagePrice: z.string().trim().optional(),
        negotiable: z.boolean(),
        taxesIncluded: z.boolean(),
        serviceFee: z.string().trim().min(1, 'Please add a service fee percentage.'),
      }),
    })
    .superRefine((values, context) => {
      const { listingType, pricing } = values;
      if (!listingType) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['listingType'], message: 'Listing type must be selected.' });
        return;
      }
      if (listingType === 'experiences' && !pricing.pricePerGuest) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['pricing', 'pricePerGuest'], message: 'Please add a price per guest.' });
      }
      if (listingType === 'events' && !pricing.standardTicketPrice && !pricing.freeEvent) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['pricing', 'standardTicketPrice'], message: 'Please add a standard ticket price or mark the event as free.' });
      }
      if (listingType === 'services' && !pricing.hourlyRate && !pricing.dailyRate && !pricing.fixedPackagePrice) {
        context.addIssue({ code: z.ZodIssueCode.custom, path: ['pricing', 'hourlyRate'], message: 'Please add a pricing option for services.' });
      }
    }),
  9: z.object({
    listingType: z.enum(['experiences', 'events', 'services']).nullable(),
    category: z.string().trim().min(1),
    province: z.string().trim().min(1),
    district: z.string().trim().min(1),
    sector: z.string().trim().min(1),
    address: z.string().trim().min(1),
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    description: z.string().trim().min(1),
    languages: z.string().trim().min(1),
    maxGuests: z.string().trim().min(1),
    operatingDays: z.string().trim().min(1),
    operatingHours: z.string().trim().min(1),
    included: z.string().trim().min(1),
    gallery: z
      .array(z.object({ status: z.enum(['uploading', 'uploaded', 'failed']), isCover: z.boolean(), secureUrl: z.string().optional() }))
      .min(5)
      .refine((gallery) => gallery.every((item) => item.status === 'uploaded'), 'Please wait until all images finish uploading.')
      .refine((gallery) => gallery.some((item) => item.isCover), 'Please select a cover photo.'),
    availability: z.object({
      startTime: z.string().trim(),
      endTime: z.string().trim(),
      eventDate: z.string().trim().optional(),
      multiDay: z.boolean(),
      capacity: z.string().trim().optional(),
      weeklySchedule: z.string().trim().optional(),
      appointmentDuration: z.string().trim().optional(),
      closedDays: z.string().trim().optional(),
      bookingCutoff: z.string().trim().optional(),
    }),
    pricing: z.object({
      currency: z.string().trim().min(1),
      pricePerGuest: z.string().trim().optional(),
      groupDiscount: z.string().trim().optional(),
      standardTicketPrice: z.string().trim().optional(),
      vipTicketPrice: z.string().trim().optional(),
      earlyBirdPrice: z.string().trim().optional(),
      freeEvent: z.boolean(),
      hourlyRate: z.string().trim().optional(),
      dailyRate: z.string().trim().optional(),
      fixedPackagePrice: z.string().trim().optional(),
      negotiable: z.boolean(),
      taxesIncluded: z.boolean(),
      serviceFee: z.string().trim().min(1),
    }),
  }),
} as const;

type HostWizardProps = {
  onComplete?: () => void;
  onCancel?: () => void;
};

export default function HostWizard({ onComplete, onCancel }: HostWizardProps) {
  const [step, setStep] = useState(1);
  const [savedMessage, setSavedMessage] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
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
    clearErrors(field as any);
    setSavedMessage('Progress saved locally');
  };

  const updateAvailability = (field: keyof HostFormData['availability'], value: string | boolean) => {
    setValue('availability', { ...formData.availability, [field]: value } as never);
    clearErrors(`availability.${field}` as any);
    setSavedMessage('Progress saved locally');
  };

  const updatePricing = (field: keyof HostFormData['pricing'], value: string | boolean) => {
    setValue('pricing', { ...formData.pricing, [field]: value } as never);
    clearErrors(`pricing.${field}` as any);
    setSavedMessage('Progress saved locally');
  };

  const updateGallery = (gallery: HostFormData['gallery']) => {
    setValue('gallery', gallery as never);
    clearErrors('gallery' as any);
    setSavedMessage('Progress saved locally');
  };

  const setPromoVideoUrl = (url: string) => {
    setValue('promoVideoUrl', url as never);
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
      case 6:
        return 'Photos & media';
      case 7:
        return 'Availability settings';
      case 8:
        return 'Pricing options';
      case 9:
        return 'Review & publish';
      default:
        return 'Host Wizard';
    }
  }, [step]);

  const validateStep = (currentStep: number) => {
    const schema = stepSchemas[currentStep as keyof typeof stepSchemas];
    const result = schema.safeParse(formData);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const fieldPath = issue.path.length > 0 ? issue.path.join('.') : 'form';
        setError(fieldPath as any, { type: 'validation', message: issue.message });
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

  const handleSaveDraft = async () => {
    setValue('draft', true as never);
    setSavedMessage('Saving your draft...');
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...formData, draft: true }));
    }
    try {
      const response = await fetch('/api/listings/draft', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, images: formData.gallery.map((image) => ({ url: image.secureUrl, path: image.path, isCover: image.isCover })) }),
      });
      const payload = await response.json().catch(() => ({}));
      setSavedMessage(response.ok ? 'Draft saved. You can continue later from where you left off.' : payload?.error?.message || 'We could not save your draft.');
    } catch {
      setSavedMessage('We could not reach the listing service. Your local draft is still saved.');
    }
  };

  const handlePublish = async () => {
    if (isPublishing) {
      return;
    }

    const isValid = validateStep(9);
    if (!isValid) {
      setSavedMessage('Please fix the highlighted fields before publishing.');
      return;
    }

  setIsPublishing(true);
    setSavedMessage('Publishing your listing...');
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          listingType: formData.listingType === 'experiences' ? 'experience' : formData.listingType === 'events' ? 'event' : 'service',
          images: formData.gallery.map((image) => ({ url: image.secureUrl, path: image.path, isCover: image.isCover })),
          price: formData.listingType === 'experiences' ? formData.pricing.pricePerGuest : formData.listingType === 'events' ? formData.pricing.standardTicketPrice : formData.pricing.hourlyRate || formData.pricing.dailyRate || formData.pricing.fixedPackagePrice,
          currency: formData.pricing.currency,
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setSavedMessage(payload?.error?.message || 'We could not publish your listing.');
        return;
      }
      setValue('draft', false as never);
      setSavedMessage('Your listing has been published successfully.');
      window.localStorage.removeItem(STORAGE_KEY);
      onComplete?.();
    } catch {
      setSavedMessage('We could not reach the listing service. Please try again.');
    } finally {
      setIsPublishing(false);
    }
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
        return <StepBasics values={{ title: formData.title, summary: formData.summary, description: formData.description, languages: formData.languages, maxGuests: formData.maxGuests, duration: formData.duration, operatingDays: formData.operatingDays, operatingHours: formData.operatingHours, included: formData.included, guestRequirements: formData.guestRequirements, accessibility: formData.accessibility }} onChange={(field, value) => updateField(field as keyof HostFormData, value)} onNext={goNext} onBack={goBack} errors={{ title: formState.errors.title?.message, summary: formState.errors.summary?.message, description: formState.errors.description?.message, languages: formState.errors.languages?.message, maxGuests: formState.errors.maxGuests?.message, duration: formState.errors.duration?.message, operatingDays: formState.errors.operatingDays?.message, operatingHours: formState.errors.operatingHours?.message, included: formState.errors.included?.message }} />;
      case 6:
        return <StepImages gallery={formData.gallery} promoVideoUrl={formData.promoVideoUrl} onGalleryChange={updateGallery} onVideoChange={setPromoVideoUrl} onNext={goNext} onBack={goBack} errors={{ gallery: formState.errors.gallery?.message as string | undefined }} />;
      case 7:
        return <StepAvailability listingType={formData.listingType} values={formData.availability} onChange={updateAvailability} onNext={goNext} onBack={goBack} errors={{ startTime: formState.errors.availability?.startTime?.message, endTime: formState.errors.availability?.endTime?.message, eventDate: formState.errors.availability?.eventDate?.message, capacity: formState.errors.availability?.capacity?.message, weeklySchedule: formState.errors.availability?.weeklySchedule?.message, appointmentDuration: formState.errors.availability?.appointmentDuration?.message, closedDays: formState.errors.availability?.closedDays?.message, bookingCutoff: formState.errors.availability?.bookingCutoff?.message }} />;
      case 8:
        return <StepPricing listingType={formData.listingType} values={formData.pricing} onChange={updatePricing} onNext={goNext} onBack={goBack} errors={{ pricePerGuest: formState.errors.pricing?.pricePerGuest?.message, groupDiscount: formState.errors.pricing?.groupDiscount?.message, standardTicketPrice: formState.errors.pricing?.standardTicketPrice?.message, vipTicketPrice: formState.errors.pricing?.vipTicketPrice?.message, earlyBirdPrice: formState.errors.pricing?.earlyBirdPrice?.message, hourlyRate: formState.errors.pricing?.hourlyRate?.message, dailyRate: formState.errors.pricing?.dailyRate?.message, fixedPackagePrice: formState.errors.pricing?.fixedPackagePrice?.message, serviceFee: formState.errors.pricing?.serviceFee?.message }} />;
      case 9:
        return <StepReview data={formData} onPublish={handlePublish} isPublishing={isPublishing} onSaveDraft={handleSaveDraft} onBack={goBack} />;
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
