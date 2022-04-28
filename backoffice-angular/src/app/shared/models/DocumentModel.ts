// Esto es mas un DAO

export class DocumentModel {
    public _id?: string; 
    public title!: string;
    public description!: string;
    public date!: Date;
    public content!: string;
    public author!: string;
    public archiveDate?: Date ;
}

