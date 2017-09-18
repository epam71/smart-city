export interface Project {
    author?: string,
    authorEmail?: string,
    projectName: string,
    image: string,
    desc: any,
    goals: string,
    result: string,
    budget: number,
    status: string,
    rating?: number,
    currentRating?: number
}