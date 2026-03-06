# Production Monitoring Mini Checklist

## 0-2 Hours (Critical)
- [ ] Signup works in production (`/signup`)
- [ ] Login works in production (`/login`)
- [ ] Protected routes (`/app/*`) redirect correctly when logged out
- [ ] Create/select active list works
- [ ] Add/update/check/remove item works
- [ ] Finalize list flow works with confirmation modal
- [ ] History and dashboard update after finalization
- [ ] Profile update persists

## Error Monitoring
- [ ] Check Vercel deployment logs for runtime errors
- [ ] Check Vercel function logs for failed server actions
- [ ] Verify no repeated 5xx responses in first hour
- [ ] Capture top 3 recurring errors with timestamp and route

## Data Integrity Checks (Supabase)
- [ ] New users appear in `auth.users`
- [ ] User profile row upserts correctly in `profiles`
- [ ] Active/done transitions are correct in `shopping_lists`
- [ ] List items are linked to correct `list_id`
- [ ] RLS blocks cross-user list access

## Performance Baseline (Web)
- [ ] Initial page load under acceptable threshold on desktop
- [ ] No major UI blocking during list actions
- [ ] Catalog and list pages render without noticeable lag

## Daily Follow-up (Next 24h)
- [ ] Total signups count
- [ ] Successful finalizations count
- [ ] Drop-off point (where users stop in flow)
- [ ] Most frequent functional complaint
- [ ] Decide first hotfix priority
