import AppComponent from './components/app';
import IndexComponent from './components/index';
import AboutComponent from './components/about';
import TrackerComponent from './components/tracker';

//React App
const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [{
    path: '/',
    component: IndexComponent
  }, {
    path: '/about',
    component: AboutComponent
  }, {
    path: '/tracker',
    component: TrackerComponent
  }]
};

export { routes };