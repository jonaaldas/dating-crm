import { createClient } from '@supabase/supabase-js';
import { reactive, ref } from 'vue';

let key =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ1a3dqYXpxcXVodXdlcnFmbGh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY0NDQ0OTIsImV4cCI6MjAwMjAyMDQ5Mn0.er61jIGLCQWbP979-g4a228hCye8gMVx3-9y1tTMJB8';
const supabaseUrl = 'https://fukwjazqquhuwerqflhu.supabase.co';
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

export const useLeads = () => {
	// const state = reactive({
	// 	leads: ref([]),
	// });

	const leads = ref([]);

	const getAllLeads = async () => {
		const { data, error } = await supabase.from('Leads').select('*');
		if (data) {
			leads.value.push(...data);
			return true;
		} else {
			console.log(error);
		}
	};

	const addNewLead = async (newLead) => {
		let { where, when, meet, lead_origin, number, date, details } = newLead;
		const { error, status } = await supabase
			.from('Leads')
			.insert({ where, when, meet, lead_origin, details, number, date });
		if (error) {
			console.log(error);
		} else {
			console.log('🚀 ~ addNewLead ~ status:', status);
		}
	};

	const deleteLead = async (id) => {
		const { error, status } = await supabase
			.from('Leads')
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

	const getLeadsCount = () => {
		return leads.length;
	};

	const editLead = async (id, lead) => {
		console.log('🚀 ~ file: leads.js:58 ~ editLead ~ id:', id);
		console.log('🚀 ~ file: leads.js:58 ~ editLead ~ lead:', lead);
		const { error, status } = await supabase
			.from('Leads')
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
		leads,
		getAllLeads,
		addNewLead,
		deleteLead,
		getLeadsCount,
		editLead,
	};
};
