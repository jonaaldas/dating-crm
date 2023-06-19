<template>
	<div class="card w-full bg-base-100 shadow-xl" v-if="!loading">
		<div class="card-body">
			<div class="flex">
				<h2 class="card-title">{{ filteredLead.lead_origin }}</h2>
				<h2 class="m-auto text-left card-title">{{ filteredLead.when }}</h2>
			</div>
			<p>Did you get the number?</p>
			<span>{{ filteredLead.number }}</span>
			<p>How did you meet?</p>
			<span>{{ filteredLead.meet }}</span>
			<p>Type of game?</p>
			<span>{{ filteredLead.type }}</span>
			<p>Where was the approach</p>
			<span>{{ filteredLead.where }}</span>
			<p>Details</p>
			<span>{{ filteredLead.details }}</span>
		</div>
		<button class="btn btn-error mb-2" @click="deleteBtn(filteredLead.id)">
			Delete
		</button>
		<button class="btn btn-warning">Edit</button>
	</div>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { useLeads } from '../stores/leads.js';
	import { storeToRefs } from 'pinia';
	import { ref, onMounted, computed } from 'vue';
	const { deleteLead } = useLeads();
	const router = useRouter();
	const route = useRoute();
	const leadStore = useLeads();
	const { leads } = storeToRefs(leadStore);
	const loading = ref(true); // initialize a loading state

	const deleteBtn = async (id) => {
		const res = await deleteLead(id);
		if (res === 204) {
			console.log('Deleted...');
			router.push({ name: 'home' });
		}
	};

	const leadId = route.params.id;
	const filteredLead = computed(() => {
		return leads.value?.find((lead) => lead.id == leadId);
	});

	onMounted(async () => {
		await leadStore.getAllLeads();
		loading.value = false;
	});
</script>

<style></style>
