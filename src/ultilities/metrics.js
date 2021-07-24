import { Dimensions, NativeModules, Platform } from 'react-native';

const { height, width } = Dimensions.get('window');
const { StatusBarManager } = NativeModules;

const isIOS = Platform.OS === 'ios';

let statusHeight = StatusBarManager.HEIGHT;
if (isIOS) {
    StatusBarManager.getHeight((data) => (statusHeight = data.height));
}

const Metrics = {
    DEVICE_WIDTH: width,
    DEVICE_HEIGHT: height,
    STATUS_BAR_HEIGHT: statusHeight,
    DEFAULT_HEADER_HEIGHT: 40,
    MARGIN_ITEM: height > 600 ? 8 : 4,
    HOME_MARGIN_ITEM: height > 600 ? 12 : 6,
    TEXT_INPUT_HEIGHT: height > 600 ? 53 : 33,
    BTN_BACK_SIZE: height > 600 ? 48 : 36,
    FONT_SIZE: height > 600 ? 4 : 3,
}

export default Metrics;