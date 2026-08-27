'use client';

import { useState } from 'react';
import { X, Link2, MessageCircle, Mail, Copy, Check } from 'lucide-react';
import type { PublicListing } from '../ListingCard';

interface ShareModalProps {
  listing: PublicListing;
  onClose: () => void;
}

export default function ShareModal({ listing, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/listings/${listing.id}` : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let url = '';
    const text = `Check out this ${listing.listingType}: ${listing.title}`;

    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(text + ' ' + shareUrl)}`;
        break;
      case 'facebook':
        url = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'x':
        url = `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'email':
        url = `mailto:?subject=${encodeURIComponent(listing.title)}&body=${encodeURIComponent(text + '\n\n' + shareUrl)}`;
        break;
    }

    if (url) window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Share</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Copy Link Section */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-slate-900">Copy link</label>
          <button
            onClick={handleCopyLink}
            className="mt-3 flex w-full items-center gap-3 rounded-lg border border-slate-300 px-4 py-3 transition hover:border-slate-400"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">Link copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 text-slate-400" />
                <span className="truncate text-sm text-slate-600">{shareUrl}</span>
              </>
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-900">Share via</p>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
            >
              <MessageCircle className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">WhatsApp</span>
            </button>

            <button
              onClick={() => handleShare('facebook')}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-sm font-medium text-slate-900">Facebook</span>
            </button>

            <button
              onClick={() => handleShare('x')}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
            >
              <svg className="h-5 w-5 text-slate-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.601l-5.165-6.75-5.913 6.75H2.562l7.746-8.973L1.254 2.25h6.554l4.677 6.168L16.939 2.25h.305zm-1.161 17.52h1.833L7.084 4.126H5.117l12.926 15.644z" />
              </svg>
              <span className="text-sm font-medium text-slate-900">X</span>
            </button>

            <button
              onClick={() => handleShare('email')}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 transition hover:bg-slate-50"
            >
              <Mail className="h-5 w-5 text-slate-600" />
              <span className="text-sm font-medium text-slate-900">Email</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
