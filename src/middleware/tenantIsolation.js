// src/middleware/tenantIsolation.js
import { PLAN_CONFIG } from '../config/plans.js';

// In production, replace this mock store with your PostgreSQL/Supabase DB query
const tenantDatabase = new Map([
  [
    'agency_key_123',
    {
      tenantId: 'agency_123',
      agencyName: 'Propel Realty Austin',
      plan: 'starter',
      active: true,
      googleSheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
      calendlyLink: 'https://calendly.com/propel-austin/property-tour',
      notificationEmail: 'leads@propelaustin.com',
      notificationPhone: '+15125550199',
    },
  ],
]);

export async function tenantIsolationMiddleware(req, res, next) {
  const apiKey = req.headers['x-agency-api-key'] || req.query.apiKey;

  if (!apiKey) {
    return res.status(401).json({ error: 'Missing x-agency-api-key header' });
  }

  const tenant = tenantDatabase.get(apiKey);

  if (!tenant || !tenant.active) {
    return res.status(403).json({ error: 'Invalid or inactive agency subscription' });
  }

  const planDetails = PLAN_CONFIG[tenant.plan];

  req.tenant = {
    ...tenant,
    planDetails,
  };

  next();
}
