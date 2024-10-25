import { createSlice } from "@reduxjs/toolkit";


const applicationSlice= createSlice({
    name:'application',
    initialState:{
        applicants:[],
        appliedJobs:[],
    },
    reducers:{
        setApplicants:(state, action)=>{
            state.applicants= action.payload;
        },
        setAppliedJobs:(state, action)=>{
            state.appliedJobs= action.payload
        }
    }
})

export const {setApplicants, setAppliedJobs}= applicationSlice.actions;

export default applicationSlice.reducer;