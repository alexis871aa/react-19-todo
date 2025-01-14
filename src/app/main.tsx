import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { App } from './app';
import './index.css';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</StrictMode>,
);
