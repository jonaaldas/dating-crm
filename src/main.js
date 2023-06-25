import { createPinia } from 'pinia';
import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import App from './App.vue';
import './assets/tailwind.css';
import router from './router';
import './styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);

app.mount('#app');

if (typeof navigator.serviceWorker !== 'undefined') {
	navigator.serviceWorker
		.register('../src/service-worker.js')
		.then(() => console.log('Registration succeeded.'))
		.catch((error) => console.log('Registration failed: ', error));

	navigator.serviceWorker.ready.then((e) => {
		// Put whatever code requires an active service worker here.
		console.log('Worker ready', e);
	});
} else {
	console.log('No worker');
}
