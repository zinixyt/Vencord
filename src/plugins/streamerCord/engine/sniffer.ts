/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { settings } from "@plugins/streamerCord/settings";

import { broadcastStream } from "./broadcaster";

const NativePeer = window.RTCPeerConnection;

export function injectSnifferClass() {
    // Define the custom class on window so the Patcher can reference it
    // @ts-ignore
    window.VencordPeerConnection = class VencordPeer extends NativePeer {
        constructor(config: any) {
            super(config);

            this.addEventListener("track", (event: RTCTrackEvent) => {
                const { track } = event;
                const streamId = track.id; // Unique ID for this track

                // Optional: Map random ID to Username here if you have the UserStore
                // For now, we use the Track ID.

                console.log(`[Sniffer] Found ${track.kind} track: ${streamId}`);

                // Broadcast it to our local server
                const port = settings.store.serverPort || 4455;
                broadcastStream("", track, streamId, port);
            });
        }
    };
}

export function cleanupSniffer() {
    // @ts-ignore
    delete window.VencordPeerConnection;
}
