<template>
	<div class="card w-full bg-base-100 shadow-xl">
		<!-- <div class="card-body">
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
		<button class="btn btn-error" @click="deleteBtn(lead[0].id)">Delete</button> -->
		hello
		<h2 class="card-title">{{ leads }}</h2>
	</div>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { useLeads } from '../stores/leads.js';
	import { storeToRefs } from 'pinia';
	import { onMounted, ref, watch } from 'vue';
	const { deleteLead } = useLeads();
	const router = useRouter();
	const route = useRoute();
	const leadStore = useLeads();
	const { leads } = storeToRefs(leadStore);

	const lead = ref([]);

	const deleteBtn = async (id) => {
		const res = await deleteLead(id);
		if (res === 204) {
			console.log('Deleted...');
			router.push({ name: 'home' });
		}
	};
	const filterLeads = () => {
		console.log(
			'🚀 ~ file: singleGameView.vue:47 ~ filterLeads ~ rawObject:',
			rawObject
		);
		console.log(leads.value);
	};

	onMounted(() => {
		filterLeads();
	});
</script>

<style></style>
