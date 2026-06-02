# Privacy Policy — Dartrak

**Last updated: 2 June 2026**

Dartrak ("the app", "we", "us") is a darts scoring application. This policy explains
what data the app handles, where it lives, and your rights over it.

Our guiding principle is **local-first, privacy by default**: Dartrak works 100%
offline and stores everything on your device. Nothing leaves your phone unless you
*explicitly* choose to sign in and enable cloud sync.

We **do not** use any analytics, telemetry, tracking, advertising, or crash-reporting
services. We do not sell, rent, or share your data with third parties for marketing.

---

## 1. What works without any account or network

By default — and forever, if you choose — Dartrak runs entirely on your device:

- **Game data** (players, scores, match history, statistics) is stored locally in an
  on-device SQLite database.
- **App settings** (language, display preferences, notification toggle) are stored
  locally.
- No internet connection is required and **no data is transmitted** anywhere.

In this default mode, **we collect nothing**, because no data ever reaches us.

---

## 2. Microphone & voice score entry (optional, on-device)

Dartrak offers optional **voice score entry**. When you enable it, the app uses your
device's microphone and speech recognition to transcribe spoken scores (e.g. "treble
twenty").

- Recognition runs **on your device**. Your voice is **not** recorded, stored, or sent
  to us or to any third-party server by the app.
- The microphone is accessed **only** while you are actively using voice entry.
- You can decline or revoke the microphone permission at any time in your device
  settings; the rest of the app continues to work normally.

Note: on-device speech recognition is provided by your operating system (Android /
iOS). Your device manufacturer's own speech-recognition behaviour is governed by their
respective privacy policies.

---

## 3. Local notifications (optional, on-device)

If you enable reminders in Settings, Dartrak schedules **local, on-device
notifications** (a daily streak reminder and an occasional reminder to back up your
stats).

- These notifications are scheduled entirely on your device. There are **no push
  tokens, no remote scheduling, and no network activity**.
- Notification permission is requested **only** when you explicitly turn the feature on
  — never at first launch.
- You can disable reminders at any time in Settings or in your device settings.

---

## 4. Optional accounts & cloud sync (opt-in only)

Dartrak lets you optionally sign in with **Google** to back up your games and connect
with friends. This is entirely **opt-in**: the cloud layer stays inert until you sign
in, and signing out returns you to fully local operation.

If — and only if — you sign in, the following data is processed by our cloud provider:

- **Account identity**: the identifier and email address provided by Google sign-in,
  used solely to create and secure your account.
- **Your game data**: games and statistics you choose to sync, so you can restore them
  on another device.
- **Friends data**: friend connections and friend requests you create, so the friends
  feature can function.

Your synced data is **isolated per user** and protected by row-level security (RLS): no
other user can read or modify your data.

Authentication tokens are stored securely on your device using the operating system's
secure storage (Keychain on iOS, Keystore on Android).

### Cloud sub-processor

When you enable sync, data is stored and processed by **Supabase**, our hosting and
database sub-processor, acting on our behalf under appropriate data-protection terms.

---

## 5. Data you export or share

Dartrak lets you export or share your own statistics (for example as an image or file)
via your device's standard share sheet. Where that data goes is entirely your choice and
under your control.

---

## 6. Your rights (GDPR)

Dartrak is designed to be GDPR-compliant.

- **Local data**: you control it directly. Deleting the app or clearing its data removes
  all locally stored information from your device.
- **Synced data** (only if you signed in): you have the right to access, correct, export,
  and delete your data. You can delete your synced data by deleting your account, after
  which it is removed from our cloud storage.
- **Legal basis**: where we process synced data, the basis is your consent (the act of
  signing in and enabling sync), which you may withdraw at any time by signing out and
  requesting deletion.

To exercise any right, contact us at the address below.

---

## 7. Children's privacy

Dartrak does not knowingly collect personal data from children. The app contains no ads,
no in-app purchases, and no behavioural tracking.

---

## 8. Data retention

- **Local data** remains on your device until you delete it (or uninstall the app).
- **Synced data** is retained while your account exists, and is deleted when you delete
  your account.

---

## 9. Changes to this policy

We may update this policy as the app evolves. Material changes will be reflected by an
updated "Last updated" date. Continued use after an update constitutes acceptance of the
revised policy.

---

## 10. Contact

For any privacy question or to exercise your rights:

**Email:** simon.farail@smile.fr

---

*Dartrak contains no advertising, no in-app purchases, and no tracking. It is free and
local-first by design.*
