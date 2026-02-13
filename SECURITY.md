# Security Policy

## Reporting a Vulnerability

We take the security of `hardware-web-binding` seriously. Because this project interacts with physical hardware, security is our top priority.

If you discover a security vulnerability within this project (e.g., bypassing permission prompts, unauthorized device access), please **DO NOT** open a public issue on GitHub. Instead, follow these steps:

1.  Email our security team directly at: **[salim.marwan2001@gmail.com]**
2.  Please include "Security Vulnerability" in the subject line.
3.  We will acknowledge your email within 48 hours and provide a timeline for the fix.

## Security Model (For Reviewers & Implementers)

Since this project proposes a Web Standard, we strictly adhere to the **W3C Security & Privacy guidelines**.

### 1. User Gesture Requirement (Transient Activation)
The API is designed to **never** allow connection to a hardware device without an explicit user gesture (e.g., a mouse click or touch event).
-   Attributes like `hw-device` do not trigger a connection on page load.
-   A specific interaction (click) is mandated by the browser's security model.

### 2. Browser-Level Permissions
This Polyfill relies on the underlying browser security models (Web Bluetooth / Web Serial).
-   The **Browser Native Chooser** handles device selection.
-   The web page (and this library) **cannot** see the list of available devices without explicit user permission.
-   This library cannot bypass the browser's permission prompt.

### 3. HTTPS Only (Secure Context)
As per modern web standards, this API is available **only** in Secure Contexts (HTTPS) and `localhost`. It will not function on HTTP pages to prevent Man-in-the-Middle attacks.

### 4. Data Privacy
This library acts as a declarative bridge. It does not store, log, or transmit sensor data to any external server. All data processing happens locally within the client's browser session.

---
**Al-Sadeem LLC Security Team**
