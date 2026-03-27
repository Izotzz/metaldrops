"use client";

const DISPOSABLE_DOMAINS = [
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'throwawaymail.com',
  'yopmail.com',
  'sharklasers.com',
  'dispostable.com',
  'getnada.com',
  'maildrop.cc',
  'boun.cr',
  'tempmail.net',
  'temp-mail.io'
];

export const isDisposableEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return DISPOSABLE_DOMAINS.includes(domain);
};