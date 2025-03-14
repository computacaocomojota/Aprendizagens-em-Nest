import {

	Body,
	Controller,
	Post,

} from "@nestjs/common";

import { GeminiService } from "./gemini.service";

@Controller('/api/v1/chat')
export class GeminiController {

	constructor(private readonly geminiService: GeminiService) { }

	@Post()
	async createPrompt(@Body() prompt: string) {

		const response = await this.geminiService.createPrompt(prompt);

		return { response: response };
	}
}