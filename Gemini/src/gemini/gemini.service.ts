import 'dotenv/config';

import { Injectable } from "@nestjs/common";
import { GoogleGenerativeAI } from "@google/generative-ai";

@Injectable()
export class GeminiService{

	private genAI: GoogleGenerativeAI;

	constructor(){

		this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'default_value');
	}

	async createPrompt(prompt: string): Promise<string> {

		try{

			const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
			const result = await model.generateContent(prompt['']);

			return result.response.text();		

		} catch(error){

			console.error('Error in createPrompt', error);
			throw error;
		}
		
	}
}