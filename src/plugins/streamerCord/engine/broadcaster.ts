/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

const activeBroadcasts = new Map<string, { pc: RTCPeerConnection, ws: WebSocket; }>();

export async function broadcastStream(track: MediaStreamTrack, streamId: string, port: number = 4455) {
    // Prevent duplicates
    if (activeBroadcasts.has(streamId)) return;

    console.log(`[Broadcaster] Starting stream: ${streamId}`);

    // 1. Connect to Local Signaling Server
    const ws = new WebSocket(`ws://127.0.0.1:${port}/${streamId}?mode=sender`);
    const pc = new RTCPeerConnection();

    activeBroadcasts.set(streamId, { pc, ws });

    // 2. Add Track
    const stream = new MediaStream([track]);
    pc.addTrack(track, stream);

    // 3. Signaling Logic
    pc.onicecandidate = e => e.candidate && ws.send(JSON.stringify({ candidate: e.candidate }));

    ws.onmessage = async msg => {
        const data = JSON.parse(msg.data);
        if (data.sdp) await pc.setRemoteDescription(data.sdp);
        else if (data.candidate) await pc.addIceCandidate(data.candidate);
    };

    // 4. Start Call
    ws.onopen = async () => {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify({ sdp: offer }));
    };

    // 5. Cleanup
    // Note: DOM tracks don't always fire "ended", so we rely on streamManager to kill us if the node disappears
    track.onended = () => stopBroadcast(streamId);
    ws.onclose = () => stopBroadcast(streamId);
}

export function stopBroadcast(streamId: string) {
    const session = activeBroadcasts.get(streamId);
    if (session) {
        session.pc.close();
        session.ws.close();
        activeBroadcasts.delete(streamId);
        console.log(`[Broadcaster] Stopped stream: ${streamId}`);
    }
}

export function stopAllBroadcasts() {
    activeBroadcasts.forEach((_, id) => stopBroadcast(id));
}
