import { createContext, useContext, useState } from "react";

const AppContext = createContext()

export function AppProvider({ children }) {
    const [allResponses, setAllResponses] = useState([])
    const [formData, setFormData] = useState({
        userName: '',
        startupName: '',
        budget: '',
        startupIdea: '',
        targetAudience: '',
        estimatedTAM: '',
        resources: ''
    })
    const [analysisResponse, setAnalysisResponse] = useState(null);

    const questions = [
        {
            main: 'What problem are you trying to solve and what is your unique edge ?',
            sub: `**The Problem** Be extremely specific about the problem. Avoid general statements like "helping people save time." Instead, describe the exact problem, e.g., "Independent coffee shops are losing 20% revenue because they can't predict daily coffee bean usage, leading to stockouts or wastage."


**Your Edge**What makes your solution uniquely positioned to solve this problem? Focus on concrete advantages, not just features. Examples:


"We have proprietary AI that's 40% more accurate in predicting inventory needs" "Our founding team built inventory systems for Starbucks for 5 years" "We have unique partnerships with 50 coffee bean suppliers" "We've developed a new technology that reduces prediction errors by 60%"


*Our fluff meter will analyze your response. You can refine this in round 2 based on the feedback.*`,
            field: 'startupIdea'
        },
        {
            main: 'Who are your target customers ?',
            sub: 'Be as specific as possible. Instead of "small business owners," say something like "independent coffee shop owners in urban areas, managing single locations, with 5-15 employees and $500K-$1M annual revenue."',
            field: 'targetAudience'
        },
        {
            main: 'Estimated Total Addressable Market (TAM)? ',
            sub: `Share your best estimate and show your work. Example:

"There are 15,000 independent coffee shops in urban US areas" 
"Average annual spend on inventory management is $2,400"
"TAM = $36M annually"

*Don't worry if you're unsure - we'll help validate and refine these numbers.*`,
            field: 'estimatedTAM'
        },
        {
            main: 'Your current resources at hand for marketing / traction building ?',
            sub: `Team size and roles
Relevant marketing skills/experience
Existing assets (email list, social following, website traffic)
Available time per week for marketing activities
Any unique advantages (industry connections, existing audience, etc.)

Example: *"Solo founder, technical background but no marketing experience, 1000 LinkedIn connections in target industry, basic website with 100 monthly visitors, can dedicate 10 hrs/week"*`,
            field: 'resources'
        }
    ];

    return (
        <AppContext.Provider value={{ allResponses, setAllResponses, questions, formData, setFormData, analysisResponse, setAnalysisResponse }}>
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
