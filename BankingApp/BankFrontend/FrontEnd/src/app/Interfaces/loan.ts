export interface Loan {
    id: number;
    amount: number;
    businessId: string;
    interestRate: number;
    dateLoaned: Date;
    loanPaid: Date;
    monthlyPay: number;
    amountPaid: number;
}

export interface LoanSchedule {
    date: string;
    payment: number;
    principal: number;
    interest: number;
    totalInterest: number;
    balance: number
}