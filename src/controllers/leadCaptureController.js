// src/controllers/leadCaptureController.js
import fetch from 'node-fetch';

export async function captureLead(req, res) {
  try {
    const { tenant } = req;
    const { name, email, phone, propertyOfInterest, chatSummary } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({ error: 'Name and at least one contact method (email/phone) required.' });
    }

    const leadData = {
      agencyId: tenant.tenantId,
      agencyName: tenant.agencyName,
      lead: {
        name,
        email,
        phone,
        propertyOfInterest: propertyOfInterest || 'General Inquiry',
        capturedAt: new Date().toISOString(),
        summary: chatSummary || '',
      },
      calendlyUrl: tenant.calendlyLink,
    };

    // 1. Dispatch Webhook to Agency CRM if allowed on their plan
    if (tenant.planDetails.features.crmWebhook && tenant.webhookUrl) {
      await fetch(tenant.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      }).catch(err => console.error('Webhook dispatch failed:', err));
    }

    // 2. Return payload to frontend (includes Calendly link once lead is secured)
    return res.status(200).json({
      success: true,
      message: 'Lead captured successfully',
      calendlyLink: tenant.calendlyLink,
    });
  } catch (error) {
    console.error('Error capturing lead:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
