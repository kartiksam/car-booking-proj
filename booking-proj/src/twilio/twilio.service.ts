import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Twilio } from "twilio";

@Injectable()
export class TwilioService {

    private client: Twilio;

    constructor(private configService: ConfigService) {
        this.client = new Twilio(
            this.configService.get<string>('TWILIO_ACCOUNT_SID'),
        this.configService.get<string>('TWILIO_AUTH_TOKEN')
        )
    }

    async sendSms(to: string, body: string): Promise<any>{
        return await this.client.messages.create({
            body,
            to,
            from: this.configService.get<string>('TWILIO_PHONE_NUMBER'),
        })
    
    }
    




    async sendOtp(to: string, otp: string): Promise<any> {
        return this.sendSms(to, `Your OTP for login is: ${otp}`);
    }
}