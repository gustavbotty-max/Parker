# Gustavbotty Calendar & Email Setup Reference

## Authentication Details
- **Gmail Account:** gustavbotty@gmail.com
- **App Password:** tftmcguxiwzbxnag (for IMAP/SMTP email access)
- **Gog Keyring:** ImMrGustavBotty2000# (for Google Calendar API)
- **Status:** ✅ Fully operational - calendar and email access confirmed

## Email Access (IMAP/SMTP)
```bash
# Check emails
python3 -c "
import imaplib
imap = imaplib.IMAP4_SSL('imap.gmail.com', 993)
imap.login('gustavbotty@gmail.com', 'tftmcguxiwzbxnag')
imap.select('INBOX')
status, messages = imap.search(None, 'UNSEEN')
print(f'Unread emails: {len(messages[0].split())}')
imap.logout()
"
```

## Calendar Access (Google Calendar API)
```bash
# Keyring setup
export GOG_KEYRING_PASSWORD="ImMrGustavBotty2000#"
export GOG_ACCOUNT="gustavbotty@gmail.com"

# List calendars
gog calendar list

# Create event
gog calendar create primary --summary "Event Name" --from "2026-02-10T12:00:00-05:00" --to "2026-02-10T13:00:00-05:00" --attendees "klparker0206@gmail.com" --description "Event description" -location "Location if needed"

# List upcoming events
gog calendar events primary --from "$(date -I)" --to "$(date -I -d '+7 days')" --details

# Check free/busy times
gog calendar free-busy primary --from "2026-02-10T08:00:00-05:00" --to "2026-02-10T18:00:00-05:00"
```

## Important Contacts
- **Jonathan Parser:** jlparker0106@gmail.com
- **Kristen Parker:** klparker0206@gmail.com
- **Gustavbotty:** gustavbotty@gmail.com

## Calendar Commands Available
- ✅ Create events with attendees
- ✅ List events and calendars
- ✅ Check free/busy times
- ✅ Search events
- ✅ Update/delete events
- ✅ Send calendar invitations

## Email Commands Available
- ✅ Read emails (IMAP)
- ✅ Send emails (SMTP)
- ✅ Check unread messages
- ✅ Monitor for calendar invitations
- ✅ Set up email alerts

## Timezone
- **Eastern Time Zone** (UTC-5/-4)
- Use format: `2026-02-10T12:00:00-05:00`

## Event Creation Template
```bash
export GOG_KEYRING_PASSWORD="ImMrGustavBotty2000#"
gog calendar create primary \
  --summary "Meeting Title" \
  --from "YYYY-MM-DDTHH:MM:SS-05:00" \
  --to "YYYY-MM-DDTHH:MM:SS-05:00" \
  --attendees "email1@example.com,email2@example.com" \
  --description "Meeting description" \
  --location "In person/Online/TBD"
```

## Quick Reference
- **Calendar event:** Use above template
- **Email check:** Python script with IMAP access
- **Attendee emails:** jlparker0106@gmail.com, klparker0206@gmail.com
- **Keyring password:** ImMrGustavBotty2000#

**Last Updated:** 2026-02-10
**Status:** ✅ Full calendar and email access operational