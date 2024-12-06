<template>
    <div class="item-modal-wrapper z-20">
        <div class="item-modal">
            <div class="header">
                <h1>{{ titleText }}</h1>
                <button v-if="edit" class="delete-btn" @click="removeItem">DELETE</button>
            </div>
            <form>
                <div class="title">
                    <span>Title</span>
                    <input type="text" v-model="data.title">
                </div>
                <div class="price">
                    <span>Price</span>
                    <input type="number" min="0" v-model="data.price">
                </div>
                <div class="category">
                    <span>Category</span>
                    <select v-model="data.category">
                        <option 
                            v-for="(item, index) in categoryList" 
                            :key="index"
                            :value="item.value">
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <div class="imgUrl">
                    <span>Image URL</span>
                    <input type="text" v-model="data.imageUrl">
                </div>
            </form>
            <div class="btn-wrapper">
                <button class="add-btn" @click="sendItem">{{ edit ? 'EDIT' : 'ADD' }}</button>
                <button class="close-btn" @click="closeModal">CLOSE</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { CATEGORY_VALES } from '@/constants';
import { computed, reactive, ref } from 'vue';
import { itemsService } from '@/services/items';

const props = defineProps({
    edit: Boolean,
    editData: Object,
})
const emit = defineEmits(['close', 'updateItems', 'update:modelValue']);

const { addItem, updateItem, deleteItem } = itemsService();

let categoryList = CATEGORY_VALES.slice(1);

const data = reactive({
    title: props.editData.title || '',
    price: props.editData.price || null,
    category: props.editData.category || '',
    imageUrl: props.editData.imageUrl || ''
});
const errorMsg = ref('');

const titleText = computed(() => 
errorMsg.value
? errorMsg.value
: props.edit
? 'EDIT ITEM'
: 'ADD ITEM'
)

function closeModal() {
    emit('update:modelValue', {});
    emit('close');
}

async function sendItem() {
    if(!data.title && !data.price && !data.category) {
        errorMsg.value = 'Oops, something wrong!';
        setTimeout(() => {
            errorMsg.value = ''
        }, 2000);
    } else if (!props.edit) {
        await addItem(data);
        emit('updateItems');
        emit('update:modelValue', false);
    } else {
        await updateItem(props.editData.id, data);
        emit('updateItems');
        closeModal();
    }
};

async function removeItem() {
    await deleteItem(props.editData.id);
    emit('updateItems');
    closeModal();
}
</script>
<style scoped>
.item-modal-wrapper {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.item-modal {
  max-width: 500px;
  max-height: 530px;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%; 
  left: 50%;
  border-radius: 5%;
  transform: translate(-50%, -50%);
  box-shadow: inset 0 0 20px #7c7c7c;
  background-color: rgb(255, 255, 255);
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-size: 20px;
}
.header {
    display: flex;
    justify-content: space-between;
}
h1 {
    font-weight: 500;
    font-style: italic;
}
form {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.title,
.price,
.category,
.imgUrl {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
input,
select {
    flex: 1 1 auto;
    border: 1px solid black;
    border-radius: 12px;
}
input:focus,
select:focus {
    outline: 2px solid aquamarine;
}
.btn-wrapper {
    display: flex;
    justify-content: space-between;
}
.add-btn,
.close-btn,
.delete-btn {
    width: 90px;
    height: 40px;
    border-radius: 12px;
}
.add-btn:hover {
    background-color: #83ff7f;
}
.close-btn:hover {
    background-color: brown;
}
.delete-btn:hover {
    background-color: black;
    color: white;
}
</style>
