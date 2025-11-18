import { createSlice } from "@reduxjs/toolkit";

export const UserSlice =createSlice({
    name:'user',
    initialState:{
        data:[]
    },
    reducers:{
        addUser(state:any,action:any){
            state.data.push(action.payload)
        },
        updateUser(state:any,action:any){
            let temp=state.data
            temp.map((item:any,index:any)=>{
                if(index==action.payload.index){
                   
                    item.name=action.payload.name
                    item.email=action.payload.email
                    item.mobile=action.payload.mobile
                    item.address=action.payload.address
                }
            })
            state.data=temp
        },
        deleteUser(state,action){
            let temp=state.data
            let final=temp.filter((item,index)=>{
                return index!=action.payload
            })
            state.data=final
        }
    }
})

export const {addUser,updateUser,deleteUser}= UserSlice.actions
export default UserSlice.reducer