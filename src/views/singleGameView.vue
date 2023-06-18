<template>
	<div class="card w-full bg-base-100 shadow-xl">
		<div class="card-body">
			<div class="flex">
				<h2 class="card-title">{{ lead[0].lead_origin }}</h2>
				<h2 class="m-auto text-left card-title">{{ lead[0].when }}</h2>
			</div>
			<p>Did you get the number?</p>
			<span>{{ lead[0].number }}</span>
			<p>How did you meet?</p>
			<span>{{ lead[0].meet }}</span>
			<p>Type of game?</p>
			<span>{{ lead[0].type }}</span>
			<p>Where was the approach</p>
			<span>{{ lead[0].where }}</span>
			<p>Details</p>
			<span>{{ lead[0].details }}</span>
		</div>
		<button class="btn btn-error" @click="deleteBtn(lead[0].id)">Delete</button>
	</div>
</template>

<script>
	import { useRoute, useRouter } from 'vue-router';
	import { useLeads } from '../stores/leads.js';
	import { mapStores } from 'pinia';
	const { leads } = useLeads();
	const route = useRoute();

	export default {
		data() {
			return {
				lead: [],
			};
		},
		methods: {
			async deleteBtn(id) {
				const { deleteLead } = useLeads();
				const router = useRouter();
				const res = await deleteLead(id);
				if (res === 204) {
					console.log('Deleted...');
					router.push({ name: 'home' });
				}
			},
			filterLeadas() {
				// this.lead = leads.filter((approach) => {
				// 	return approach.id == route.params.id;
				// });
			},
		},
		computed: {
			// note we are not passing an array, just one store after the other
			// each store will be accessible as its id + 'Store'
			...mapStores(useLeads),
		},
		async mounted() {
			// this.filterLeadas();
			console.log(leads);
		},
	};
</script>

<style></style>
