export interface Transaction {
    "id"?: number,
    "amount"?: number,
    "cardId"?: number,
    "accountId"?: number,
    "createdAt"?: string | Date,
    "description"?: string,
    "recipientId"?: number,
    "status"?: number,
    "senderId"?: number,
    "recpientType"?: boolean,
    "senderType"?: boolean
}