export interface IJob{
    title:string;
    position:string;
    status:string;
    workType:string;
    salary:number;               
    description:string;
    posted_date?:Date;
    expiration_date?:Date;                
    companyId:string;
    is_featured:boolean;
    _id?: string // Mongodb is _id  and at create Id We Not Pass
    createdAt?:Date; // It By Default Maintain By Appication
    updatedAt?:Date;// It By Default Maintain By Appication
}