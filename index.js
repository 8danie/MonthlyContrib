import 'expo-router/entry'; // Si vous voulez garder la compatibilité, sinon supprimez
import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent appelle AppRegistry.registerComponent('main', () => App);
// C'est la ligne qui dit à React Native "le composant principal de cette app est 'App'".
registerRootComponent(App);