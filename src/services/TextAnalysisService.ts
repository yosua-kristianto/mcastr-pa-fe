import type { BaseResponse } from "@/model/BaseResponse";
import ApiHandler from "./ApiHandler";
import type { TextAnalysisRequestDTO, TextAnalysisResponseDTO } from "@/model/TextAnalysis";
import type { FeedbackMultipleChoice, FeedbackPromptRequestDTO, FeedbackPromptResponseDTO } from "@/model/FeedbackPrompt";
import type { FeedbackSubmissionRequestDTO, FeedbackSubmissionResponseDTO } from "@/model/FeedbackSubmission";

class TextAnalysisServices extends ApiHandler {
    private static readonly version: string = "v1";
    private static readonly prefix: string = `text-analyzer`;

    /**
     * textAnalysis
     * 
     * 
     * 
     * @param data 
     * @returns @/model/TextAnalysisResponseDTO
     */
    public async textAnalysis(data: string): Promise<TextAnalysisResponseDTO> {
        const request: TextAnalysisRequestDTO = { "text": data };
        const response: BaseResponse<TextAnalysisResponseDTO> = await this.requestWithAccessToken(
            "POST", 
            `/${TextAnalysisServices.version}/${TextAnalysisServices.prefix}`,
            request
        );

        return response.data!;
    }

    /**
     * feedbackPrompt
     * 
     * @param feedbackId 
     * @returns 
     */
    public async feedbackPrompt(feedbackId: string): Promise<Array<FeedbackMultipleChoice>>{
        const request: FeedbackPromptRequestDTO = { feedback_id: feedbackId };
        const response: BaseResponse<FeedbackPromptResponseDTO> = await this.requestWithAccessToken(
            "POST",
            `/${TextAnalysisServices.version}/${TextAnalysisServices.prefix}/feedback/review`,
            request
        );

        const result: Array<FeedbackMultipleChoice> = [];
        if(response.data){
            for(let i = 0; i < 6; i++){
                const key = `data_${i}` as keyof FeedbackPromptResponseDTO;
                if(response.data[key]){
                    result.push(response.data[key]);
                }
            }
        }

        return result;
    } 

    /**
     * feedbackSubmission
     * 
     * This endpoint is used to submit user feedback, reviewing the returned expression.
     * 
     * @param feedbackId 
     * @param reviewId 
     */
    public async feedbackSubmission(feedbackId: string, reviewId: string): Promise<void>{
        const request: FeedbackSubmissionRequestDTO = {
            feedback_id: feedbackId,
            review_id: reviewId
        };

        await this.requestWithAccessToken(
            "POST",
            `/${TextAnalysisServices.version}/${TextAnalysisServices.prefix}/feedback/submit`,
            request
        );
    }

}

export default new TextAnalysisServices();
