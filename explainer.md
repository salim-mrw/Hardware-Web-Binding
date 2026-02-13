# Explainer: Declarative Hardware Web Binding

## Introduction

The web is expanding into the physical world through APIs like Web Bluetooth and Web Serial. However, the barrier to entry remains high. This proposal introduces a declarative layer over these imperative APIs, inspired by how modern frameworks (Vue, React, Alpine) handle data binding.

## Goals

1. **Lower the Barrier:** Enable non-engineers (students, hobbyists) to build hardware interfaces.

2. **Standardize Interaction:**

Create a unified syntax for different protocols (Bluetooth vs. Serial).

3. **Security Abstraction:**

Encapsulate the "Permission Request" flow in a standard UI interaction.

