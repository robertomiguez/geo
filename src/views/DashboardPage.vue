<template>
  <MapLeaflet
    v-if="center[0] !== 0"
    :center="center"
    :markersData="markersData"
  />
</template>

<script setup lang="ts">
import MapLeaflet from '@/components/MapLeaflet.vue';
import TreeService from '@/services/TreeService';
import type { Tree } from '@/types/Tree';
import { onMounted, ref } from 'vue';

const treeGroup = ref<Tree[]>([]);
const center = ref<[number, number]>([0, 0]);
const markersData = ref<{ location: L.LatLngExpression; value: number }[]>([]);

const setupData = () => {
  center.value = [treeGroup.value[0].latitude, treeGroup.value[0].longitude];

  for (const markerData of treeGroup.value) {
    markersData.value.push({
      location: [markerData.latitude, markerData.longitude],
      value: markerData.count,
    });
  }
};

onMounted(async () => {
  treeGroup.value = await TreeService.getAllGroups();
  setupData();
});
</script>

<style></style>
