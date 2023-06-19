<template>
  <div class="comment-section">
    <h2>评论区</h2>
    <div class="comments">
      <div v-for="(comment, index) in comments" :key="index" class="comment">
        <p>{{ comment.text }}</p>
        <p class="author">{{ comment.author }}</p>
      </div>
    </div>
    <form @submit.prevent="submitComment">
      <textarea v-model="newComment.text" placeholder="写下你的评论"></textarea>
      <input v-model="newComment.author" type="text" placeholder="你的名字">
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'CommentSection',
  setup() {
    const comments = ref([
      { text: '这是一个很棒的评论', author: '用户A' },
      { text: '非常喜欢这个页面', author: '用户B' },
      { text: '请多多指教', author: '用户C' }
    ]);

    const newComment = ref({
      text: '',
      author: ''
    });

    const submitComment = () => {
      if (newComment.value.text && newComment.value.author) {
        comments.value.push({
          text: newComment.value.text,
          author: newComment.value.author
        });

        newComment.value.text = '';
        newComment.value.author = '';
      }
    };

    return {
      comments,
      newComment,
      submitComment
    };
  }
};
</script>

<style>
.comment-section {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.comments {
  margin-top: 10px;
}

.comment {
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 10px;
}

.author {
  font-style: italic;
}

form {
  margin-top: 20px;
}

textarea, input {
  display: block;
  margin-bottom: 10px;
  width: 100%;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #45a049;
}
</style>
