<script setup lang="ts">
import { ref } from "vue";
import type { FeedbackSubmissionRequestDTO } from "./../model/FeedbackSubmission";


const props = defineProps<{
  reviewChoices: Array<{ choice_id: string; image_uri: string }>,
  prompt: string,
  currentExpression: string,
  feedbackId: string
}>();

const choiceId = ref(null);
const isDisabled = ref(true);

async function selectImage(selectedData: string){
    const buttons = document.querySelectorAll('.image-option');
    buttons.forEach((button) => {
        button.classList.remove('selected');
    });

    const selectedButton = event?.currentTarget as HTMLElement;
    selectedButton.classList.add('selected');

    choiceId.value = selectedData;

    isDisabled.value = !isDisabled.value;
} 

async function submitFeedback(){

    console.log("Submit Feedback triggered: ", choiceId.value);

    if (!choiceId.value) {
        alert("Please select an image before submitting.");
        return;
    }

    const request: FeedbackSubmissionRequestDTO = {
        feedback_id: props.feedbackId,
        review_id: choiceId.value
    }

    console.log("Submitting feedback:", request);

    
}

async function closeModal(){
    
}

</script>

<template>
<div class="modal" id="submissionModal">
        <div class="modal-content submission-modal-content">
            <button class="close-btn" onclick="closeSubmissionModal()">&times;</button>
            <h2>What's on your mind? What kind of expression should it have been?</h2>
            
            <div class="previous-prompt">
                <strong>Your original prompt:</strong>
                <div id="previousPrompt">
                    <p v-text="prompt"></p>
                </div>
            </div>

            <div class="previous-prompt">
                <strong>The expression:</strong>
                <div class=" flex justify-center items-center">
                    <img :src="currentExpression" class="original-expression picture-box" />
                </div>
                
            </div>
            
            <div class="image-grid">
                <div v-for="(choice, index) in reviewChoices" :key="index" class="image-option" @click="selectImage(choice.choice_id)">
                    <img :src="choice.image_uri" />
                </div>
            </div>
            
            <button class="submit-btn" @click="submitFeedback()" id="feedbackSubmitBtn" :disabled="isDisabled">
                Submit Feedback
            </button>
        </div>
    </div>
</template>