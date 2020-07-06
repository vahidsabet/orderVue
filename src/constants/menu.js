
const data = [{
  id: "home",
  icon: "iconsminds-shop",
  label: "menu.home",
  to: "/app/home"  
},
{
  id: "pages",
  icon: "iconsminds-digital-drawing",
  label: "menu.pages",
  to: "/user/login",
  subs: [{
    icon: "simple-icon-user-following",
    label: "menu.login",
    to: "/user/login",
    newWindow: true
  }, {
    icon: "simple-icon-user-follow",
    label: "menu.register",
    to: "/user/register",
    newWindow: true
  }, {
    icon: "simple-icon-user-unfollow",
    label: "menu.forgot-password",
    to: "/user/forgot-password",
    newWindow: true
  },
  {
    icon: "simple-icon-user-following",
    label: "menu.reset-password",
    to: "/user/reset-password",
    newWindow: true
  }
  ]
},
{
  id: "single",
  icon: "iconsminds-three-arrow-fork",
  label: "menu.single",
  to: "/app/single"
},
{
  id: "docs",
  icon: "iconsminds-library",
  label: "menu.docs",
  to: "https://ziplin.ir/",
  newWindow: true
}
];
export default data;
