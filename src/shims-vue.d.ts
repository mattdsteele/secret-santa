declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "vuefire" {
  const VueFire: any;
  export default VueFire;
}
declare module "vue-material" {
  const VueMaterial: any;
  export default VueMaterial;
}

declare module "firebaseui" {
  const FirebaseUi: any;
  export default FirebaseUi;
}

declare module "vuexfire" {
  const firebaseMutations: any;
  const firebaseAction: any;
  export { firebaseMutations, firebaseAction };
}
