// this is the structure of the class that represents the data model corresponding 
// to the form model that we're going to use within our Angular application.

export class Feedback {
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;

}


export const ContactType: string[] = ['None', 'Tel', 'Email'];