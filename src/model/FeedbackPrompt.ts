
export interface FeedbackPromptRequestDTO {
    feedback_id: string;
}

export interface FeedbackMultipleChoice {
    image_uri: string;
    choice_id: string;
}

export interface FeedbackPromptResponseDTO {
    data_0: FeedbackMultipleChoice;
    data_1: FeedbackMultipleChoice;
    data_2: FeedbackMultipleChoice;
    data_3: FeedbackMultipleChoice;
    data_4: FeedbackMultipleChoice;
    data_5: FeedbackMultipleChoice;
}