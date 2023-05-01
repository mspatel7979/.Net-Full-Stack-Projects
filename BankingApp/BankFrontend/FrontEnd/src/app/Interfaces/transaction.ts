export interface Transaction {
    id: number;
    amount: number;
    senderEmail: string;
    recipientEmail: string;
    createdAt: Date;
    description: string;
    status: number;
    ramount : number;
    sType : boolean; 
    rType: boolean;
}
