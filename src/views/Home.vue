<template>
	<div>
		<div className="tabs justify-center">
			<a
				class="tab tab-lifted"
				@click="changeTab('game')"
				:class="{ 'tab-active': tab === 'game' }"
				>Approaches</a
			>
			<a
				class="tab tab-lifted"
				@click="changeTab('dates')"
				:class="{ 'tab-active': tab === 'dates' }"
				>Dates</a
			>
		</div>
		<Game v-if="tab === 'game'" />
		<Dates v-if="tab === 'dates'" />
		<div class="flex justify-center content-center fixed bottom-0 w-full">
			<PlusButton v-if="tab === 'game'" />
			<PlusButtonDates v-if="tab === 'dates'" />
		</div>
	</div>
</template>

<script setup>
	import Dates from '../views/Dates.vue';
	import Game from './Leads.vue';
	import PlusButton from '../components/PlusButton.vue';
	import PlusButtonDates from '../components/PlusButtonDates.vue';
	import { ref } from 'vue';
	const tab = ref('game');
	const changeTab = (newTab) => {
		tab.value = newTab;
	};
</script>

<style></style>
