/*
 * Vencord, a Discord client mod
 * Copyright (c) 2025 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import { IconComponent } from "@utils/types";

export const NDIIconXS: IconComponent = ({ height = 20, width = 20, className }) => (
    <svg height={height} width={width} viewBox="0 0 24 24" className={className} fill="currentColor">
        {/* A bold, blocky 'NDI' designed for small sizes */}
        <path d="M2 6V18H5L8 11V18H10V6H7L4 13V6H2ZM12 6V18H16C19.31 18 21 16.5 21 12C21 7.5 19.31 6 16 6H12ZM14 8H16C17.5 8 18.5 9 18.5 12C18.5 15 17.5 16 16 16H14V8ZM22 6V18H24V6H22Z" />
    </svg>
);

export const NDIIconL: IconComponent = ({ height = 128, width = 128, className }) => (
    <svg height={height} width={width} viewBox="0 0 128 128" className={className} fill="currentColor">
        {/* Discord-style Squircle Background */}
        <path d="M107.5 128H20.5C9.2 128 0 118.8 0 107.5V20.5C0 9.2 9.2 0 20.5 0H107.5C118.8 0 128 9.2 128 20.5V107.5C128 118.8 118.8 128 107.5 128Z" fill="currentColor" />

        {/* Large, detailed 'NDI' centered inside */}
        <path d="M24 34V94H34L54 64V94H64V34H54L34 64V34H24ZM74 34V94H94C108 94 114 86 114 64C114 42 108 34 94 34H74ZM84 44H94C102 44 104 48 104 64C104 80 102 84 94 84H84V44ZM118 34V94H128V34H118Z" fill="black"/>
    </svg>
);
