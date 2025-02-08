export interface IQuestion{
    questionBankID: string;
    typeNumber: number;
}

export interface IAnswer{
    optionID: number;
    name: string;
}

export interface IOption{
    optionID: number;
    image: string;
    name: string;
}

export interface IAnswerProps{
    question: IQuestion;
    examID: number;
    options?: any;
    currentStep?: string;
    state: any;
    setState: (value: any) => void;
}
