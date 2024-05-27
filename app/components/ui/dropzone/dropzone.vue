<template>
  <div class="ui-dropzone">
    <div v-if="state.files.length > 0" class="ui-dropzone__files">
      <div
        v-for="(file, index) in state.files"
        :key="index"
        class="ui-dropzone__files-item"
      >
        <span class="ui-dropzone__files-item-title">
          {{ file.name }}
        </span>

        <span
          class="ui-dropzone__files-delete-action"
          @click="handleClickDeleteFile(index)"
        >
          Delete
        </span>
      </div>
    </div>

    <div v-else class="ui-dropzone__blank" v-bind="getRootProps()">
      <div class="ui-dropzone__blank-wrapper">
        <input v-bind="getInputProps()">
        <p>Перетащите сюда файлы или щелкните, чтобы выбрать их.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Node Deps
import { useDropzone } from 'vue3-dropzone'
// Types & interfaces
import type { TUploadImage } from '~/api/upload/uploadImage'
// Api Methods
import { EUploadTypes, uploadImage } from '~/api/upload/uploadImage'

export interface TUiDropzoneExposes {
  clearFiles: () => void,
}

interface Props {
  typename: EUploadTypes
}

interface Emits {
  (name: 'imageUpload', data: TUploadImage): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const state = reactive<{ files: File[] }>({
  files: [],
})

const onDrop = async (acceptFiles: File[]) => {
  if (!acceptFiles[0]) {
    return
  }

  const data = await uploadImage(props.typename, acceptFiles[0])
  if (!data) {
    return
  }

  state.files = acceptFiles
  emit('imageUpload', data)
}

const { getRootProps, getInputProps } = useDropzone({ onDrop })

const handleClickDeleteFile = (index: number) => {
  state.files.splice(index, 1)
}

const clearFiles = () => {
  state.files = []
}

defineExpose({ clearFiles })
</script>

<style lang="scss">
.ui-dropzone {

  &__files {
    width: 100%;
    max-width: 300rem;
    margin: 0 auto;
    padding: 10rem;
    border-radius: 8rem;
    font-size: 12rem;

    &-delete-action {
      background: map-get($theme-colors, 'accent-color');
      color: map-get($white-color-palette, 'white');
      padding: 5rem 10rem;
      border-radius: 8rem;
      cursor: pointer;
    }
  }

  &__files-item {
    background-color: map-get($theme-colors, 'surface-color');
    border-radius: 8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 7rem;

    &-title {
      width: 65%;
      overflow-wrap: anywhere;
    }
  }

  &__blank {
    cursor: pointer;

    &-wrapper {
      border: 3rem dashed map-get($white-color-palette, 'white-5');
      border-radius: 8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rem;
      transition: all 0.3s ease;
      background: map-get($white-color-palette, 'white');

      p {
        text-align: center;
      }
    }
  }
}
</style>
