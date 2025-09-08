import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Loader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "2",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "12",
        "x2": "12",
        "y1": "18",
        "y2": "22"
      }
    ],
    [
      "line",
      {
        "x1": "4.93",
        "x2": "7.76",
        "y1": "4.93",
        "y2": "7.76"
      }
    ],
    [
      "line",
      {
        "x1": "16.24",
        "x2": "19.07",
        "y1": "16.24",
        "y2": "19.07"
      }
    ],
    [
      "line",
      {
        "x1": "2",
        "x2": "6",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "22",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4.93",
        "x2": "7.76",
        "y1": "19.07",
        "y2": "16.24"
      }
    ],
    [
      "line",
      {
        "x1": "16.24",
        "x2": "19.07",
        "y1": "7.76",
        "y2": "4.93"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "loader" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center"><div class="text-center">${validate_component(Loader, "Loader").$$render(
    $$result,
    {
      class: "w-8 h-8 text-amber-600 animate-spin mx-auto mb-4"
    },
    {},
    {}
  )} <h1 class="text-2xl font-bold text-gray-900 mb-2" data-svelte-h="svelte-1idvw2l">Processing Authorization</h1> <p class="text-gray-600" data-svelte-h="svelte-1dsf6ya">Please wait while we complete the setup...</p></div></div>`;
});
export {
  Page as default
};
