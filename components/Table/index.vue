<template>
     <div class="table-container">
        <table>
          <thead>
            <tr>
              <th v-for="(item, index) in headers" :key="index">
                {{ item.title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in body" :key="index">
              <td
                v-for="(bodyInHeader, bodyInIndex) in headers"
                :key="bodyInIndex"
              >
              {{ bodyInHeader.value }}
                <!-- <slot :name="`body_${bodyInHeader.value}`" :item="item">
                  {{ item[bodyInHeader.value] }}
                </slot> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</template>

<script setup>
const headers = [
  {
    title: "No",
    value: "id",
  },
  {
    title: "Akt Nomeri",
    value: "nomeri",
  },
  {
    title: "Buyurtma sanasi",
    value: "sanasi",
  },
  {
    title: "Jami",
    value: "jami",
  },
  {
    title: "to'landi",
    value: "tolandi",
  },
  {
    title: "Qoldi",
    value: "qoldi",
  },
  {
    title: "Holati",
    value: "holati",
  },
];
const body = [
  {
    id: "1",
    nomeri:"234444",
    sanasi:"10.06.2023",
    jami:"555 000 so'm",
    tolandi:"23 000 so'm",
    qoldi:"24 000 so'm",
    holati:"Faol"

  },
];

</script>

<style lang="scss" scoped>

.table-container {
  overflow-x: auto;
  max-width: 100%;
}


table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  padding: 12px;
  border-bottom: 2px solid #ddd;
  text-align: left;
  color: #9196ad;
  font-size: 13px;
}



tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  text-align: left;
  color: #2986e3; 
        font-family: Manrope;
        font-size: 13px;
        font-weight: 400;
}

/* Maxsus slot styling */
td span {
  font-weight: bold;
  color: #e90d0d;
}


// table {
//   width: 100%;
 
//   thead {

//     th {
//       border-bottom: 1px solid #c5d2d6;
//       padding: 10px 36px;
//       height: 18px;
//       color: #9196ad;
//       font-family: Manrope;
//       font-size: 13px;
//       font-weight: 400;
    
//     }
//   }
//   tbody {
//     background-color: white;
    
//     tr {
//       background:white;

//       td {
//         padding: 10px 36px;
//         height: 18px;
//         top: 352px;
//         color: #2986e3; 
//         font-family: Manrope;
//         font-size: 16px;
//         font-weight: 400;
//         line-height: 18px;
//         letter-spacing: 0.02em;
//         text-align: left;



//       }
//     }
//   }
// }
</style>