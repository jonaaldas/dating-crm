import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';

let key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1a3dqYXpxcXVodXdlcnFmbGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDQ0OTIsImV4cCI6MjAwMjAyMDQ5Mn0.er61jIGLCQWbP979-g4a228hCye8gMVx3-9y1tTMJB8';
const supabaseUrl = 'https://fukwjazqquhuwerqflhu.supabase.co';
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export const useDates = () => {
	const dates = ref([]);

	const getAllDates = async () => {
		const { data, error } = await supabase.from('Dates').select('*');
		if (data) {
			dates.value.push(...data);
			return true;
		} else {
			console.log(error);
		}
	};

	const addNewDate = async (newLead) => {
		let { where, when, meet, lead_origin, number, date, details } = newLead;
		const { error, status } = await supabase
			.from('Dates')
			.insert({ where, when, meet, lead_origin, details, number, date });
		if (error) {
			console.log(error);
		} else {
			console.log('🚀 ~ addNewLead ~ status:', status);
		}
	};

	const deleteDate = async (id) => {
		const { error, status } = await supabase
			.from('Dates')
			.delete()
			.eq('id', id);
		if (status === 204) {
			console.log('🚀 ~ deleteLead ~ status:', status);
			return status;
		} else {
			console.log('🚀 ~ deleteLead ~ error:', error);
			return error;
		}
	};

	const getDateCount = () => {
		return dates.length;
	};

	const editDate = async (id, lead) => {
		console.log('🚀 ~ file: dates.js:58 ~ editLead ~ id:', id);
		console.log('🚀 ~ file: dates.js:58 ~ editLead ~ lead:', lead);
		const { error, status } = await supabase
			.from('Dates')
			.update(lead)
			.eq('id', id);
		if (status === 204) {
			console.log('🚀 ~ deleteLead ~ status:', status);
			return status;
		} else {
			console.log('🚀 ~ deleteLead ~ error:', error);
			return error;
		}
	};

	return {
		dates,
		getAllDates,
		addNewDate,
		deleteDate,
		getDateCount,
		editDate,
	};
};
