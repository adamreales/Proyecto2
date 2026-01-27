import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(
        <h1>React funciona 🎮</h1>
    );
}
