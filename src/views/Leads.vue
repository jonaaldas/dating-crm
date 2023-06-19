<template>
	<div>
		<div>
			<div class="overflow-x-auto">
				<table class="table w-full">
					<thead>
						<tr>
							<th>#</th>
							<th>When</th>
							<th>Number</th>
							<th>Date</th>
							<th>Meet</th>
							<th>Where</th>
							<th>Lead Origin</th>
						</tr>
					</thead>
					<tbody>
						<tr
							class="cursor-pointer"
							v-for="(lead, index) in leads"
							:key="index"
							@click="navigateToGame(lead.id)"
						>
							<th>{{ index + 1 }}</th>
							<td>{{ lead.when }}</td>
							<td>{{ lead.number }}</td>
							<td>{{ lead.date }}</td>
							<td>{{ lead.meet }}</td>
							<td>{{ lead.where }}</td>
							<td>{{ lead.lead_origin }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import { useLeads } from '../stores/leads';
	import { ref, onMounted } from 'vue';
	import { storeToRefs } from 'pinia';
	const leadStore = useLeads();
	const router = useRouter();
	const { leads } = storeToRefs(leadStore);
	const navigateToGame = (id) => {
		router.push({ name: 'eachGame', params: { id } });
	};
	onMounted(async () => {
		await leadStore.getAllLeads();
	});
</script>

<style></style>
