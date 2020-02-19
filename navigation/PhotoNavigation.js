import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const PhotoTabs = createMaterialTopTabNavigator(
  {
    SelectPhoto: {
      screen: SelectPhoto,
      navigationOptions: {
        tabBarLabel: "Select"
      }
    },
    TakePhoto: {
      screen: TakePhoto,
      navigationOptions: {
        tabBarLabel: "Take"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: styles.blackColor,
        marginBottom: 20
      },
      labelStyle: {
        color: styles.blackColor,
        fontWeight: "600"
      },
      style: {
        paddingBottom: 20,
        ...stackStyles
      }
    }
  }
);

export default createStackNavigator(
  {
    PhotoTabs: {
      screen: PhotoTabs,
      navigationOptions: {
        header: null
      }
    },
    UploadPhoto
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        ...stackStyles
      }
    }
  }
);
