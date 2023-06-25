<template>
	<div class="card w-full bg-base-100 shadow-xl" v-if="!loading">
		<button class="btn btn-secondary" @click="goBackHome()">Back</button>
		<div class="card-body">
			<div class="flex">
				<h2 class="card-title">{{ lead.lead_origin }}</h2>
				<h2 class="m-auto text-left card-title">{{ lead.when }}</h2>
			</div>
			<p>Did you get the number?</p>
			<span>{{ lead.number }}</span>
			<p>How did you meet?</p>
			<span>{{ lead.meet }}</span>
			<p>Type of game?</p>
			<span>{{ lead.type }}</span>
			<p>Where was the approach</p>
			<span>{{ lead.where }}</span>
			<p>Details</p>
			<span>{{ lead.details }}</span>
		</div>
		<button class="btn btn-error mb-2" @click="deleteBtn(lead.id)">
			Delete
		</button>
		<label htmlFor="my-modal" class="btn btn-warning"> Edit</label>

		<!-- modal -->
		<div>
			<input type="checkbox" id="my-modal" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg">Add towards your progress</h3>
					<div>
						<input
							type="text"
							placeholder="When"
							v-model="lead.when"
							class="input input-bordered w-full max-w-xs m-2"
						/>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="lead.lead_origin"
						>
							<option value="" disabled selected>Type of a game</option>
							<option>Day Game</option>
							<option>Night Game</option>
							<option>Online</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="lead.meet"
						>
							<option value="" disabled selected>Where did you meet?</option>
							<option>Cold Approach</option>
							<option>Online</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="lead.number"
						>
							<option class="text-black" value="" disabled selected>
								Number
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>

						<select
							class="select w-full select-bordered max-w-xs m-3"
							v-model="lead.where"
							aria-placeholder="Where"
						>
							<option value="" disabled selected>Where</option>
							<option value="street">Street</option>
							<option value="gym">Gym</option>
							<option value="mall">Mall</option>
							<option value="club">Club</option>
						</select>

						<textarea
							class="textarea textarea-bordered w-full m-2"
							placeholder="Details"
							v-model="lead.details"
						></textarea>
					</div>
					<div class="modal-action">
						<label htmlFor="my-modal" @click="editBtn(lead.id)" class="btn"
							>Save</label
						>
						<label htmlFor="my-modal" class="btn">Close</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { useRoute, useRouter } from 'vue-router';
	import { useLeads } from '../stores/leads.js';
	import { storeToRefs } from 'pinia';
	import { ref, onMounted, computed, reactive, watch } from 'vue';
	import { useToast } from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-bootstrap.css';
	const { deleteLead, editLead } = useLeads();
	const router = useRouter();
	const route = useRoute();
	const leadStore = useLeads();
	const { leads } = storeToRefs(leadStore);
	const loading = ref(true); // initialize a loading state
	const lead = ref([]);
	const toast = useToast();

	const deleteBtn = async (id) => {
		const res = await deleteLead(id);
		if (res === 204) {
			console.log('Deleted...');
			router.push({ name: 'home' });
			toast.success('Deleted');
		}
	};

	// TODO:Make sure to send to data base only parts that are editted
	const leadId = route.params.id;
	let filter = () => {
		lead.value = leads.value?.find((lead) => lead.id == leadId);
	};

	const editBtn = async (id) => {
		const res = await editLead(id, lead.value);
		if (res === 204) {
			console.log('Edited...');
			toast.success('Edited');
		} else {
			toast.success(res.message);
		}
	};

	const goBackHome = () => {
		router.push({ name: 'home' });
	};

	onMounted(async () => {
		await leadStore.getAllLeads();
		filter();
		loading.value = false;
	});
</script>

<style></style>
