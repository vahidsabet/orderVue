
const data = [{
  id: "home",
  icon: "iconsminds-shop",
  label: "menu.home",
  to: "/app/home" ,
  subs: [ {
    icon: "simple-icon-settings",
    label: "menu.dashboards",
    to: "/app/home/start"
  },{
    icon: "simple-icon-diamond",
    label: "forms.orderZiplin",
    to: "/app/ziplinOrders"
  }, {
    icon: "simple-icon-support",
    label: "forms.orderTakyek",
    to: "/app/takyekOrders"
  }]
},
{
  id: "single",
  icon: "iconsminds-three-arrow-fork",
  label: "menu.addorder",
  to: "",
  subs: [{
    icon: "simple-icon-diamond",
    label: "forms.orderZiplin",
    to: "/app/addorderZiplin"
  }, {
    icon: "simple-icon-support",
    label: "forms.orderTakyek",
    to: "/app/addorderTakyek"
  }]
},
{
  id: "pages",
  icon: "iconsminds-user",
  label: "menu.pages",
  to: "",
  subs: [{
    icon: "simple-icon-user-following",
    label: "menu.login",
    to: "/user/login"
  }, {
    icon: "simple-icon-user-follow",
    label: "menu.register",
    to: "/user/register"
  }/*, {
    icon: "simple-icon-user-unfollow",
    label: "menu.forgot-password",
    to: "/user/forgot-password",
    newWindow: true
  }*/,
  {
    icon: "simple-icon-user-following",
    label: "menu.reset-password",
    to: "/user/reset-password"
  }/*,
  {
    icon: "simple-icon-user",
    label: "menu.userlist",
    to: "/app/userlist"
  }*/
  ]
},
{
  id: "ziplinWeb",
  icon: "iconsminds-library",
  label: "menu.ziplinWeb",
  to: "https://ziplin.ir/",
  newWindow: true
},
{
  id: "takyekWeb",
  icon: "iconsminds-library",
  label: "menu.takyekWeb",
  to: "https://takyek.com/",
  newWindow: true
}
];
export default data;
