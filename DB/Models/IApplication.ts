export interface IApplication{
        candidate_id: string;
        status: string;
        application_date: Date;
        cover_letter: string;
        resume: string; 
        job_id: string;
        _id?: string;
        createdAt?:Date; 
        updatedAt?:Date;
    }