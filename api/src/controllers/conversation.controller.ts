import { ObjectType } from './../helpers/httpResponseHandler';
//TODO conversation endpoitns

class ConversationController {

    private extractRequestBody = (body: ObjectType<any>): ObjectType<string> => ({})

    //TODO add send email code here
    sendEmail = async () => {
        // extract data, send email call mail service, save to db and return a success or failure
    }


    //TODO list all emails 
    getAllEmails = async () => {
        // lits all emails
    }   
}

export default new ConversationController()