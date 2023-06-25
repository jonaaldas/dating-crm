import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import singleDateView from '../views/singleDateView.vue';
import singleGameView from '../views/singleGameView.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/game/:id',
			name: 'eachGame',
			component: singleGameView,
		},
		{
			path: '/date/:id',
			name: 'eachDate',
			component: singleDateView,
		},
	],
});

export default router;
