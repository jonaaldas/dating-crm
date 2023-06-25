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
					<h3 class="font-bold text-lg">Add a new date</h3>
					<div>
						<input
							type="text"
							placeholder="When"
							v-model="newDate.when"
							class="input input-bordered w-full max-w-xs m-2"
						/>
						<input
							type="text"
							placeholder="Where"
							v-model="newDate.where"
							class="input input-bordered w-full max-w-xs m-2"
						/>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="newDate.close"
						>
							<option value="" disabled selected>Did you close?</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="newDate.another_date"
						>
							<option value="" disabled selected>
								Did you get another date?
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
						<textarea
							class="textarea textarea-bordered w-full m-2"
							placeholder="Details"
							v-model="newDate.details"
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
	import { useDates } from '../stores/date';

	const { addNewDate } = useDates();

	const newDate = ref({
		where: '',
		when: '',
		close: false,
		another_date: false,
		details: '',
	});

	const addNew = () => {
		addNewDate(newDate.value);
	};
</script>

<style>
	.btn-circle {
		height: 5rem !important;
		width: 5rem !important;
	}
</style>
