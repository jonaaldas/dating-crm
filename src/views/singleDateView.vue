<template>
	<div class="card w-full bg-base-100 shadow-xl" v-if="!loading">
		<button class="btn btn-secondary" @click="goBackHome()">Back</button>
		<div class="card-body">
			<div class="flex">
				<h2 class="card-title">{{ date.date }}</h2>
				<h2 class="m-auto text-left card-title">{{ date.when }}</h2>
			</div>
			<p>Did you get the close?</p>
			<span>{{ date.close }}</span>
			<p>Where did you meet?</p>
			<span>{{ date.where }}</span>
			<p>Going on another date??</p>
			<span>{{ date.another_date }}</span>
			<p>Details</p>
			<span>{{ date.details }}</span>
		</div>
		<button class="btn btn-error mb-2" @click="deleteBtn(date.id)">
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
							v-model="date.when"
							class="input input-bordered w-full max-w-xs m-2"
						/>
						<input
							type="text"
							placeholder="When"
							v-model="date.where"
							class="input input-bordered w-full max-w-xs m-2"
						/>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="date.close"
						>
							<option class="text-black" value="" disabled selected>
								Number
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>
						<select
							class="select select-bordered w-full max-w-xs m-3"
							v-model="date.close"
						>
							<option class="text-black" value="" disabled selected>
								Close?
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>

						<select
							class="select w-full select-bordered max-w-xs m-3"
							v-model="date.another_date"
							aria-placeholder="Where"
						>
							<option class="text-black" value="" disabled selected>
								Another Date?
							</option>
							<option value="true">Yes</option>
							<option value="false">No</option>
						</select>

						<textarea
							class="textarea textarea-bordered w-full m-2"
							placeholder="Details"
							v-model="date.details"
						></textarea>
					</div>
					<div class="modal-action">
						<label htmlFor="my-modal" @click="editBtn(date.id)" class="btn"
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
	import { useDates } from '../stores/date.js';
	import { storeToRefs } from 'pinia';
	import { ref, onMounted } from 'vue';
	import { useToast } from 'vue-toast-notification';
	import 'vue-toast-notification/dist/theme-bootstrap.css';
	const { deleteDate, editDate } = useDates();
	const router = useRouter();
	const route = useRoute();
	const dateStore = useDates();
	const { dates } = storeToRefs(dateStore);
	const loading = ref(true); // initialize a loading state
	const date = ref([]);
	const toast = useToast();

	const deleteBtn = async (id) => {
		const res = await deleteDate(id);
		if (res === 204) {
			console.log('Deleted...');
			router.push({ name: 'home' });
			toast.success('Deleted');
		}
	};

	// TODO:Make sure to send to data base only parts that are editted
	const dateId = route.params.id;
	let filter = () => {
		date.value = dates.value?.find((date) => date.id == dateId);
	};

	const editBtn = async (id) => {
		const res = await editDate(id, date.value);
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
		await dateStore.getAllDates();
		filter();
		loading.value = false;
	});
</script>

<style></style>
