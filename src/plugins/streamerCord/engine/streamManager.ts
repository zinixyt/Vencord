/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { settings } from "@plugins/streamerCord/settings";

import { broadcastStream, stopBroadcast } from "./broadcaster";

// Map: HTMLVideoElement -> Stream ID (e.g. "Zinix_video")
const capturedElements = new Map<HTMLVideoElement, string>();

export function handleNewVideoElement(video: HTMLVideoElement) {
    if (capturedElements.has(video)) return;

    // Wait for metadata so we know the resolution (avoids 0x0 errors)
    if (video.readyState < 1) {
        video.addEventListener("loadedmetadata", () => handleNewVideoElement(video), { once: true });
        return;
    }

    // 1. Identification: Who owns this video?
    // We look for the "Tile" wrapper, then the username.
    const tile = video.closest("[class*='tile-'], [class*='wrapper-'], [class*='callContainer-']");
    let username = "Unknown";

    if (tile) {
        // These selectors change often. We try standard ones.
        const nameEl = tile.querySelector("[class*='username-'], [class*='name-'], [aria-label]");
        if (nameEl?.textContent) username = nameEl.textContent;
        // Fallback: If in a DM call, might just be "Partner"
    }

    // Clean username for URL (remove spaces, special chars)
    const safeName = username.replace(/[^a-zA-Z0-9_-]/g, "");
    const streamId = `${safeName}_${Math.floor(Math.random() * 1000)}`;
    const port = settings.store.serverPort || 4455;

    console.log(`[StreamManager] Capturing ${username} (ID: ${streamId})`);

    // 2. The Capture Method (Steve's Secret)
    let stream: MediaStream;
    try {
        // @ts-ignore
        stream = video.captureStream();
    } catch (e) {
        console.error("[StreamManager] Failed to capture stream:", e);
        return;
    }

    if (!stream) return;

    // 3. Broadcast
    stream.getTracks().forEach(track => {
        // e.g. "Zinix_123_video"
        const finalId = `${streamId}_${track.kind}`;
        broadcastStream(track, finalId, port);
    });

    capturedElements.set(video, streamId);
}

// Called by Observer when a node is removed
export function handleRemovedVideoElement(video: HTMLVideoElement) {
    const baseId = capturedElements.get(video);
    if (baseId) {
        // Stop both video and audio tracks for this ID
        stopBroadcast(`${baseId}_video`);
        stopBroadcast(`${baseId}_audio`);
        capturedElements.delete(video);
    }
}
