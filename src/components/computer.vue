<template>
  <div class="converter">
    <h2>进制转换器</h2>
    <div class="form-group">
      <label for="number">十进制:</label>
      <input id="number" type="number" v-model.number="decimal" @input="convert">
    </div>
    <div class="form-group">
      <label for="binary">二进制:</label>
      <input id="binary" type="text" v-model="binary">
    </div>
    <div class="form-group">
      <label for="octal">八进制:</label>
      <input id="octal" type="text" v-model="octal">
    </div>
    <div class="form-group">
      <label for="hexadecimal">十六进制:</label>
      <input id="hexadecimal" type="text" v-model="hexadecimal">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      decimal: 0,
      binary: "",
      octal: "",
      hexadecimal: "",
    };
  },
  methods: {
    convert() {
      this.binary = this.decimal.toString(2);
      this.octal = this.decimal.toString(8);
      this.hexadecimal = this.decimal.toString(16).toUpperCase();
    },
  },
};
</script>

<style scoped>
.converter {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 24px;
  color: #333;
  text-align: center;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

label {
  width: 80px;
  font-weight: bold;
  color: #555;
}

input {
  width: 300px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;
  font-size: 16px;
  color: #333;
}

input:focus {
  border-color: #2196f3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}
</style>
