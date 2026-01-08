import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "./AiResponse";
import history from "./AiResponse"

export const store=configureStore({
    reducer:{
        ai: aiReducer,
        history:history
    }
})

