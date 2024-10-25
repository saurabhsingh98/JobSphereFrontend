import { createSlice } from "@reduxjs/toolkit";


const jobSlice= createSlice({
    name: 'job',
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchJobText:""
    },

    reducers:{
        //actions
        setAllJobs:(state, action)=>{
            state.allJobs= action.payload;
        },
        setSingleJob: (state, action)=>{
            state.singleJob= action.payload;
        },
        setAllAdminJobs:(state, action)=>{
            state.allAdminJobs= action.payload;
        },
        setSearchJobText:(state, action)=>{
            state.searchJobText= action.payload;
        }
    }

})

export const {setAllJobs, setSingleJob, setAllAdminJobs, setSearchJobText}= jobSlice.actions;

export default jobSlice.reducer;