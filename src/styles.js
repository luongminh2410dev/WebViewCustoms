import { StyleSheet } from 'react-native'
import { Colors, Metrics } from './ultilities'
const styles = StyleSheet.create({
    body: {
        flex: 1,
        width: '100%',
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingHorizontal: Metrics.DEVICE_WIDTH >= 800 ? 100 : 16,
        paddingVertical: 8,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.AUTHEN_BACKGROUND,
    },
    list_item: {
        width: '100%',
    }
})

export default styles
