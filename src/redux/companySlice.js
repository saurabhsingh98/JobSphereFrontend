import { createSlice } from "@reduxjs/toolkit";

const companySlice= createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers:{
        //actions
        setSingleCompany:(state, actions)=>{
            state.singleCompany= actions.payload;
        },
        setCompanies:(state, actions)=>{
            state.companies= actions.payload;
        },
        setSearchCompanyByText:(state, actions)=>{
            state.searchCompanyByText= actions.payload;
        }
    }
});

export const {setSingleCompany, setCompanies, setSearchCompanyByText} = companySlice.actions;

export default companySlice.reducer;