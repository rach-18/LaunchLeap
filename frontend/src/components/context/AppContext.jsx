import { createContext, useContext, useState } from "react";

const AppContext = createContext()

export function AppProvider({ children }) {
    const [allResponses, setAllResponses] = useState([])

    const questions = [
        {
            main: 'Please explain what problem you are trying to solve ?',
            sub: 'Be as precise as possible. We anyways have a fluff meter that can let you know if your not being clear here. You can optimise for round 2.'
        },
        {
            main: 'Who are your target customers ?',
            sub: 'Same as before, please be super clear to the extent possible.'
        },
        {
            main: 'Estimated Total Addressable Market (TAM)? ',
            sub: 'We will make your ideas more grounded in reality based on our knowledge base of case studies.'
        },
        {
            main: 'Your current resources at hand for marketing / traction building ?',
            sub: 'Please let us know about your current budget, resources (if you have a team) or your just solo, how big your team is, what marketing related experience / skill-sets this team possesses and any other info, example - I already an YouTube channel with 10000 subscribes etc.'
        }
    ];

    return (
        <AppContext.Provider value={{ allResponses, setAllResponses, questions }}>
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}
