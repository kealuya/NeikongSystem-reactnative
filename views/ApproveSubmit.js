import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    StyleSheet,
    Platform,
    Text,
    View,
    Alert,
    TouchableOpacity,
    Linking,
} from 'react-native';

export default class ApproveSubmit extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    内控业务申请
                </Text>
                <Text style={styles.instructions}>
                    内控业务申请{'\n'}
                    建设中...
                </Text>
                <TouchableOpacity onPress={this.checkUpdate}>
                    <Text style={styles.instructions}>
                        点击
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
    checkUpdate=()=>{
        alert('内控业务申请')
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
