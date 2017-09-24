export interface Project {
    _id?: string,
    author?: string,
    authorEmail?: string,
    projectName: string,
    image?: string,
    desc: any,
    goals: string,
    result: string,
    budget: number,
    status?: string,
    comments?: string[],
    rating?: number,
    approved?: boolean,
    currentRating?: number
}