# Contributing to Hardware Web Binding (HWB)

First off, thank you for considering contributing to the Hardware Web Binding proposal! It's people like you that make the Web a powerful platform for hardware.

This project is maintained by **Al-Sadeem LLC** and the open-source community. We welcome contributions from everyone—whether you're fixing a typo, adding a new hardware driver, or proposing a spec change.

## 1. How to Contribute

### Reporting Bugs
If you find a bug in the Polyfill or an error in the Spec:
1.  **Check existing issues** to see if it has already been reported.
2.  Open a **New Issue** using the "Bug Report" template.
3.  Include details about your environment:
    -   Browser & Version (e.g., Chrome 120)
    -   Operating System (Windows, macOS, Linux, Android)
    -   Hardware Device (e.g., ESP32, Arduino Uno, Micro:bit)

### Proposing Features (RFCs)
If you have an idea for a new feature (e.g., adding support for MQTT or WebHID):
* **Do not open a Pull Request immediately.**
* Open an Issue first to discuss the design.
* Title it: `[Proposal] Your Feature Name`.

## 2. Development Workflow

1.  **Fork** the repository to your own GitHub account.
2.  **Clone** the project to your machine.
3.  Create a new **Branch**:
    ```bash
    git checkout -b my-new-feature
    ```
4.  Make your changes and commit them:
    ```bash
    git commit -m "feat: Add support for DHT11 sensor"
    ```
5.  **Push** to your fork and submit a **Pull Request**.

## 3. Coding Standards

* **JavaScript:** Use modern ES6+ syntax.
* **Formatting:** We use Prettier. Please run formatting before committing.
* **Comments:** Code must be well-documented. If it's a complex logic, explain *why* you did it, not just *what* you did.

## 4. License & IP

By contributing your code, you agree to license your contribution under the **MIT License**. This ensures the project remains open and free for everyone to use, including in commercial products.

---
**Happy Hacking!**
*Salim Marwan & The Al-Sadeem Team*
