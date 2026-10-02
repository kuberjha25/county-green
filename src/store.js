/**
 * In-memory app store. There is no backend — this holds a mutable copy of
 * data.js for the lifetime of the app so the forms actually do something.
 */
import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import * as seed from '../data';

const StoreContext = createContext(null);

let seq = 100;
const nextId = (prefix) => `${prefix}-${Date.now().toString().slice(-5)}${seq++}`;

const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || 'CG';

const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const MONTHS_LONG = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const formatDate = (d) =>
  `${String(d.getDate()).padStart(2, '0')} ${MONTHS_LONG[d.getMonth()]} ${d.getFullYear()}`;

export function StoreProvider({ children }) {
  const [leads, setLeads] = useState(seed.leads);
  const [visits, setVisits] = useState(seed.visits);
  const [registrations, setRegistrations] = useState(seed.registrations);
  const [notifications, setNotifications] = useState(seed.notifications);
  const [profile, setProfile] = useState(seed.profile);
  const [session, setSession] = useState({
    mobile: '',
    signedIn: false,
    onboarding: {
      partnerType: 'channel-partner',
      entityType: '',
      firstName: '',
      lastName: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      knowsEmployee: '',
      company: '',
      rera: '',
      experience: '',
      uploads: {},
      localExperience: 'No',
      facebook: '',
      instagram: '',
      youtube: '',
    },
  });

  const addLead = useCallback((input) => {
    const lead = {
      id: nextId('LD'),
      name: input.name || 'New Lead',
      initials: initials(input.name),
      project: seed.project.name,
      configuration: input.category || 'Residential',
      temperature: input.temperature || 'Warm',
      status: 'New',
      source: 'App',
      followUp: formatDate(new Date(Date.now() + 7 * 864e5)),
      phone: input.phone || '',
      email: input.email || '',
      address: input.address || '',
      city: input.city || '',
      state: input.state || '',
      category: input.category || 'Residential',
      interest: {
        project: seed.project.name,
        configuration: input.category || '—',
        budget: '—',
        preferredFloor: '—',
        possession: seed.project.possession,
        financing: '—',
      },
      notes: input.remarks || 'No remarks added yet.',
      history: [
        {
          date: formatDate(new Date()),
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          title: 'Lead Created',
          detail: `Created in app by ${profile.name}`,
          by: profile.name,
          tone: 'done',
        },
      ],
    };
    setLeads((prev) => [lead, ...prev]);
    return lead;
  }, [profile.name]);

  const updateLead = useCallback((id, patch) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id !== id) return l;
        const next = { ...l, ...patch };
        const entries = [];
        if (patch.status && patch.status !== l.status) {
          entries.push({
            date: formatDate(new Date()),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            title: `Status → ${patch.status}`,
            detail: patch.note || 'Updated from the app',
            by: profile.name,
            tone: 'done',
          });
        }
        if (patch.temperature && patch.temperature !== l.temperature) {
          entries.push({
            date: formatDate(new Date()),
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
            title: `Marked ${patch.temperature}`,
            detail: 'Lead temperature changed',
            by: profile.name,
            tone: 'pending',
          });
        }
        if (patch.note) next.notes = patch.note;
        if (entries.length) next.history = [...l.history, ...entries];
        return next;
      })
    );
  }, [profile.name]);

  const addVisit = useCallback((input) => {
    const when = input.date ? new Date(input.date) : new Date(Date.now() + 2 * 864e5);
    const visit = {
      id: nextId('VS'),
      name: input.name || 'New Visitor',
      initials: initials(input.name),
      project: seed.project.name,
      visitorType: input.visitorType || 'Client',
      status: 'New',
      date: formatDate(when),
      day: String(when.getDate()).padStart(2, '0'),
      month: MONTHS[when.getMonth()],
      time: input.time || '11:30 AM',
      mobile: input.mobile || '',
      email: input.email || '',
      address: [input.city, input.state].filter(Boolean).join(', ') || input.address || '',
      site: `${seed.project.name}, ${seed.project.location}`,
      bookedBy: 'You (Channel Partner)',
      notes: input.notes || 'No special requirements noted.',
      history: [
        {
          date: `${formatDate(new Date())} · ${new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`,
          title: 'Visit scheduled',
          detail: input.time || '11:30 AM',
          tone: 'gold',
        },
      ],
    };
    setVisits((prev) => [visit, ...prev]);
    return visit;
  }, []);

  const updateVisit = useCallback((id, patch) => {
    setVisits((prev) => prev.map((v) => (v.id === id ? { ...v, ...patch } : v)));
  }, []);

  const addRegistration = useCallback((onboarding) => {
    const name = `${onboarding.firstName} ${onboarding.lastName}`.trim() || 'New Partner';
    const reg = {
      id: `CG-REG-2026-0${registrations.length + 108}`,
      name,
      initials: initials(name),
      status: 'Pending',
      stage: 'Pending',
      category:
        seed.partnerTypes.find((p) => p.id === onboarding.partnerType)?.label || 'Channel Partner',
      firm: onboarding.company || 'Independent',
      project: seed.project.name,
      registeredOn: formatDate(new Date()),
      date: formatDate(new Date()),
      phone: onboarding.mobile || '—',
      email: onboarding.email || '—',
      address: onboarding.address || '—',
      city: onboarding.city || '—',
      state: onboarding.state || '—',
      pincode: onboarding.pincode || '—',
      dob: '—',
      anniversary: '—',
      company: onboarding.company || 'Independent',
      rera: onboarding.rera || '—',
      experience: onboarding.experience || '—',
      registrationDate: formatDate(new Date()),
      accountStatus: 'Under Review',
    };
    setRegistrations((prev) => [reg, ...prev]);
    return reg;
  }, [registrations.length]);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }, []);

  const setOnboarding = useCallback((patch) => {
    setSession((s) => ({ ...s, onboarding: { ...s.onboarding, ...patch } }));
  }, []);

  const signIn = useCallback((mobile) => {
    setSession((s) => ({ ...s, mobile, signedIn: true }));
  }, []);

  const signOut = useCallback(() => {
    setSession((s) => ({ ...s, signedIn: false, mobile: '' }));
  }, []);

  const value = useMemo(
    () => ({
      // live collections
      leads,
      visits,
      registrations,
      notifications,
      profile,
      session,
      // static seed data
      project: seed.project,
      inventory: seed.inventory,
      documents: seed.documents,
      news: seed.news,
      mis: seed.mis,
      about: seed.about,
      terms: seed.terms,
      images: seed.images,
      app: seed.app,
      homeBanners: seed.homeBanners,
      // actions
      addLead,
      updateLead,
      addVisit,
      updateVisit,
      addRegistration,
      markAllNotificationsRead,
      setOnboarding,
      setProfile,
      signIn,
      signOut,
      unreadCount: notifications.filter((n) => n.unread).length,
    }),
    [
      leads,
      visits,
      registrations,
      notifications,
      profile,
      session,
      addLead,
      updateLead,
      addVisit,
      updateVisit,
      addRegistration,
      markAllNotificationsRead,
      setOnboarding,
      signIn,
      signOut,
    ]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside <StoreProvider>');
  return ctx;
}
