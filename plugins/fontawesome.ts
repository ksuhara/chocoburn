import { library, config } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Vue from "vue";

config.autoAddCss = false;
library.add(fas);
Vue.component("FontAwesomeIcon", FontAwesomeIcon);
