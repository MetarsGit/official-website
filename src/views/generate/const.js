export const [
    DETAILS,
    ENVIRONMENT,
    MAIN_IDEA,
    PUBLISH,
    START,
    STYLE] = ['DETAILS', 'ENVIRONMENT', 'MAIN_IDEA', 'PUBLISH', 'START', 'STYLE']

export const stepList = [
    {
        status: 'START',
        nextStatus: 'MAIN_IDEA',
        label: 'Main Idea'
    },
    {
        status: 'MAIN_IDEA',
        nextStatus: 'STYLE',
        label: 'Style'
    },
    {
        status: 'STYLE',
        nextStatus: 'ENVIRONMENT',
        label: 'Environment'
    },
    {
        status: 'ENVIRONMENT',
        nextStatus: 'DETAILS',
        label: 'Details'
    },
    {
        status: 'DETAILS',
        nextStatus: 'PUBLISH',
        label: 'Publish'
    }
]

export const STEP_SORT = ['START', 'MAIN_IDEA', 'STYLE', 'ENVIRONMENT', 'DETAILS', 'PUBLISH']

export const shareUrlPrefix = 'https://artifuse.ai/artwork'
