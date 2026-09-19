// src/config/plans.js

export const PLAN_TIERS = {
  STARTER: 'starter',
  CUSTOM: 'custom',
  ADVANCED: 'advanced',
  ENTERPRISE: 'enterprise',
};

export const PLAN_CONFIG = {
  [PLAN_TIERS.STARTER]: {
    name: 'Starter Plan',
    monthlyFee: 299,
    mandatoryRetainer: 900,
    maxListings: 50,
    monthlyChatLimit: 1000,
    features: {
      voiceSupport: false,
      customBranding: false,
      crmWebhook: false,
      prioritySupport: false,
      customLLMTuning: false,
    },
  },
  [PLAN_TIERS.CUSTOM]: {
    name: 'Custom Plan',
    monthlyFee: 800,
    mandatoryRetainer: 900,
    maxListings: 250,
    monthlyChatLimit: 5000,
    features: {
      voiceSupport: true,
      customBranding: true,
      crmWebhook: true,
      prioritySupport: false,
      customLLMTuning: false,
    },
  },
  [PLAN_TIERS.ADVANCED]: {
    name: 'Advanced Plan',
    monthlyFee: 1500,
    mandatoryRetainer: 900,
    maxListings: 1000,
    monthlyChatLimit: 20000,
    features: {
      voiceSupport: true,
      customBranding: true,
      crmWebhook: true,
      prioritySupport: true,
      customLLMTuning: false,
    },
  },
  [PLAN_TIERS.ENTERPRISE]: {
    name: 'Enterprise Plan',
    monthlyFee: 4500,
    mandatoryRetainer: 900,
    maxListings: Infinity,
    monthlyChatLimit: Infinity,
    features: {
      voiceSupport: true,
      customBranding: true,
      crmWebhook: true,
      prioritySupport: true,
      customLLMTuning: true,
    },
  },
};
