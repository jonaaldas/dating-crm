<template>
	<div>
		<label
			htmlFor="my-modal"
			class="btn btn-circle bg-secondary content-center"
		>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
				<path
					d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
				/>
			</svg>
		</label>

		<div>
			<input type="checkbox" id="my-modal" class="modal-toggle" />
			<div class="modal">
				<div class="modal-box">
					<h3 class="font-bold text-lg">Add towards your progress</h3>
					<div>
						<input
							class="input input-bordered w-full max-w-xs m-2"
							type="date"
							id="start"
							name="trip-start"
							:value="new Date().toISOString().substr(0, 10)"
							@input="handleDate($event.target.value)"
							required
						/>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="newLead.lead_origin"
						>
							<option value="" disabled selected>Type of a game</option>
							<option>Day Game</option>
							<option>Night Game</option>
							<option>Online</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="newLead.meet"
						>
							<option value="" disabled selected>Where did you meet?</option>
							<option>Cold Approach</option>
							<option>Online</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="newLead.number"
						>
							<option class="text-black" value="" disabled selected>
								Number
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>

						<select
							class="select w-full select-bordered max-w-xs m-3"
							v-model="newLead.where"
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
							v-model="newLead.details"
						></textarea>
					</div>
					<div class="modal-action">
						<label htmlFor="my-modal" @click="addNew()" class="btn">Add</label>
						<label htmlFor="my-modal" class="btn">Close</label>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { useLeads } from '../stores/leads';

	const { addNewLead } = useLeads();

	let newLead = ref({
		id: '',
		where: '',
		when: '',
		meet: '',
		lead_origin: '',
		details: '',
		number: false,
		date: false,
	});

	const date = ref('');

	const addNew = () => {
		addNewLead(newLead.value);
	};
	const handleDate = (dateInput) => {
		date.value = dateInput;
		newLead.value.when = dateInput;
	};
</script>

<style>
	.btn-circle {
		height: 5rem !important;
		width: 5rem !important;
	}
</style>
