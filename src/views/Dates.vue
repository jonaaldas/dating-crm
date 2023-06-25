<template>
	<div>
		<div>
			<div class="overflow-x-auto">
				<table class="table w-full">
					<thead>
						<tr>
							<th>#</th>
							<th>Where</th>
							<th>When</th>
							<th>Close</th>
							<th>Another Date</th>
							<th>Details</th>
						</tr>
					</thead>
					<tbody>
						<tr
							class="cursor-pointer"
							v-for="(date, index) in dates"
							:key="index"
							@click="navigateToGame(date.id)"
						>
							<th>{{ index + 1 }}</th>
							<td>{{ date.where }}</td>
							<td>{{ date.when }}</td>
							<td>{{ date.close }}</td>
							<td>{{ date.another_date }}</td>
							<td>{{ date.details }}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from 'vue-router';
	import { useDates } from '../stores/date';
	import { onMounted } from 'vue';
	import { storeToRefs } from 'pinia';
	const dateStore = useDates();
	const router = useRouter();
	const { dates } = storeToRefs(dateStore);
	const navigateToGame = (id) => {
		router.push({ name: 'eachDate', params: { id } });
	};
	onMounted(async () => {
		await dateStore.getAllDates();
	});
</script>

<style></style>
