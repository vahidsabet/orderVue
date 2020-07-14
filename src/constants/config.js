export const defaultMenuType = 'menu-default' // 'menu-default', 'menu-sub-hidden', 'menu-hidden';
export const defaultStartPath = '/app/home/start'
export const searchPath = '#'
export const buyUrl = 'https://ayeezh.com'

export const subHiddenBreakpoint = 1440
export const menuHiddenBreakpoint = 768

export const defaultLocale = 'fa'
export const defaultDirection = 'rtl'
export const localeOptions = [
  { id: 'en', name: 'English LTR', direction: 'ltr' },
  { id: 'es', name: 'Español', direction: 'ltr' },
  { id: 'fa', name: 'Persian RTL', direction: 'rtl' }
]

export const firebaseConfig ={};
export const apiUrl ='http://127.0.0.1:8000/api/v1/orders'
export const apiUrltak ='http://127.0.0.1:8000/api/v1/takorders'
export const apiUser ='http://127.0.0.1:8000/api/v1/user/'
export const apiLogin ='http://127.0.0.1:8000/api/v1/users/login'


export let currentUser = {
  id: 1,
  title: 'وحید',
  img: '/assets/img/profile-pic-l.jpg',
  date: 'Last seen today 15:24'
}

export let isAuthActive = true
export const themeRadiusStorageKey = 'theme_radius'
export const themeSelectedColorStorageKey = 'theme_selected_color'
export const defaultColor = 'light.blueolympic'
export const colors = ['bluenavy', 'blueyale', 'blueolympic', 'greenmoss', 'greenlime', 'purplemonster', 'orangecarrot', 'redruby', 'yellowgranola', 'greysteel']
