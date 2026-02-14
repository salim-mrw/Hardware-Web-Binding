/**
 * Hardware Web Binding (HWB) Polyfill
 * Author: Salim Marwan (Al-Sadeem LLC)
 * License: MIT
 * Description: A declarative engine to bind HTML elements to Hardware via Web APIs.
 */

class HardwareWebBinding {
    constructor() {
        // Dictionary to store currently connected devices
        this.connectedDevices = {};
        
        // Initialize the engine as soon as the instance is created
        this.init();
    }

    /**
     * Scans the DOM for HWB attributes and attaches event listeners.
     */
    init() {
        console.log("HWB Engine Initialized...");

        // 1. Find connection request triggers (hw-request)
        document.querySelectorAll('[hw-request]').forEach(element => {
            element.addEventListener('click', (e) => this.handleRequest(e.target));
        });

        // 2. Find action triggers (hw-action)
        // Example syntax: hw-action="click -> write:1"
        document.querySelectorAll('[hw-action]').forEach(element => {
            const actionStr = element.getAttribute('hw-action'); 
            
            // Parse the event and the command
            const [eventName, command] = actionStr.split('->').map(s => s.trim());
            
            if (eventName && command) {
                element.addEventListener(eventName, (e) => this.handleAction(e.target, command));
            }
        });

        // Note: The logic for hw-bind (automatic reading/polling) will require 
        // an active loop or stream listener. It will be implemented in the next iteration.
    }

    /**
     * Handles the request to connect to a new hardware device.
     * @param {HTMLElement} element - The DOM element triggering the request.
     */
    async handleRequest(element) {
        const requestAttr = element.getAttribute('hw-request'); // e.g., "serial:arduino"
        const [protocol, deviceId] = requestAttr.split(':');

        try {
            if (protocol === 'serial') {
                await this.connectSerial(deviceId);
            } else if (protocol === 'bluetooth') {
                await this.connectBluetooth(deviceId);
            } else {
                console.error(`HWB Error: Protocol '${protocol}' is not supported yet.`);
            }
        } catch (error) {
            console.error(`HWB Connection Failed (${protocol}):, error`);
        }
    }

    /**
     * Initiates a connection via the Web Serial API.
     * @param {string} deviceId - The identifier for the device (e.g., 'arduino').
     */
    async connectSerial(deviceId) {
        // Prompts the user to select a serial port (requires transient activation / user gesture)
        const port = await navigator.serial.requestPort();
        
        // Open the port with a default baud rate for the Proof of Concept
        await port.open({ baudRate: 9600 }); 
        
        const writer = port.writable.getWriter();
        
        // Store the active connection for future actions
        this.connectedDevices[deviceId] = {
            type: 'serial',
            port: port,
            writer: writer
        };
        
        console.log(`HWB: Successfully connected to Serial device '${deviceId}'`);
    }

    /**
     * Initiates a connection via the Web Bluetooth API.
     * @param {string} deviceId - The identifier for the device (e.g., 'esp32').
     */
    async connectBluetooth(deviceId) {
        // Simplified Bluetooth connection for the Proof of Concept
        const device = await navigator.bluetooth.requestDevice({ acceptAllDevices: true });
        
        this.connectedDevices[deviceId] = {
            type: 'bluetooth',
            device: device
        };
        
        console.log(`HWB: Successfully connected to Bluetooth device '${deviceId}'`);
    }

    /**
     * Executes a command on a connected device based on DOM interactions.

* @param {HTMLElement} element - The DOM element triggering the action.
     * @param {string} command - The parsed command string (e.g., 'write:1').
     */
    async handleAction(element, command) {
        const deviceId = element.getAttribute('hw-device'); // e.g., "arduino"
        const device = this.connectedDevices[deviceId];

        if (!device) {
            console.warn(`HWB Warning: Cannot execute action. Device '${deviceId}' is not connected.`);
            return;
        }

        // Parse action type and payload (e.g., "write:1" -> type="write", payload="1")
        const [actionType, payload] = command.split(':'); 

        if (actionType === 'write') {
            if (device.type === 'serial') {
                // Encode the text string to a Uint8Array for serial transmission
                const encoder = new TextEncoder();
                const data = encoder.encode(payload + '\n'); // Adding a newline as a standard terminator
                
                await device.writer.write(data);
                console.log(`HWB: Sent payload '${payload}' to '${deviceId}'`);
            } else {
                console.warn(`HWB Notice: Write action for Bluetooth is not fully implemented in this demo.`);
            }
        }
    }
}

// Automatically initialize the polyfill once the DOM is fully loaded
window.addEventListener('DOMContentLoaded', () => {
    window.HWB_Engine = new HardwareWebBinding();
});