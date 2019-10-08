import {
  NavigationActions,
  NavigationParams,
  NavigationContainerComponent,
} from 'react-navigation';

let navigator: NavigationContainerComponent | null;

function setNavigator(ref: NavigationContainerComponent | null) {
  navigator = ref;
}

function navigate(routeName: string, params?: NavigationParams) {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

export default {
  navigate,
  setNavigator,
};
